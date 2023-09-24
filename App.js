import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Card } from 'react-native-paper';
import ProfileScreen from './components/ProfileScreen';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CalendarScreen from './components/CalendarScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";


// Firebase konfigurationsobjekt med mine app-oplysninger
const firebaseConfig = {
  apiKey: "AIzaSyADVNN7l-WChOyTu1tVv_iepDxPIEujW5g",
  authDomain: "tendel-app.firebaseapp.com",
  projectId: "tendel-app",
  storageBucket: "tendel-app.appspot.com",
  messagingSenderId: "974531110501",
  appId: "1:974531110501:web:d83f0583e5de36c4a8c88c"
};

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  // Initialiserer Firebase, hvis den ikke allerede er det i forvejen
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
    console.log("Firebase On!");
  } else {
    console.log("Firebase not on!");
  }

  const auth = getAuth();

  // Funktion til at lytte efter ændringer i brugerens autentificeringsstatus
  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        callback({ loggedIn: true, user: user });
        console.log("You are logged in!");
      } else {
        callback({ loggedIn: false });
      }
    });
  }
  
// Overvågning af autentificeringsstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Gæstesiden der vises, når brugeren ikke er logget ind endnu
  const GuestPage = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>TENDEL</Text>
        <Card style={styles.card}>
          <SignUp />
        </Card>
        <Card style={styles.card}>
          <Login />
        </Card>
      </View>
    );
  }

  // Oprettelse af Bottom Tab Navigator, der viser enten brugerens profil eller kalenderen
  const Tab = createBottomTabNavigator();

  return user.loggedIn ? (<NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen name={'ProfileScreen'} component={ProfileScreen} options={{ tabBarIcon: () => (<Ionicons name="person" size={20} />), headerShown: null }} />
      <Tab.Screen name={'CalendarScreen'} component={CalendarScreen} options={{ tabBarIcon: () => (<Ionicons name="calendar" size={20} />), headerShown: null }} />
    </Tab.Navigator>
  </NavigationContainer>) : <GuestPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 20,
    marginVertical: 20,
    width: 350,
    alignItems: 'center',
  },
});