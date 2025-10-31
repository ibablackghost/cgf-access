import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    console.log('Login:', username, password);
    // Ici tu pourras connecter avec ton backend
    if (username && password) {
      onLogin();
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
    }
  };

  const handleForgotPassword = (): void => {
    console.log('Mot de passe oublié');
    Alert.alert('Fonctionnalité à venir');
  };

  const handleSignup = (): void => {
    console.log('Devenir client');
    Alert.alert('Fonctionnalité à venir');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Text style={styles.logoTextCGF}>CGF</Text>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrowText}>↗</Text>
              </View>
            </View>
            <View style={styles.accessContainer}>
              <Text style={styles.accessLetter}>A</Text>
              <Text style={styles.logoTextAccess}>ccess</Text>
            </View>
            <Text style={styles.tagline}>Votre partenaire bourse</Text>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Bienvenue</Text>
            <Text style={styles.welcomeSubtitle}>
              Connectez-vous pour accéder à votre compte
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Username Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre nom d'utilisateur"
                placeholderTextColor="#7a8b9e"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#7a8b9e"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#5BA3D9', '#4A8FC7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.loginButtonGradient}
              >
                <Text style={styles.loginButtonText}>Se connecter</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>

          {/* Become Client Section */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Vous n'avez pas de compte ?</Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={styles.signupLink}>Devenir client</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a2332',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  
  // Logo Styles
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoTextCGF: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#5BA3D9',
    letterSpacing: 4,
  },
  arrowContainer: {
    marginLeft: 4,
    marginBottom: 8,
  },
  arrowText: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  accessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accessLetter: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  logoTextAccess: {
    fontSize: 44,
    fontWeight: '600',
    color: '#5BA3D9',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 15,
    color: '#7a8b9e',
    marginTop: 12,
    fontStyle: 'italic',
  },

  // Welcome Section
  welcomeContainer: {
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#7a8b9e',
    lineHeight: 24,
  },

  // Form Styles
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#253447',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#2f3f54',
  },
  loginButton: {
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
    shadowColor: '#5BA3D9',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  loginButtonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#5BA3D9',
    fontSize: 15,
    fontWeight: '600',
  },

  // Signup Section
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#2f3f54',
  },
  signupText: {
    color: '#7a8b9e',
    fontSize: 15,
    marginRight: 6,
  },
  signupLink: {
    color: '#5BA3D9',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

