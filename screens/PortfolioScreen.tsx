import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/PortfolioScreen.styles';

interface PortfolioItem {
  titre: string;
  quantite: number;
  cours: number;
  montant: number;
}

interface PortfolioScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAccount?: () => void;
}

const PortfolioScreen: React.FC<PortfolioScreenProps> = ({ 
  onBack, 
  onLogout, 
  onNavigateToDashboard,
  onNavigateToAccount,
}) => {
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);
  const [portfolioDate, setPortfolioDate] = useState('03/11/2025');

  // Données d'exemple - à remplacer par des données de l'API
  const [portfolioItems] = useState<PortfolioItem[]>([
    { titre: 'FCP CAPITAL RETRAITE', quantite: 85, cours: 1259, montant: 108131 },
  ]);

  // Résumé
  const totalPortefeuille = portfolioItems.reduce((sum, item) => sum + item.montant, 0);
  const totalLiquidite = 251959;
  const liquiditeDisponible = 251959;
  const liquiditeReservee = 0;
  const totalGeneral = totalPortefeuille + totalLiquidite;

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('fr-FR');
  };

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.tableHeaderCell, styles.tableHeaderCellFirst]}>
        <Text style={styles.tableHeaderText}>Titre</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Quantité</Text>
      </View>
      <View style={styles.tableHeaderCell}>
        <Text style={styles.tableHeaderText}>Cours</Text>
      </View>
      <View style={[styles.tableHeaderCell, styles.tableHeaderCellLast]}>
        <Text style={styles.tableHeaderText}>Montant</Text>
      </View>
    </View>
  );

  const renderTableRow = ({ item, index }: { item: PortfolioItem; index: number }) => (
    <View style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlternate]}>
      <View style={[styles.tableCell, styles.tableCellFirst]}>
        <Text style={styles.tableCellText}>{item.titre}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{item.quantite}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.tableCellText}>{formatNumber(item.cours)}</Text>
      </View>
      <View style={[styles.tableCell, styles.tableCellLast]}>
        <Text style={styles.tableCellText}>{formatNumber(item.montant)}</Text>
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

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Portfolio Date Card */}
        <View style={styles.dateCard}>
          <Text style={styles.dateLabel}>Portefeuille :</Text>
          <View style={styles.dateInputContainer}>
            <Text style={styles.dateInput}>{portfolioDate}</Text>
            <TouchableOpacity style={styles.calendarButton}>
              <Ionicons name="calendar-outline" size={22} color="#0E2D5B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Portfolio Table */}
        <View style={styles.tableContainer}>
          {renderTableHeader()}
          <FlatList
            data={portfolioItems}
            renderItem={renderTableRow}
            keyExtractor={(item, index) => `${item.titre}-${index}`}
            scrollEnabled={false}
          />
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Portefeuille</Text>
            <Text style={styles.summaryValue}>{formatNumber(totalPortefeuille)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Liquidité</Text>
            <Text style={styles.summaryValue}>{formatNumber(totalLiquidite)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Liquidité Disponible</Text>
            <Text style={styles.summaryValue}>{formatNumber(liquiditeDisponible)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Liquidité Réservée</Text>
            <Text style={styles.summaryValue}>{formatNumber(liquiditeReservee)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryRowTotal]}>
            <Text style={styles.summaryLabelTotal}>Total général</Text>
            <Text style={styles.summaryValueTotal}>{formatNumber(totalGeneral)}</Text>
          </View>
        </View>

        {/* Edition Button */}
        <TouchableOpacity style={styles.editionButton} activeOpacity={0.8}>
          <Text style={styles.editionButtonText}>Edition Portefeuille</Text>
          <Ionicons name="print-outline" size={22} color="#ffffff" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PortfolioScreen;

