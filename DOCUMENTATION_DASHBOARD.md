# Documentation du Dashboard Screen

## Vue d'ensemble

Le `DashboardScreen` est le composant principal de l'application CGF BOURSE qui affiche le tableau de bord de l'utilisateur après connexion. Il présente les informations du compte, le portefeuille, les données du marché et les indices boursiers.

## Structure du fichier

Le code est situé dans `screens/DashboardScreen.tsx` et utilise des styles séparés dans `styles/DashboardScreen.styles.ts`.

---

## 1. Imports et dépendances

### Imports React et React Native

```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
```

**Explication :**
- `React` : Bibliothèque principale pour créer des composants
- `useState` : Hook React pour gérer l'état local du composant (visibilité du menu)
- `View` : Conteneur de base pour afficher des éléments
- `Text` : Composant pour afficher du texte
- `ScrollView` : Permet de faire défiler le contenu lorsque celui-ci dépasse la taille de l'écran
- `TouchableOpacity` : Composant cliquable avec effet de transparence au toucher
- `SafeAreaView` : Assure que le contenu s'affiche dans les zones sécurisées de l'écran (évite les encoches)

### Imports d'icônes

```typescript
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
```

**Explication :**
- Deux bibliothèques d'icônes utilisées pour les éléments graphiques de l'interface

### Imports de composants personnalisés

```typescript
import DrawerMenu from '../components/DrawerMenu';
import { styles } from '../styles/DashboardScreen.styles';
```

**Explication :**
- `DrawerMenu` : Menu latéral (tiroir) qui s'affiche depuis la gauche
- `styles` : Styles CSS-in-JS pour le design du composant

---

## 2. Interface TypeScript

```typescript
interface DashboardScreenProps {
  onLogout?: () => void;
  onNavigateToMarket?: () => void;
}
```

**Explication :**
- Définit les propriétés (props) que le composant peut recevoir
- `onLogout` : Fonction optionnelle appelée lors de la déconnexion
- `onNavigateToMarket` : Fonction optionnelle pour naviguer vers l'écran du marché
- Les `?` indiquent que ces propriétés sont optionnelles

---

## 3. Composant principal

```typescript
const DashboardScreen: React.FC<DashboardScreenProps> = ({ onLogout, onNavigateToMarket }) => {
```

**Explication :**
- Déclaration du composant fonctionnel TypeScript
- `React.FC` : Type pour un composant fonctionnel React
- Les props sont destructurées directement dans les paramètres

---

## 4. État local (State)

```typescript
const [menuVisible, setMenuVisible] = useState(false);
```

**Explication :**
- Utilise le hook `useState` pour gérer la visibilité du menu latéral
- `menuVisible` : Variable d'état (booléen), initialisée à `false` (menu caché)
- `setMenuVisible` : Fonction pour modifier l'état
- Par défaut, le menu n'est pas visible

---

## 5. Fonctions

### Fonction handleLogout

```typescript
const handleLogout = () => {
  setMenuVisible(false);
  if (onLogout) {
    onLogout();
  }
};
```

**Explication :**
1. Ferme le menu latéral en mettant `menuVisible` à `false`
2. Vérifie si la fonction `onLogout` existe (grâce au `if`)
3. Si elle existe, l'appelle pour déconnecter l'utilisateur

---

## 6. Structure du rendu (JSX)

### Conteneur principal

```typescript
<SafeAreaView style={styles.container}>
```

**Explication :**
- `SafeAreaView` : Conteneur qui respecte les zones sécurisées de l'appareil
- Affiche tout le contenu du dashboard

### Composant DrawerMenu

```typescript
<DrawerMenu 
  visible={menuVisible}
  onClose={() => setMenuVisible(false)}
  onLogout={handleLogout}
  onNavigateToMarket={onNavigateToMarket}
  onNavigateToDashboard={() => setMenuVisible(false)}
/>
```

**Explication :**
- `visible` : Contrôle si le menu est affiché ou non
- `onClose` : Fonction anonyme qui ferme le menu
- `onLogout` : Utilise la fonction `handleLogout` définie plus haut
- `onNavigateToMarket` : Passe la fonction de navigation reçue en props
- `onNavigateToDashboard` : Ferme le menu si on navigue vers le dashboard (déjà sur cette page)

### Header (En-tête)

```typescript
<View style={styles.header}>
  <TouchableOpacity 
    style={styles.headerIcon}
    onPress={() => setMenuVisible(true)}
  >
    <Ionicons name="menu" size={22} color="#1a1a1a" />
  </TouchableOpacity>

  <Text style={styles.logo}>CGF BOURSE</Text>
  
  <View style={styles.headerIcons}>
    {/* Icônes de recherche, email, info, notifications */}
  </View>
</View>
```

