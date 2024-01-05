// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import StackNavigator from './navigation/StackNavigation';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <StackNavigator />
      <StatusBar style="auto" />
    </UserProvider>
  );
}
