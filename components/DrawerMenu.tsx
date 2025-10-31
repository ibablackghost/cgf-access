import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.8;

interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  onNavigateToMarket?: () => void;
  onNavigateToDashboard?: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose, onLogout, onNavigateToMarket, onNavigateToDashboard }) => {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity 
          style={styles.overlay} 
          activeOpacity={1} 
          onPress={onClose}
        />
        
        <Animated.View 
          style={[
            styles.drawerContainer,
            {
              transform: [{ translateX: slideAnim }]
            }
          ]}
        >
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.logoSection}>
                <View style={styles.logoCircle}>
                  <Ionicons name="person" size={36} color="#5BA3D9" />
                </View>
              </View>
              <View style={styles.headerContent}>
                <Text style={styles.accountNumber}>Compte N° 0338631036</Text>
                <Text style={styles.userName}>M. PAPA IBRAHIMA DIAGNE</Text>
              </View>
            </View>

            <ScrollView style={styles.menuContent}>
              {/* Accueil */}
              <TouchableOpacity 
                style={styles.menuItem} 
                onPress={() => {
                  onClose();
                  if (onNavigateToDashboard) {
                    onNavigateToDashboard();
                  }
                }}
              >
                <Ionicons name="home" size={24} color="#ffffff" />
                <Text style={styles.menuText}>Accueil</Text>
              </TouchableOpacity>

              {/* Quitter */}
              <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
                <MaterialCommunityIcons name="logout" size={24} color="#ffffff" />
                <Text style={styles.menuText}>Quitter</Text>
              </TouchableOpacity>

              {/* Comptes */}
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="card" size={24} color="#ffffff" />
                <Text style={styles.menuText}>Comptes</Text>
              </TouchableOpacity>

              {/* Marché */}
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={() => {
                  onClose();
                  if (onNavigateToMarket) {
                    onNavigateToMarket();
                  }
                }}
              >
                <MaterialCommunityIcons name="layers" size={24} color="#ffffff" />
                <Text style={styles.menuText}>Marché</Text>
              </TouchableOpacity>

              {/* Mes informations personnelles */}
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="person" size={24} color="#ffffff" />
                <Text style={styles.menuText}>Mes informations personnelles</Text>
              </TouchableOpacity>

              {/* Modifier mon mot de passe */}
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="lock-closed" size={24} color="#ffffff" />
                <Text style={styles.menuText}>Modifier mon mot de passe</Text>
              </TouchableOpacity>

              {/* A propos de CGFAccessMobile */}
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="information-circle" size={24} color="#ffffff" />
                <Text style={styles.menuText}>A propos de CGFAccessMobile</Text>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#2c3e50',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 16,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    backgroundColor: '#34495e',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5BA3D9',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  headerContent: {
    alignItems: 'center',
  },
  accountNumber: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  userName: {
    color: '#e0e0e0',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  menuContent: {
    flex: 1,
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    backgroundColor: 'transparent',
  },
  menuText: {
    color: '#ffffff',
    fontSize: 15,
    marginLeft: 18,
    fontWeight: '500',
    flex: 1,
  },
});

export default DrawerMenu;

