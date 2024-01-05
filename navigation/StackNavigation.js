// StackNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navbar } from '../components/Navbar'; 
import ProfileDetail from '../screens/ProfileDetail'; 
import SignIn from '../screens/SignInScreen'
import Menu from '../screens/MenuScreen'
import ControlDrinkScreen from '../screens/ControlDrinkScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import PurchaseHistoryScreen from '../screens/PurchaseHistoryScreen';
import UserScreen from '../screens/UserScreen'
import DetailScreen from '../screens/DetailScreen';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Navbar} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ControlDrink"
          component={ControlDrinkScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="ShoppingCartScreen"
          component={ShoppingCartScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PurchaseHistoryScreen"
          component={PurchaseHistoryScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
