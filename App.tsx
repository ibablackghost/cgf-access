import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MarketScreen from './screens/MarketScreen';
import MarketSummaryScreen from './screens/MarketSummaryScreen';

type Screen = 'login' | 'dashboard' | 'market' | 'market-summary';

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

  const navigateToMarketSummary = () => {
    setCurrentScreen('market-summary');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'market-summary':
        return <MarketSummaryScreen onBack={navigateToMarket} onLogout={handleLogout} />;
      case 'market':
        return (
          <MarketScreen 
            onBack={navigateToDashboard} 
            onNavigateToSummary={navigateToMarketSummary}
            onLogout={handleLogout}
          />
        );
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

