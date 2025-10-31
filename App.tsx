import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MarketScreen from './screens/MarketScreen';
import MarketSummaryScreen from './screens/MarketSummaryScreen';
import Top5Screen from './screens/Top5Screen';
import PalmaresScreen from './screens/PalmaresScreen';

type Screen = 'login' | 'dashboard' | 'market' | 'market-summary' | 'top5' | 'palmares';

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

  const navigateToTop5 = () => {
    setCurrentScreen('top5');
  };

  const navigateToPalmares = () => {
    setCurrentScreen('palmares');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'palmares':
        return (
          <PalmaresScreen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
          />
        );
      case 'top5':
        return (
          <Top5Screen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
          />
        );
      case 'market-summary':
        return (
          <MarketSummaryScreen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
          />
        );
      case 'market':
        return (
          <MarketScreen 
            onBack={navigateToDashboard} 
            onNavigateToSummary={navigateToMarketSummary}
            onNavigateToTop5={navigateToTop5}
            onNavigateToPalmares={navigateToPalmares}
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
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

