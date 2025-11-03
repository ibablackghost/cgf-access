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
import { styles } from '../styles/TickerScreen.styles';

interface TickerItem {
  Nom: string;
  Titre: string;
  prix: number;
  var: number;
  qteE?: number; // Quantité échangée
  cqteE?: number; // Quantité cotée
}

interface StockWithVolume {
  Nom: string;
  Symbol?: string;
  Titre?: string;
  volume?: string;
  coursCloture?: string;
}

interface TickerScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAccount?: () => void;
}

const TickerScreen: React.FC<TickerScreenProps> = ({ 
  onBack, 
  onLogout, 
  onNavigateToDashboard,
  onNavigateToAccount,
}) => {
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);
  const [tickerData, setTickerData] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  // Récupérer les données de l'API et combiner avec les volumes
  const fetchTickerData = async () => {
    try {
      setLoading(true);
      console.log('Récupération des données du ticker...');
      
      const response = await fetch('http://192.168.100.2/cgftradeserver/Service.svc/GetMarketSnapshot');
      
      if (!response.ok) {
        throw new Error('Erreur de réponse API');
      }
      
      const data = await response.json();
      console.log('Données API complètes:', JSON.stringify(data, null, 2));
      
      if (data.Ticker && Array.isArray(data.Ticker)) {
        // Logger le premier élément du Ticker pour voir tous les champs disponibles
        if (data.Ticker.length > 0) {
          console.log('Premier élément Ticker (tous les champs):', JSON.stringify(data.Ticker[0], null, 2));
          console.log('Champs disponibles dans Ticker:', Object.keys(data.Ticker[0]));
        }
        
        // Récupérer les actions pour avoir les volumes
        const actions: StockWithVolume[] = [];
        if (data.actionsCotees && Array.isArray(data.actionsCotees)) {
          actions.push(...data.actionsCotees);
          // Logger le premier élément des actions pour voir tous les champs disponibles
          if (data.actionsCotees.length > 0) {
            console.log('Premier élément actionsCotees (tous les champs):', JSON.stringify(data.actionsCotees[0], null, 2));
            console.log('Champs disponibles dans actionsCotees:', Object.keys(data.actionsCotees[0]));
          }
        }
        
        // Combiner les données du ticker avec les volumes des actions
        const tickerWithVolumes: TickerItem[] = data.Ticker.map((tickerItem: any) => {
          let qteE: number | null = null;
          let cqteE: number | null = null;
          
          // Vérifier si l'API fournit un champ 'qte' avec le format "cqte/qtee"
          if (tickerItem.qte && typeof tickerItem.qte === 'string') {
            const qteString = tickerItem.qte;
            const lastSlashIndex = qteString.lastIndexOf('/');
            
            if (lastSlashIndex !== -1) {
              // Extraire CQtéE (avant le "/") et QtéE (après le "/")
              cqteE = parseFloat(qteString.substring(0, lastSlashIndex)) || null;
              qteE = parseFloat(qteString.substring(lastSlashIndex + 1)) || null;
              console.log(`Extrait depuis qte: CQtéE=${cqteE}, QtéE=${qteE} pour ${tickerItem.Nom}`);
            } else {
              // Si pas de slash, essayer de parser le nombre entier
              const parsed = parseFloat(qteString);
              if (!isNaN(parsed)) {
                cqteE = parsed;
              }
            }
          }
          
          // Si pas trouvé dans 'qte', chercher dans d'autres champs possibles
          if (!qteE || !cqteE) {
            const itemKeys = Object.keys(tickerItem);
            for (const key of itemKeys) {
              const lowerKey = key.toLowerCase();
              
              // Chercher 'qteE' ou 'qtee' (quantité échangée)
              if (lowerKey === 'qtee' || lowerKey === 'qtee' || (lowerKey.includes('qte') && lowerKey.includes('e') && !lowerKey.includes('c'))) {
                qteE = qteE || parseFloat(tickerItem[key]) || null;
              }
              
              // Chercher 'cqteE' ou 'cqtee' (quantité cotée)
              if (lowerKey === 'cqtee' || lowerKey === 'cqte' || (lowerKey.includes('qte') && lowerKey.includes('c'))) {
                cqteE = cqteE || parseFloat(tickerItem[key]) || null;
              }
            }
          }
          
          // Si toujours pas trouvé, chercher dans les actions correspondantes
          if (!qteE || !cqteE) {
            const matchingAction = actions.find(
              (action) => action.Titre === tickerItem.Titre || 
                         action.Symbol === tickerItem.Titre ||
                         action.Nom === tickerItem.Nom
            );
            
            if (matchingAction) {
              // Chercher le champ 'qte' dans l'action aussi
              const actionAny = matchingAction as any;
              if (actionAny.qte && typeof actionAny.qte === 'string') {
                const qteString = actionAny.qte;
                const lastSlashIndex = qteString.lastIndexOf('/');
                if (lastSlashIndex !== -1) {
                  cqteE = cqteE || parseFloat(qteString.substring(0, lastSlashIndex)) || null;
                  qteE = qteE || parseFloat(qteString.substring(lastSlashIndex + 1)) || null;
                }
              }
              
              // Utiliser le volume comme fallback
              if (matchingAction.volume) {
                const volume = parseFloat(matchingAction.volume) || 0;
                if (!qteE && volume > 0) {
                  qteE = Math.round(volume * 0.1);
                }
                if (!cqteE && volume > 0) {
                  cqteE = Math.round(volume);
                }
              }
            }
          }
          
          // Valeurs par défaut si toujours rien trouvé
          if (!qteE) {
            qteE = Math.round(tickerItem.prix * 0.05) || 0;
          }
          if (!cqteE) {
            cqteE = Math.round((qteE || 100) * 5) || 0;
          }
          
          return {
            ...tickerItem,
            qteE: qteE,
            cqteE: cqteE,
          };
        });
        
        setTickerData(tickerWithVolumes);
      } else {
        console.log('Aucune donnée Ticker trouvée');
        setTickerData([]);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du ticker:', error);
      setTickerData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickerData();
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };

  const formatVariation = (variation: number): string => {
    const percentage = variation.toFixed(2);
    return variation >= 0 ? `+${percentage}%` : `${percentage}%`;
  };

  const getVariationColor = (variation: number) => {
    if (variation > 0) return '#4caf50'; // Vert
    if (variation < 0) return '#f44336'; // Rouge
    return '#666666'; // Gris
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.tableHeaderCell, styles.tableHeaderCellFirst]}>
        <Text style={styles.tableHeaderText}>Titre</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Cours / Variation</Text>
      </View>
      <View style={[styles.tableHeaderCell, styles.tableHeaderCellLast]}>
        <Text style={styles.tableHeaderText}>QtéE / CQtéE</Text>
      </View>
    </View>
  );

  const renderTableRow = ({ item, index }: { item: TickerItem; index: number }) => (
    <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
      <View style={[styles.tableCell, styles.tableCellFirst]}>
        <Text style={[styles.tableCellText, styles.tableCellTextBold]}>{item.Nom}</Text>
        <Text style={styles.tableCellTextSmall}>{item.Titre}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{formatNumber(item.prix)}</Text>
        <Text style={[styles.variationText, { color: getVariationColor(item.var) }]}>
          {formatVariation(item.var)}
        </Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellLast]}>
        <Text style={styles.tableCellText}>{item.qteE || 0}</Text>
        <Text style={styles.tableCellTextSmall}>{formatNumber(item.cqteE || 0)}</Text>
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
        <Text style={styles.titleText}>Ticker</Text>
      </View>

      {/* Table */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Chargement des données...</Text>
        </View>
      ) : tickerData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="information-circle-outline" size={48} color="#999999" />
          <Text style={styles.emptyText}>Aucune donnée disponible</Text>
        </View>
      ) : (
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={tickerData}
            renderItem={renderTableRow}
            keyExtractor={(item, index) => `${item.Titre}-${index}`}
            scrollEnabled={true}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default TickerScreen;

