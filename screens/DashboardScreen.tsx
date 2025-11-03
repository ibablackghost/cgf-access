import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/DashboardScreen.styles';

interface DashboardScreenProps {
  onLogout?: () => void;
  onNavigateToMarket?: () => void;
  onNavigateToAccount?: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ onLogout, onNavigateToMarket, onNavigateToAccount }) => {
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
        onNavigateToAccount={() => {
          setMenuVisible(false);
          if (onNavigateToAccount) {
            onNavigateToAccount();
          }
        }}
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
        {/* Account Information */}
        <View style={styles.accountContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={28} color="#ffffff" />
          </View>
          <View style={styles.accountInfo}>
            <Text style={styles.userName}>M. PAPA IBRAHIMA DIAGNE</Text>
            <View style={styles.accountNumberRow}>
              <Ionicons name="card-outline" size={14} color="#666666" />
              <Text style={styles.accountNumber}>Compte TITRES - LIBRE</Text>
            </View>
            <Text style={styles.accountNumberValue}>N° 0338631036</Text>
          </View>
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

export default DashboardScreen;

