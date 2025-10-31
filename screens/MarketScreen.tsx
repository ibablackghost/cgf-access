import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/MarketScreen.styles';

interface MarketScreenProps {
  onBack: () => void;
  onNavigateToSummary?: () => void;
  onNavigateToTop5?: () => void;
  onNavigateToPalmares?: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
}

const MarketScreen: React.FC<MarketScreenProps> = ({ onBack, onNavigateToSummary, onNavigateToTop5, onNavigateToPalmares, onLogout, onNavigateToDashboard }) => {
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
              } else if (section.id === 2 && onNavigateToTop5) {
                onNavigateToTop5();
              } else if (section.id === 3 && onNavigateToPalmares) {
                onNavigateToPalmares();
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

export default MarketScreen;

