import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/MarketSummaryScreen.styles';

interface Stock {
  Nom: string;
  Symbol?: string;
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
  // Champs pour les indices
  Titre?: string;
  prix?: number;
  var?: number;
}

interface MarketSummaryScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToAccount?: () => void;
}

const MarketSummaryScreen: React.FC<MarketSummaryScreenProps> = ({ onBack, onLogout, onNavigateToDashboard, onNavigateToAccount }) => {
  const [category, setCategory] = useState<'actions' | 'obligations' | 'indices'>('actions');
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);

  const handleCategoryChange = (newCategory: 'actions' | 'obligations' | 'indices') => {
    setCategory(newCategory);
    setCategoryMenuVisible(false);
    setLoading(true);
    // Appeler l'API correspondante
    fetchMarketData(newCategory);
  };

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const fetchMarketData = async (cat: 'actions' | 'obligations' | 'indices' = category) => {
    try {
      console.log('Appel API en cours pour:', cat);
      const response = await fetch('http://192.168.100.2/cgftradeserver/Service.svc/GetMarketSnapshot');
      console.log('Statut réponse:', response.status);
      
      const data = await response.json();
      console.log('Données reçues:', data);
      
      // Récupérer les données selon la catégorie
      if (cat === 'actions' && data.actionsCotees && Array.isArray(data.actionsCotees)) {
        console.log('Nombre d\'actions:', data.actionsCotees.length);
        setStocks(data.actionsCotees);
      } else if (cat === 'obligations' && data.obligations && Array.isArray(data.obligations)) {
        console.log('Nombre d\'obligations:', data.obligations.length);
        setStocks(data.obligations);
      } else if (cat === 'indices' && data.Indices && Array.isArray(data.Indices)) {
        console.log('Nombre d\'indices:', data.Indices.length);
        setStocks(data.Indices);
      } else {
        console.log('Format de données inattendu ou catégorie non trouvée');
        console.log('Réponse complète:', JSON.stringify(data));
        setStocks([]);
      }
    } catch (error) {
      console.error('Erreur API:', error);
      setStocks([]);
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
    if (category === 'indices' && stock.var !== undefined) {
      return stock.var.toFixed(4);
    }
    return stock.variationP ? parseFloat(stock.variationP).toFixed(4) : '0.0000';
  };

  const getCours = (stock: Stock) => {
    if (category === 'obligations' && stock.coursJour) {
      return formatNumber(stock.coursJour);
    }
    if (category === 'indices' && stock.prix !== undefined) {
      return stock.prix.toFixed(2);
    }
    return stock.coursCloture ? formatNumber(stock.coursCloture) : '0';
  };

  const getSymbol = (stock: Stock) => {
    return stock.Titre || stock.Symbol || 'N/A';
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Résumé du marché</Text>
          <Text style={styles.subtitleText}>
            {stocks.length} titres • {category === 'actions' ? 'Actions' : category === 'obligations' ? 'Obligations' : 'Indices'}
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
          
          <View style={styles.categoryMenuDivider} />
          
          <TouchableOpacity
            style={[
              styles.categoryMenuItem,
              category === 'indices' && styles.categoryMenuItemActive
            ]}
            onPress={() => handleCategoryChange('indices')}
          >
            <Ionicons 
              name="stats-chart" 
              size={20} 
              color={category === 'indices' ? '#2196F3' : '#666666'} 
            />
            <Text style={[
              styles.categoryMenuItemText,
              category === 'indices' && styles.categoryMenuItemTextActive
            ]}>
              Indices
            </Text>
            {category === 'indices' && (
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
                  <Text style={styles.symbolText}>{getSymbol(stock)}</Text>
                </View>
                <View style={[
                  styles.variationBadge,
                  { backgroundColor: category === 'obligations' ? '#2196F320' : 
                    (category === 'indices' && stock.var !== undefined ? (stock.var >= 0 ? '#4caf5020' : '#f4433620') :
                    (parseFloat(stock.variationP || '0') >= 0 ? '#4caf5020' : '#f4433620')) }
                ]}>
                  <Ionicons 
                    name={category === 'obligations' ? 'pricetag' : 
                      (category === 'indices' && stock.var !== undefined ? (stock.var >= 0 ? 'trending-up' : 'trending-down') :
                      (parseFloat(stock.variationP || '0') >= 0 ? 'trending-up' : 'trending-down'))} 
                    size={16} 
                    color={category === 'obligations' ? '#2196F3' : 
                      (category === 'indices' && stock.var !== undefined ? (stock.var >= 0 ? '#4caf50' : '#f44336') :
                      getVariationColor(stock.variationP || '0'))} 
                  />
                  <Text style={[
                    styles.variationBadgeText,
                    { color: category === 'obligations' ? '#2196F3' : 
                      (category === 'indices' && stock.var !== undefined ? (stock.var >= 0 ? '#4caf50' : '#f44336') :
                      getVariationColor(stock.variationP || '0')) }
                  ]}>
                    {category === 'obligations' ? '' : 
                      (category === 'indices' && stock.var !== undefined ? (stock.var > 0 ? '+' : '') :
                      (parseFloat(stock.variationP || '0') > 0 ? '+' : ''))}{getVariationValue(stock)}%
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
                ) : category === 'indices' ? (
                  <>
                    <View style={styles.infoRow}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Valeur de l'indice</Text>
                        <Text style={styles.infoValue}>{getCours(stock)}</Text>
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

export default MarketSummaryScreen;

