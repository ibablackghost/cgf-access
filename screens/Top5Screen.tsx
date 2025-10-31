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
import { styles } from '../styles/Top5Screen.styles';

interface Top5Item {
  Nom: string;
  Titre: string;
  prix: number;
  var: number;
}

interface VolumeItem {
  Nom: string;
  Titre: string;
  volume: string;
}

interface Top5ScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
}

const Top5Screen: React.FC<Top5ScreenProps> = ({ onBack, onLogout, onNavigateToDashboard }) => {
  const [hausses, setHausses] = useState<Top5Item[]>([]);
  const [baisses, setBaisses] = useState<Top5Item[]>([]);
  const [volumes, setVolumes] = useState<VolumeItem[]>([
    { Nom: "SOLIBRA CI", Titre: "SLBC", volume: "472 741 705" },
    { Nom: "SAPH CI", Titre: "SPHC", volume: "273 467 180" },
    { Nom: "SOGB CI", Titre: "SOGC", volume: "197 287 620" },
    { Nom: "UNIWAX CI", Titre: "UNXC", volume: "160 661 485" },
    { Nom: "SONATEL SN", Titre: "SNTS", volume: "76 645 415" },
  ]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const fetchTop5Data = async () => {
    try {
      console.log('Appel API Top 5 en cours...');
      const response = await fetch('http://192.168.100.2/cgftradeserver/Service.svc/GetMarketSnapshot');
      console.log('Statut réponse:', response.status);
      
      const data = await response.json();
      console.log('Données reçues:', data);
      
      // Récupérer TOP5H (hausses) et TOP5B (baisses)
      if (data.TOP5H && Array.isArray(data.TOP5H)) {
        console.log('Nombre de hausses:', data.TOP5H.length);
        setHausses(data.TOP5H);
      } else {
        console.log('TOP5H non trouvé');
        setHausses([]);
      }

      if (data.TOP5B && Array.isArray(data.TOP5B)) {
        console.log('Nombre de baisses:', data.TOP5B.length);
        setBaisses(data.TOP5B);
      } else {
        console.log('TOP5B non trouvé');
        setBaisses([]);
      }
    } catch (error) {
      console.error('Erreur API Top 5:', error);
      setHausses([]);
      setBaisses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTop5Data();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTop5Data();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-FR');
  };

  const formatVariation = (variation: number) => {
    return Math.abs(variation).toFixed(2);
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
          <Text style={styles.titleText}>Top 5</Text>
          <Text style={styles.subtitleText}>
            Meilleures performances du marché
          </Text>
        </View>
        <TouchableOpacity style={styles.refreshIcon} onPress={() => fetchTop5Data()}>
          <Ionicons name="refresh" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

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
          {/* Section: Les 5 plus fortes hausses */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="trending-up" size={24} color="#4caf50" />
              <Text style={styles.sectionTitle}>Les 5 plus fortes hausses</Text>
            </View>
            
            {hausses.length > 0 ? (
              hausses.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemName}>{item.Nom}</Text>
                    <Text style={styles.itemSymbol}>{item.Titre}</Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemPrice}>{formatNumber(item.prix)} FCFA</Text>
                    <View style={[styles.variationBadge, styles.variationPositive]}>
                      <Ionicons name="arrow-up" size={14} color="#4caf50" />
                      <Text style={styles.variationTextPositive}>
                        +{formatVariation(item.var)} %
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Aucune donnée disponible</Text>
            )}
          </View>

          {/* Section: Les 5 plus fortes baisses */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="trending-down" size={24} color="#f44336" />
              <Text style={styles.sectionTitle}>Les 5 plus fortes baisses</Text>
            </View>
            
            {baisses.length > 0 ? (
              baisses.map((item, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemLeft}>
                    <Text style={styles.itemName}>{item.Nom}</Text>
                    <Text style={styles.itemSymbol}>{item.Titre}</Text>
                  </View>
                  <View style={styles.itemRight}>
                    <Text style={styles.itemPrice}>{formatNumber(item.prix)} FCFA</Text>
                    <View style={[styles.variationBadge, styles.variationNegative]}>
                      <Ionicons name="arrow-down" size={14} color="#f44336" />
                      <Text style={styles.variationTextNegative}>
                        {formatVariation(item.var)} %
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>Aucune donnée disponible</Text>
            )}
          </View>

          {/* Section: Top 5 des volumes */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="bar-chart" size={24} color="#2196F3" />
              <Text style={styles.sectionTitle}>Top 5 des volumes de transaction</Text>
            </View>
            
            {volumes.map((item, index) => (
              <View key={index} style={styles.itemCard}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemName}>{item.Nom}</Text>
                  <Text style={styles.itemSymbol}>{item.Titre}</Text>
                </View>
                <View style={styles.itemRight}>
                  <Text style={styles.volumeText}>{item.volume} FCFA</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Top5Screen;

