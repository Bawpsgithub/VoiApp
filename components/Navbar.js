// Navbar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../screens/HomeScreen';
import CardsScreen from '../screens/CardsScreen';
import OrderScreen from '../screens/OrderScreen';
import GiftScreen from '../screens/GiftScreen';
import StoreScreen from '../screens/StoreScreen';

const Tab = createBottomTabNavigator();

export function Navbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'star' : 'star';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Management') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Store') {
            iconName = focused ? 'window-restore' : 'window-restore';
          } 

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FC0202',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: { height: 100 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Management" component={OrderScreen} />
      <Tab.Screen name="Store" component={StoreScreen} />
      <Tab.Screen name="Profile" component={CardsScreen} />
    </Tab.Navigator>
  );
}
