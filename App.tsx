import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import MarketScreen from './screens/MarketScreen';
import MarketSummaryScreen from './screens/MarketSummaryScreen';
import Top5Screen from './screens/Top5Screen';
import PalmaresScreen from './screens/PalmaresScreen';
import ExceptionalExchangesScreen from './screens/ExceptionalExchangesScreen';
import TickerScreen from './screens/TickerScreen';
import AccountScreen from './screens/AccountScreen';
import PortfolioScreen from './screens/PortfolioScreen';

type Screen = 'login' | 'dashboard' | 'market' | 'market-summary' | 'top5' | 'palmares' | 'exceptional-exchanges' | 'ticker' | 'account' | 'portfolio';

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

  const navigateToExceptionalExchanges = () => {
    setCurrentScreen('exceptional-exchanges');
  };

  const navigateToTicker = () => {
    setCurrentScreen('ticker');
  };

  const navigateToAccount = () => {
    setCurrentScreen('account');
  };

  const navigateToPortfolio = () => {
    setCurrentScreen('portfolio');
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
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'top5':
        return (
          <Top5Screen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'market-summary':
        return (
          <MarketSummaryScreen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'portfolio':
        return (
          <PortfolioScreen 
            onBack={navigateToAccount} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'account':
        return (
          <AccountScreen 
            onBack={navigateToDashboard} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
            onNavigateToPortfolio={navigateToPortfolio}
          />
        );
      case 'ticker':
        return (
          <TickerScreen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'exceptional-exchanges':
        return (
          <ExceptionalExchangesScreen 
            onBack={navigateToMarket} 
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'market':
        return (
          <MarketScreen 
            onBack={navigateToDashboard} 
            onNavigateToSummary={navigateToMarketSummary}
            onNavigateToTop5={navigateToTop5}
            onNavigateToPalmares={navigateToPalmares}
            onNavigateToExceptionalExchanges={navigateToExceptionalExchanges}
            onNavigateToTicker={navigateToTicker}
            onLogout={handleLogout}
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToAccount={navigateToAccount}
          />
        );
      case 'dashboard':
      default:
        return (
          <DashboardScreen 
            onLogout={handleLogout} 
            onNavigateToMarket={navigateToMarket}
            onNavigateToAccount={navigateToAccount}
          />
        );
    }
  };

  // Fonction pour passer onNavigateToAccount à tous les DrawerMenu
  const drawerMenuProps = {
    onNavigateToAccount: navigateToAccount,
    onNavigateToDashboard: navigateToDashboard,
    onNavigateToMarket: navigateToMarket,
  };

  return (
    <>
      <StatusBar style={isLoggedIn ? "dark" : "light"} />
      {renderScreen()}
    </>
  );
}

