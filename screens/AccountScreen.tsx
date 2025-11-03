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
import { styles } from '../styles/AccountScreen.styles';

interface AccountScreenProps {
  onBack: () => void;
  onLogout?: () => void;
  onNavigateToDashboard?: () => void;
  onNavigateToPortfolio?: () => void;
  onNavigateToStatement?: () => void;
  onNavigateToOrders?: () => void;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ 
  onBack, 
  onLogout, 
  onNavigateToDashboard,
  onNavigateToPortfolio,
  onNavigateToStatement,
  onNavigateToOrders,
}) => {
  const [drawerMenuVisible, setDrawerMenuVisible] = useState(false);

  const handleLogout = () => {
    setDrawerMenuVisible(false);
    if (onLogout) {
      onLogout();
    }
  };

  const accountOptions = [
    {
      id: 1,
      title: 'Portefeuille',
      icon: 'briefcase',
      iconType: 'ionicons' as const,
      onPress: onNavigateToPortfolio,
    },
    {
      id: 2,
      title: 'Relevé',
      icon: 'document-text',
      iconType: 'ionicons' as const,
      onPress: onNavigateToStatement,
    },
    {
      id: 3,
      title: 'Ordres de bourse',
      icon: 'swap-horizontal',
      iconType: 'ionicons' as const,
      onPress: onNavigateToOrders,
    },
  ];

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
        onNavigateToAccount={() => setDrawerMenuVisible(false)}
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

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {accountOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.cardWrapper}
            onPress={option.onPress}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={['#2E6DA4', '#0E2D5B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name={option.icon as any} size={40} color="#ffffff" />
                </View>
                
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{option.title}</Text>
                </View>

                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={28} color="#ffffff" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

