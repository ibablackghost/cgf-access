import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MarketScreen from './screens/MarketScreen';

type Screen = 'login' | 'dashboard' | 'market';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const navigateToMarket = () => {
    setCurrentScreen('market');
  };

  const navigateToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'market':
        return <MarketScreen onBack={navigateToDashboard} />;
      case 'dashboard':
      default:
        return (
          <DashboardScreen 
            onLogout={handleLogout} 
            onNavigateToMarket={navigateToMarket}
          />
        );
    }
  };

  return (
    <>
      <StatusBar style={isLoggedIn ? "dark" : "light"} />
      {renderScreen()}
    </>
  );
}

