import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/PalmaresScreen.styles';

interface PalmaresItem {
  nom: string;
  valeur: string;
  variation: number;
}

interface PalmaresScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
}

const PalmaresScreen: React.FC<PalmaresScreenProps> = ({ onBack, onLogout, onNavigateToDashboard }) => {
  // Données fictives
  const mockData: PalmaresItem[] = [
    { nom: "BERNABE COTE DIVOIRE", valeur: "BNBC", variation: 87.32 },
    { nom: "CFAO COTE DIVOIRE", valeur: "CFAC", variation: 315.83 },
    { nom: "NESTLE COTE DIVOIRE", valeur: "NTLC", variation: 91.58 },
    { nom: "SAFCA COTE DIVOIRE", valeur: "SAFC", variation: 400.00 },
    { nom: "SAPH COTE DIVOIRE", valeur: "SPHC", variation: 85.87 },
    { nom: "SETAO COTE DIVOIRE", valeur: "STAC", variation: 178.89 },
    { nom: "SITAB COTE DIVOIRE", valeur: "STBC", variation: 168.49 },
    { nom: "TRACTAFRIC MOTORS COTE DIVOIRE", valeur: "TRMC", variation: 115.23 },
    { nom: "UNILEVER COTE DIVOIRE", valeur: "UNLC", variation: 255.21 },
    { nom: "UNIWAX COTE DIVOIRE", valeur: "UNXC", variation: 346.34 },
  ];

  const [data, setData] = useState<PalmaresItem[]>(mockData);
  const [dateDebut, setDateDebut] = useState('01/01/2025');
  const [dateFin, setDateFin] = useState('31/10/2025');
  const [sortBy, setSortBy] = useState<'valeur' | 'variation'>('valeur');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleSort = (column: 'valeur' | 'variation') => {
    let sortedData = [...data];
    let newSortOrder: 'asc' | 'desc' = 'asc';
    
    // Si on clique sur la même colonne, inverser l'ordre
    if (sortBy === column) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    
    if (column === 'valeur') {
      // Tri alphabétique par nom
      sortedData.sort((a, b) => {
        const comparison = a.nom.localeCompare(b.nom);
        return newSortOrder === 'asc' ? comparison : -comparison;
      });
    } else {
      // Tri par variation
      sortedData.sort((a, b) => {
        const comparison = a.variation - b.variation;
        return newSortOrder === 'asc' ? comparison : -comparison;
      });
    }
    
    setSortBy(column);
    setSortOrder(newSortOrder);
    setData(sortedData);
  };

  const handleSearch = () => {
    // Logique de recherche par dates (pour plus tard)
    console.log('Recherche du', dateDebut, 'au', dateFin);
  };

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

      {/* Retour Button */}
      <TouchableOpacity style={styles.retourButton} onPress={onBack}>
        <Ionicons name="arrow-back" size={20} color="#ffffff" />
        <Text style={styles.retourText}>Retour</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        {/* Section Calendrier */}
        <View style={styles.calendarSection}>
          <View style={styles.dateRow}>
            <View style={styles.dateGroup}>
              <Text style={styles.dateLabel}>Du :</Text>
              <TextInput
                style={styles.dateInput}
                value={dateDebut}
                onChangeText={setDateDebut}
                placeholder="JJ/MM/AAAA"
                placeholderTextColor="#999999"
              />
            </View>
            <View style={styles.dateGroup}>
              <Text style={styles.dateLabel}>Au :</Text>
              <TextInput
                style={styles.dateInput}
                value={dateFin}
                onChangeText={setDateFin}
                placeholder="JJ/MM/AAAA"
                placeholderTextColor="#999999"
              />
            </View>
            <TouchableOpacity style={styles.okButton} onPress={handleSearch}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tableau Palmarès */}
        <View style={styles.tableContainer}>
          {/* Header du tableau */}
          <View style={styles.tableHeader}>
            <TouchableOpacity 
              style={[styles.headerCell, styles.headerCellLeft]}
              onPress={() => handleSort('valeur')}
            >
              <Text style={styles.headerText}>Valeur</Text>
              {sortBy === 'valeur' ? (
                <Ionicons 
                  name={sortOrder === 'asc' ? "arrow-up" : "arrow-down"} 
                  size={18} 
                  color="#2196F3" 
                />
              ) : (
                <Ionicons 
                  name="swap-vertical-outline" 
                  size={18} 
                  color="#999999" 
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.headerCell, styles.headerCellRight]}
              onPress={() => handleSort('variation')}
            >
              <Text style={styles.headerText}>Variation</Text>
              {sortBy === 'variation' ? (
                <Ionicons 
                  name={sortOrder === 'asc' ? "arrow-up" : "arrow-down"} 
                  size={18} 
                  color="#2196F3" 
                />
              ) : (
                <Ionicons 
                  name="swap-vertical-outline" 
                  size={18} 
                  color="#999999" 
                />
              )}
            </TouchableOpacity>
          </View>

          {/* Lignes du tableau */}
          {data.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.tableRow, 
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
              ]}
            >
              <View style={styles.cellLeft}>
                <Text style={styles.cellText}>{item.nom}</Text>
              </View>
              <View style={styles.cellRight}>
                <Text style={styles.variationText}>{item.variation.toFixed(2)} %</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PalmaresScreen;

