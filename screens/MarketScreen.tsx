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
import { LinearGradient } from 'expo-linear-gradient';
import DrawerMenu from '../components/DrawerMenu';

interface MarketScreenProps {
  onBack: () => void;
  onNavigateToSummary?: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
}

const MarketScreen: React.FC<MarketScreenProps> = ({ onBack, onNavigateToSummary, onLogout, onNavigateToDashboard }) => {
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };
  const marketSections = [
    {
      id: 1,
      title: 'Résumé du marché',
      icon: 'layers',
      iconType: 'material',
      gradient: ['#2E6DA4', '#0E2D5B'] as const,
      description: 'Vue d\'ensemble du marché boursier',
    },
    {
      id: 2,
      title: 'Top 5',
      icon: 'trending-up',
      iconType: 'ionicons',
      gradient: ['#2E6DA4', '#0E2D5B'] as const,
      description: 'Les 5 meilleures performances',
    },
    {
      id: 3,
      title: 'Palmarès',
      icon: 'bar-chart',
      iconType: 'ionicons',
      gradient: ['#2E6DA4', '#0E2D5B'] as const,
      description: 'Classement complet des actions',
    },
    {
      id: 4,
      title: 'Echanges exceptionnels',
      icon: 'swap-horizontal',
      iconType: 'ionicons',
      gradient: ['#2E6DA4', '#0E2D5B'] as const,
      description: 'Volumes d\'échange inhabituels',
    },
    {
      id: 5,
      title: 'Ticker',
      icon: 'time',
      iconType: 'ionicons',
      gradient: ['#2E6DA4', '#0E2D5B'] as const,
      description: 'Cotations en temps réel',
    },
  ] as const;

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

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {marketSections.map((section, index) => (
          <TouchableOpacity
            key={section.id}
            style={styles.cardWrapper}
            activeOpacity={0.7}
            onPress={() => {
              if (section.id === 1 && onNavigateToSummary) {
                onNavigateToSummary();
              }
            }}
          >
            <LinearGradient
              colors={[...section.gradient]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  {section.iconType === 'material' ? (
                    <MaterialCommunityIcons 
                      name={section.icon as any} 
                      size={40} 
                      color="#ffffff" 
                    />
                  ) : (
                    <Ionicons 
                      name={section.icon as any} 
                      size={40} 
                      color="#ffffff" 
                    />
                  )}
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{section.title}</Text>
                  <Text style={styles.cardDescription}>{section.description}</Text>
                </View>

                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={28} color="#ffffff" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}

        {/* Info Footer */}
        <View style={styles.infoFooter}>
          <Ionicons name="information-circle-outline" size={20} color="#7a8b9e" />
          <Text style={styles.infoText}>
            Cliquez sur une section pour voir les détails
          </Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  cardWrapper: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  cardGradient: {
    borderRadius: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
  arrowContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  infoFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  infoText: {
    fontSize: 13,
    color: '#7a8b9e',
    marginLeft: 8,
    fontStyle: 'italic',
  },
});

export default MarketScreen;