**Explication :**
- Contient trois parties principales :
  1. **Icône menu** : Bouton cliquable qui ouvre le menu latéral
  2. **Logo** : Texte "CGF BOURSE" centré
  3. **Icônes de droite** : Recherche, email, informations, notifications (non fonctionnelles pour l'instant)

### ScrollView

```typescript
<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
```

**Explication :**
- Permet de faire défiler le contenu verticalement
- `showsVerticalScrollIndicator={false}` : Cache la barre de défilement

### Section Informations du compte

```typescript
<View style={styles.accountContainer}>
  <View style={styles.avatarCircle}>
    <Ionicons name="person" size={28} color="#ffffff" />
  </View>
  <View style={styles.accountInfo}>
    <Text style={styles.userName}>M. PAPA IBRAHIMA DIAGNE</Text>
    <View style={styles.accountNumberRow}>
      <Ionicons name="card-outline" size={14} color="#666666" />
      <Text style={styles.accountNumber}>Compte TITRES - LIBRE</Text>
    </View>
    <Text style={styles.accountNumberValue}>N° 0338631036</Text>
  </View>
</View>
```

**Explication :**
- Affiche les informations de l'utilisateur connecté
- **Avatar** : Cercle bleu foncé avec icône de personne
- **Nom** : Nom de l'utilisateur en gras
- **Type de compte** : "Compte TITRES - LIBRE" avec icône de carte
- **Numéro de compte** : Numéro d'identification du compte

### Section Portefeuille

```typescript
<View style={styles.card}>
  <View style={styles.cardHeader}>
    <View style={styles.iconContainer}>
      <Ionicons name="briefcase" size={24} color="#ffffff" />
    </View>
    <Text style={styles.cardTitle}>Portefeuille</Text>
  </View>
  
  <View style={styles.cardContent}>
    <View style={styles.row}>
      <Text style={styles.label}>Total portefeuille :</Text>
      <Text style={styles.value}>108 131 FCFA</Text>
    </View>
    {/* Autres lignes similaires */}
  </View>
</View>
```

**Explication :**
- Carte blanche avec bordure bleue à gauche
- **En-tête de carte** : Icône de portefeuille + titre
- **Contenu** : Affiche différentes valeurs financières :
  - Total portefeuille
  - Total liquidité
  - Actions
  - Total général (en gras)

### Section Marché

```typescript
<TouchableOpacity 
  style={styles.card}
  onPress={onNavigateToMarket}
  activeOpacity={0.7}
>
```

**Explication :**
- C'est un `TouchableOpacity` (cliquable) au lieu d'un simple `View`
- Au clic, navigue vers l'écran du marché
- `activeOpacity={0.7}` : Réduit l'opacité à 70% quand on appuie dessus
- Affiche la date du marché, le volume des transactions et un statut "Fermé"

### Section Indices

```typescript
<View style={styles.card}>
  <Text style={styles.sectionTitle}>Indices</Text>
  
  {/* BRVM30 */}
  <View style={styles.indexItem}>
    <View style={styles.iconContainer}>
      <Ionicons name="trending-up" size={24} color="#ffffff" />
    </View>
    <View style={styles.indexContent}>
      <Text style={styles.indexName}>BRVM30</Text>
      <View style={styles.indexRow}>
        <Text style={styles.indexLabel}>Valeur</Text>
        <Text style={styles.indexValue}>169.16</Text>
      </View>
      <View style={styles.indexRow}>
        <Text style={styles.indexLabel}>Variation</Text>
        <Text style={styles.variationNegative}>-0.14 %</Text>
      </View>
    </View>
  </View>
  
  {/* BRVMC et BRVM PRESTIGE similaires */}
</View>
```

**Explication :**
- Affiche trois indices boursiers :
  1. **BRVM30** : Avec icône trending-up
  2. **BRVMC** : Avec icône bar-chart
  3. **BRVM PRESTIGE** : Avec icône pie-chart
- Chaque indice affiche :
  - Son nom
  - Sa valeur actuelle
  - Sa variation en pourcentage (rouge si négatif, vert si positif)

---

## 7. Styles (DashboardScreen.styles.ts)

Les styles sont définis dans un fichier séparé pour une meilleure organisation.

### Principaux styles

- **container** : Fond gris clair, prend toute la hauteur disponible
- **header** : Fond blanc, barre en bas, contient le logo et les icônes
- **card** : Cartes blanches avec ombre et bordure bleue à gauche
- **iconContainer** : Cercles bleu foncé pour les icônes
- **variationNegative** : Texte rouge pour les variations négatives
- **variationPositive** : Texte vert pour les variations positives

### Propriétés de style importantes

- `flex: 1` : Prend tout l'espace disponible
- `flexDirection: 'row'` : Aligne les éléments horizontalement
- `borderRadius` : Arrondit les coins
- `shadowColor`, `shadowOffset`, `shadowOpacity`, `shadowRadius` : Crée des ombres
- `elevation` : Ombre pour Android

---

## 8. Flux de navigation

1. **Menu hamburger** → Ouvre le menu latéral
2. **Section Marché** → Cliquable, navigue vers `MarketScreen`
3. **Menu latéral** → Permet de naviguer entre les écrans et de se déconnecter

---

## 9. Points techniques importants

### Gestion d'état

- Utilise `useState` pour gérer uniquement la visibilité du menu
- Les données (portefeuille, indices) sont actuellement codées en dur (statiques)

### Performance

- `ScrollView` permet de gérer de longs contenus
- Les icônes sont des composants vectoriels (légers)

### Accessibilité

- Utilise `SafeAreaView` pour respecter les zones sécurisées
- Les éléments cliquables utilisent `TouchableOpacity` avec feedback visuel

---

## 10. Améliorations possibles

1. **Données dynamiques** : Remplacer les valeurs codées en dur par des appels API
2. **Chargement** : Ajouter des états de chargement pendant la récupération des données
3. **Erreurs** : Gérer les cas d'erreur de connexion
4. **Actualisation** : Ajouter un mécanisme de rafraîchissement (pull-to-refresh)
5. **Animations** : Ajouter des animations lors du chargement des données

---

## Conclusion

Le `DashboardScreen` est un composant React Native bien structuré qui affiche les informations principales de l'utilisateur. Il utilise des composants React Native standards et une architecture propre avec séparation des styles. Le code est maintenable et extensible pour ajouter de nouvelles fonctionnalités.

