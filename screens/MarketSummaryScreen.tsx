import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';

interface Stock {
  Nom: string;
  Symbol: string;
  coursCloture?: string;
  coursOuverture?: string;
  coursVeille?: string;
  variationP?: string;
  volume?: string;
  // Champs pour les obligations
  coursJour?: string;
  tauxFacial?: string;
  valeurDernierCoupon?: string;
  dateDernierPaiement?: string;
  dateEcheanece?: string;
  dateEmission?: string;
}

interface MarketSummaryScreenProps {
  onBack: () => void;
  onLogout?: () => void;
}

const MarketSummaryScreen: React.FC<MarketSummaryScreenProps> = ({ onBack, onLogout }) => {
  // Données facultatives pour affichage
  const mockDataActions: Stock[] = [
    { Nom: "AIR LIQUIDE CI", Symbol: "SIVC", coursCloture: "700", coursOuverture: "700", coursVeille: "700", variationP: "0.00", volume: "3060000" },
    { Nom: "BANK OF AFRICA BENIN", Symbol: "BOAB", coursCloture: "4900", coursOuverture: "4900", coursVeille: "5000", variationP: "-2.00", volume: "2744500" },
    { Nom: "Bank Of Africa Burkina Faso", Symbol: "BOABF", coursCloture: "3670", coursOuverture: "3670", coursVeille: "3675", variationP: "-0.14", volume: "11376540" },
    { Nom: "BANK OF AFRICA CI", Symbol: "BOAC", coursCloture: "7145", coursOuverture: "7145", coursVeille: "7110", variationP: "0.49", volume: "15483845" },
    { Nom: "BANK OF AFRICA MALI", Symbol: "BOAM", coursCloture: "3720", coursOuverture: "3720", coursVeille: "4015", variationP: "-7.35", volume: "40596710" },
    { Nom: "BANK OF AFRICA NIGER", Symbol: "BOAN", coursCloture: "2600", coursOuverture: "2600", coursVeille: "2590", variationP: "0.39", volume: "42611050" },
    { Nom: "BERNABE CI", Symbol: "BNBC", coursCloture: "1050", coursOuverture: "1050", coursVeille: "1050", variationP: "0.00", volume: "0" },
    { Nom: "BICI COTE D'IVOIRE", Symbol: "BICC", coursCloture: "8000", coursOuverture: "8000", coursVeille: "7900", variationP: "1.27", volume: "1234567" },
  ];

  const mockDataObligations: Stock[] = [
    { Nom: "TPBF 6.5% 2020-2028 B", Symbol: "TPBF.O11", coursJour: "5002.0000", tauxFacial: "1.630000000000000", valeurDernierCoupon: "190.0000", dateDernierPaiement: "09/07/2025 00:00:00", dateEcheanece: "09/07/2028 00:00:00", dateEmission: "09/07/2020 00:00:00" },
    { Nom: "TPCI.O.28", Symbol: "TPCI.O28", coursJour: "9850.0000", tauxFacial: "6.500000000000000", valeurDernierCoupon: "650.0000", dateDernierPaiement: "15/06/2025 00:00:00", dateEcheanece: "15/06/2028 00:00:00", dateEmission: "15/06/2020 00:00:00" },
    { Nom: "TPCI.O.30", Symbol: "TPCI.O30", coursJour: "9920.0000", tauxFacial: "5.750000000000000", valeurDernierCoupon: "575.0000", dateDernierPaiement: "20/05/2025 00:00:00", dateEcheanece: "20/05/2030 00:00:00", dateEmission: "20/05/2022 00:00:00" },
  ];

  const [category, setCategory] = useState<'actions' | 'obligations'>('actions');
  const [stocks, setStocks] = useState<Stock[]>(mockDataActions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);

  const handleCategoryChange = (newCategory: 'actions' | 'obligations') => {
    setCategory(newCategory);
    setCategoryMenuVisible(false);
    if (newCategory === 'actions') {
      setStocks(mockDataActions);
    } else {
      setStocks(mockDataObligations);
    }
    // Appeler l'API correspondante
    fetchMarketData(newCategory);
  };

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const fetchMarketData = async (cat: 'actions' | 'obligations' = category) => {
    try {
      console.log('Appel API en cours pour:', cat);
      const response = await fetch('http://192.168.100.2/cgftradeserver/Service.svc/GetMarketSnapshot');
      console.log('Statut réponse:', response.status);
      
      const data = await response.json();
      console.log('Données reçues:', data);
      
      // Récupérer les actions depuis le champ "actionsCotees"
      if (cat === 'actions' && data.actionsCotees && Array.isArray(data.actionsCotees)) {
        console.log('Nombre d\'actions:', data.actionsCotees.length);
        setStocks(data.actionsCotees);
      } else if (cat === 'obligations' && data.obligations && Array.isArray(data.obligations)) {
        console.log('Nombre d\'obligations:', data.obligations.length);
        setStocks(data.obligations);
      } else {
        console.log('Format de données inattendu ou catégorie non trouvée');
        // Garder les données mockées
      }
    } catch (error) {
      console.error('Erreur API:', error);
      // Garder les données mockées
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMarketData();
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString('fr-FR');
  };

  const getVariationColor = (variation: string) => {
    const val = parseFloat(variation);
    if (val > 0) return '#4caf50';
    if (val < 0) return '#f44336';
    return '#666666';
  };

  const getVariationValue = (stock: Stock) => {
    if (category === 'obligations' && stock.tauxFacial) {
      return parseFloat(stock.tauxFacial).toFixed(4);
    }
    return stock.variationP ? parseFloat(stock.variationP).toFixed(4) : '0.0000';
  };

  const getCours = (stock: Stock) => {
    if (category === 'obligations' && stock.coursJour) {
      return formatNumber(stock.coursJour);
    }
    return stock.coursCloture ? formatNumber(stock.coursCloture) : '0';
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Résumé du marché</Text>
          <Text style={styles.subtitleText}>
            {stocks.length} titres • {category === 'actions' ? 'Actions' : 'Obligations'}
          </Text>
        </View>
        <View style={styles.titleBarActions}>
          <TouchableOpacity 
            style={styles.categoryMenuButton} 
            onPress={() => setCategoryMenuVisible(!categoryMenuVisible)}
          >
            <Ionicons name="menu" size={22} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.refreshIcon} onPress={() => fetchMarketData()}>
            <Ionicons name="refresh" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu déroulant des catégories */}
      {categoryMenuVisible && (
        <View style={styles.categoryMenuDropdown}>
          <TouchableOpacity
            style={[
              styles.categoryMenuItem,
              category === 'actions' && styles.categoryMenuItemActive
            ]}
            onPress={() => handleCategoryChange('actions')}
          >
            <Ionicons 
              name="trending-up" 
              size={20} 
              color={category === 'actions' ? '#2196F3' : '#666666'} 
            />
            <Text style={[
              styles.categoryMenuItemText,
              category === 'actions' && styles.categoryMenuItemTextActive
            ]}>
              Actions
            </Text>
            {category === 'actions' && (
              <Ionicons name="checkmark-circle" size={20} color="#2196F3" />
            )}
          </TouchableOpacity>
          
          <View style={styles.categoryMenuDivider} />
          
          <TouchableOpacity
            style={[
              styles.categoryMenuItem,
              category === 'obligations' && styles.categoryMenuItemActive
            ]}
            onPress={() => handleCategoryChange('obligations')}
          >
            <Ionicons 
              name="receipt" 
              size={20} 
              color={category === 'obligations' ? '#2196F3' : '#666666'} 
            />
            <Text style={[
              styles.categoryMenuItemText,
              category === 'obligations' && styles.categoryMenuItemTextActive
            ]}>
              Obligations
            </Text>
            {category === 'obligations' && (
              <Ionicons name="checkmark-circle" size={20} color="#2196F3" />
            )}
          </TouchableOpacity>
        </View>
      )}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2196F3']} />
          }
        >
          {stocks.map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={styles.stockCard}
              activeOpacity={0.8}
            >
              <View style={styles.cardHeader}>
                <View style={styles.symbolBadge}>
                  <Text style={styles.symbolText}>{stock.Symbol}</Text>
                </View>
                <View style={[
                  styles.variationBadge,
                  { backgroundColor: category === 'obligations' ? '#2196F320' : (parseFloat(stock.variationP || '0') >= 0 ? '#4caf5020' : '#f4433620') }
                ]}>
                  <Ionicons 
                    name={category === 'obligations' ? 'pricetag' : (parseFloat(stock.variationP || '0') >= 0 ? 'trending-up' : 'trending-down')} 
                    size={16} 
                    color={category === 'obligations' ? '#2196F3' : getVariationColor(stock.variationP || '0')} 
                  />
                  <Text style={[
                    styles.variationBadgeText,
                    { color: category === 'obligations' ? '#2196F3' : getVariationColor(stock.variationP || '0') }
                  ]}>
                    {category === 'obligations' ? '' : (parseFloat(stock.variationP || '0') > 0 ? '+' : '')}{getVariationValue(stock)}%
                  </Text>
                </View>
              </View>

              <Text style={styles.stockName}>{stock.Nom}</Text>

              <View style={styles.cardContent}>
                {category === 'actions' ? (
                  <>
                    <View style={styles.infoRow}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Dernier cours</Text>
                        <Text style={styles.infoValue}>{getCours(stock)} FCFA</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Volume</Text>
                        <Text style={styles.infoValue}>{formatNumber(stock.volume || '0')}</Text>
                      </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Ouverture</Text>
                        <Text style={styles.infoValueSmall}>{formatNumber(stock.coursOuverture || '0')}</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Veille</Text>
                        <Text style={styles.infoValueSmall}>{formatNumber(stock.coursVeille || '0')}</Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.infoRow}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Cours du jour</Text>
                        <Text style={styles.infoValue}>{getCours(stock)} FCFA</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Taux facial</Text>
                        <Text style={styles.infoValue}>{stock.tauxFacial ? parseFloat(stock.tauxFacial).toFixed(2) : '0.00'}%</Text>
                      </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Dernier coupon</Text>
                        <Text style={styles.infoValueSmall}>{formatNumber(stock.valeurDernierCoupon || '0')} FCFA</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Échéance</Text>
                        <Text style={styles.infoValueSmall}>
                          {stock.dateEcheanece ? stock.dateEcheanece.split(' ')[0] : 'N/A'}
                        </Text>
                      </View>
                    </View>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
  headerIconBtn: {
    padding: 6,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 0.5,
  },
  accountContainer: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#90caf9',
  },
  accountText: {
    fontSize: 13,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  retourButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E2D5B',
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  retourText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  titleBar: {
    backgroundColor: '#0E2D5B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 2,
    opacity: 0.9,
  },
  titleBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryMenuButton: {
    padding: 4,
  },
  refreshIcon: {
    padding: 4,
  },
  categoryMenuDropdown: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  categoryMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryMenuItemActive: {
    backgroundColor: '#e3f2fd',
  },
  categoryMenuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  categoryMenuItemTextActive: {
    color: '#2196F3',
  },
  categoryMenuDivider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 10,
  },
  stockCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  symbolBadge: {
    backgroundColor: '#0E2D5B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  symbolText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  variationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    gap: 4,
  },
  variationBadgeText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  cardContent: {
    marginBottom: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 3,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  infoValueSmall: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
});

export default MarketSummaryScreen;

