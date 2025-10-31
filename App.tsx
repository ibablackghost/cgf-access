import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      <StatusBar style={isLoggedIn ? "dark" : "light"} />
      {isLoggedIn ? <DashboardScreen /> : <LoginScreen onLogin={handleLogin} />}
    </>
  );
}

