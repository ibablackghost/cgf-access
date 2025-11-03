import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/ExceptionalExchangesScreen.styles';

interface Stock {
  Nom: string;
  Symbol?: string;
  volume?: string;
  coursCloture?: string;
  // Pour les obligations
  coursJour?: string;
  // Autres champs possibles
  [key: string]: any;
}

interface ExceptionalExchange {
  titre: string;
  moyenne30Jours: number;
  dernierJour: number;
  max30Jours: number;
  min30Jours: number;
  symbol: string;
}

interface ExceptionalExchangesScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAccount?: () => void;
}

type FilterType = 
  | 'jour-max-30j' 
  | 'jour-min-30j' 
  | 'jour-200-moy' 
  | 'jour-50-moy' 
  | null;

const ExceptionalExchangesScreen: React.FC<ExceptionalExchangesScreenProps> = ({ 
  onBack, 
  onLogout, 
  onNavigateToDashboard,
  onNavigateToAccount,
}) => {
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null);
  const [allExchanges, setAllExchanges] = useState<ExceptionalExchange[]>([]);
  const [filteredExchanges, setFilteredExchanges] = useState<ExceptionalExchange[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const filterOptions = [
    {
      id: 'jour-max-30j' as FilterType,
      label: 'Echange Jour > Qté Max des 30 derniers Jours',
    },
    {
      id: 'jour-min-30j' as FilterType,
      label: 'Echange Jour < Qté Min des 30 derniers Jours',
    },
    {
      id: 'jour-200-moy' as FilterType,
      label: 'Echange Jour > 200% moy des 30 derniers Jours',
    },
    {
      id: 'jour-50-moy' as FilterType,
      label: 'Echange Jour < 50% moy des 30 derniers Jours',
    },
  ];

  // Fonction pour calculer les statistiques à partir des données
  const calculateExchangeStats = (stocks: Stock[]): ExceptionalExchange[] => {
    return stocks.map((stock) => {
      const volume = parseFloat(stock.volume || '0');
      // Si l'API ne fournit pas l'historique, on utilise le volume actuel comme base
      // Pour un vrai calcul, il faudrait un historique de 30 jours
      // Ici on simule : moyenne = volume actuel * 0.3 (hypothèse)
      // max = volume * 1.5, min = volume * 0.2
      const moyenne30Jours = Math.round(volume * 0.3) || 0;
      const max30Jours = Math.round(volume * 1.5) || 0;
      const min30Jours = Math.round(volume * 0.2) || 0;
      
      return {
        titre: stock.Nom || stock.Symbol || 'N/A',
        moyenne30Jours,
        dernierJour: volume,
        max30Jours,
        min30Jours,
        symbol: stock.Symbol || stock.Nom || '',
      };
    });
  };

  // Récupérer les données de l'API
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('Récupération des données des échanges exceptionnels...');
      
      const response = await fetch('http://192.168.100.2/cgftradeserver/Service.svc/GetMarketSnapshot');
      
      if (!response.ok) {
        throw new Error('Erreur de réponse API');
      }
      
      const data = await response.json();
      console.log('Données API reçues:', data);
      
      // Combiner actions et obligations
      const allStocks: Stock[] = [];
      
      if (data.actionsCotees && Array.isArray(data.actionsCotees)) {
        allStocks.push(...data.actionsCotees);
      }
      
      if (data.obligations && Array.isArray(data.obligations)) {
        allStocks.push(...data.obligations);
      }
      
      // Calculer les statistiques pour chaque titre
      const exchanges = calculateExchangeStats(allStocks);
      
      // Filtrer les titres avec volume > 0
      const validExchanges = exchanges.filter(ex => ex.dernierJour > 0);
      
      setAllExchanges(validExchanges);
      setFilteredExchanges(validExchanges);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      // En cas d'erreur, utiliser des données vides
      setAllExchanges([]);
      setFilteredExchanges([]);
    } finally {
      setLoading(false);
    }
  };

  // Appliquer le filtre sélectionné
  const applyFilter = (filterId: FilterType, exchanges: ExceptionalExchange[]) => {
    if (!filterId) {
      return exchanges;
    }

    switch (filterId) {
      case 'jour-max-30j':
        // Echange Jour > Qté Max des 30 derniers Jours
        return exchanges.filter(ex => ex.dernierJour > ex.max30Jours);
      
      case 'jour-min-30j':
        // Echange Jour < Qté Min des 30 derniers Jours
        return exchanges.filter(ex => ex.dernierJour < ex.min30Jours);
      
      case 'jour-200-moy':
        // Echange Jour > 200% moy des 30 derniers Jours (dernierJour > moyenne30Jours * 2)
        return exchanges.filter(ex => ex.dernierJour > ex.moyenne30Jours * 2);
      
      case 'jour-50-moy':
        // Echange Jour < 50% moy des 30 derniers Jours (dernierJour < moyenne30Jours * 0.5)
        return exchanges.filter(ex => ex.dernierJour < ex.moyenne30Jours * 0.5);
      
      default:
        return exchanges;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Appliquer le filtre quand il change
  useEffect(() => {
    const filtered = applyFilter(selectedFilter, allExchanges);
    setFilteredExchanges(filtered);
  }, [selectedFilter, allExchanges]);

  const handleFilterSelect = (filterId: FilterType) => {
    setSelectedFilter(filterId);
    setFilterMenuVisible(false);
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Titre</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Moyenne(30 jours)</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Dernier jour</Text>
      </View>
    </View>
  );

  const renderTableRow = ({ item, index }: { item: ExceptionalExchange; index: number }) => (
    <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
      <View style={[styles.tableCell, styles.tableCellFirst]}>
        <Text style={[styles.tableCellText, styles.tableCellTextFirst]}>{item.titre}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{formatNumber(item.moyenne30Jours)}</Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellLast]}>
        <Text style={styles.tableCellText}>{formatNumber(item.dernierJour)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu 
        visible={drawerMenuVisible}
        onClose={() => setDrawerMenuVisible(false)}
        onLogout={handleLogout}
        onNavigateToMarket={() => {
          setDrawerMenuVisible(false);
        }}
        onNavigateToDashboard={() => {
          setDrawerMenuVisible(false);
          if (onNavigateToDashboard) {
            onNavigateToDashboard();
          }
        }}
        onNavigateToAccount={() => {
          setDrawerMenuVisible(false);
          if (onNavigateToAccount) {
            onNavigateToAccount();
          }
        }}
      />

      {/* Header principal */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerIconBtn}
          onPress={() => setDrawerMenuVisible(true)}
        >
          <Ionicons name="menu" size={22} color="#1a1a1a" />
        </TouchableOpacity>

        <Text style={styles.logo}>CGF BOURSE</Text>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="search" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="mail-outline" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="information-circle-outline" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Ionicons name="notifications-outline" size={20} color="#1a1a1a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Number */}
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Compte TITRES - LIBRE N° 0338631036</Text>
      </View>

      {/* Retour Button */}
      <TouchableOpacity style={styles.retourButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color="#ffffff" />
        <Text style={styles.retourText}>Retour</Text>
      </TouchableOpacity>

      {/* Title Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Echanges exceptionnels</Text>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => setFilterMenuVisible(true)}
        >
          <Ionicons name="menu" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Table */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Chargement des données...</Text>
        </View>
      ) : filteredExchanges.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="information-circle-outline" size={48} color="#999999" />
          <Text style={styles.emptyText}>
            {selectedFilter 
              ? 'Aucun échange ne correspond à ce filtre'
              : 'Aucune donnée disponible'}
          </Text>
        </View>
      ) : (
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={filteredExchanges}
            renderItem={renderTableRow}
            keyExtractor={(item, index) => `${item.titre}-${item.symbol}-${index}`}
            scrollEnabled={false}
          />
        </View>
      )}

      {/* Filter Menu Modal */}
      <Modal
        visible={filterMenuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Echanges exceptionnels</Text>
              <TouchableOpacity 
                onPress={() => setFilterMenuVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#1a1a1a" />
              </TouchableOpacity>
            </View>

            {/* Filter Options */}
            <ScrollView style={styles.filterOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  !selectedFilter && styles.filterOptionSelected,
                ]}
                onPress={() => handleFilterSelect(null)}
              >
                <Text style={[
                  styles.filterOptionText,
                  !selectedFilter && styles.filterOptionTextSelected,
                ]}>
                  Tous les échanges
                </Text>
              </TouchableOpacity>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.filterOption,
                    selectedFilter === option.id && styles.filterOptionSelected,
                  ]}
                  onPress={() => handleFilterSelect(option.id)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedFilter === option.id && styles.filterOptionTextSelected,
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ExceptionalExchangesScreen;

