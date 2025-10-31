import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';

interface DashboardScreenProps {
  onLogout?: () => void;
  onNavigateToMarket?: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onLogout, onNavigateToMarket }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerMenu 
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onLogout={handleLogout}
        onNavigateToMarket={onNavigateToMarket}
        onNavigateToDashboard={() => setMenuVisible(false)}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerIcon}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="menu" size={22} color="#1a1a1a" />
        </TouchableOpacity>

        <Text style={styles.logo}>CGF BOURSE</Text>
        
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="mail-outline" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="information-circle-outline" size={20} color="#1a1a1a" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={20} color="#1a1a1a" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Account Number */}
        <View style={styles.accountContainer}>
          <Text style={styles.accountText}>Compte TITRES - LIBRE N° 0338631036</Text>
        </View>

        {/* Portefeuille Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="briefcase" size={24} color="#ffffff" />
            </View>
            <Text style={styles.cardTitle}>Portefeuille</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Total portefeuille :</Text>
              <Text style={styles.value}>108 131 FCFA</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Total liquidité :</Text>
              <Text style={styles.value}>101 959 FCFA</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Actions :</Text>
              <Text style={styles.value}>0 FCFA</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.labelBold}>Total général :</Text>
              <Text style={styles.valueBold}>210 090 FCFA</Text>
            </View>
          </View>
        </View>

        {/* Marché Section */}
        <TouchableOpacity 
          style={styles.card}
          onPress={onNavigateToMarket}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="layers" size={24} color="#ffffff" />
            </View>
            <Text style={styles.cardTitle}>Marché</Text>
          </View>

          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>30/10/2025</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Volume des transactions</Text>
              <Text style={styles.value}>1 466 568 067 FCFA</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.closedText}>Fermé</Text>
              <Ionicons name="chevron-forward" size={20} color="#2196F3" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Indices Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Indices</Text>

          {/* BRVM30 */}
          <View style={styles.indexItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="trending-up" size={24} color="#ffffff" />
            </View>
            <View style={styles.indexContent}>
              <Text style={styles.indexName}>BRVM30</Text>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Valeur</Text>
                <Text style={styles.indexValue}>169.16</Text>
              </View>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Variation</Text>
                <Text style={styles.variationNegative}>-0.14 %</Text>
              </View>
            </View>
          </View>

          {/* BRVMC */}
          <View style={styles.indexItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="bar-chart" size={24} color="#ffffff" />
            </View>
            <View style={styles.indexContent}>
              <Text style={styles.indexName}>BRVMC</Text>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Valeur</Text>
                <Text style={styles.indexValue}>344.36</Text>
              </View>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Variation</Text>
                <Text style={styles.variationPositive}>0.15 %</Text>
              </View>
            </View>
          </View>

          {/* BRVM PRESTIGE */}
          <View style={styles.indexItem}>
            <View style={styles.iconContainer}>
              <Ionicons name="pie-chart" size={24} color="#ffffff" />
            </View>
            <View style={styles.indexContent}>
              <Text style={styles.indexName}>BRVM PRESTIGE</Text>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Valeur</Text>
                <Text style={styles.indexValue}>144.81</Text>
              </View>
              <View style={styles.indexRow}>
                <Text style={styles.indexLabel}>Variation</Text>
                <Text style={styles.variationPositive}>0.39 %</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    padding: 2,
  },
  logo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A8FC7',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  accountContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  accountText: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#1e3a5f',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  cardContent: {
    paddingLeft: 57,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: '#555555',
  },
  value: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  labelBold: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  valueBold: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  closedText: {
    fontSize: 12,
    color: '#555555',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  indexItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  indexContent: {
    flex: 1,
  },
  indexName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  indexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  indexLabel: {
    fontSize: 12,
    color: '#555555',
  },
  indexValue: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  variationNegative: {
    fontSize: 13,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  variationPositive: {
    fontSize: 13,
    color: '#388e3c',
    fontWeight: 'bold',
  },
});

export default DashboardScreen;

