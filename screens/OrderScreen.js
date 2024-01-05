import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); 
  const isAdmin = user.data.isAdmin; 

  const navigateToProFile = () => {
    navigation.navigate('Profile');
  };

  const navigateToMenu = () => {
    navigation.navigate('Menu');
  };

  const navigateToControlDrinkScreen = () => {
    navigation.navigate('ControlDrink');
  };
  const navigateToUserScreen = () => {
    navigation.navigate('UserScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.buttonsRight}>
          <TouchableOpacity style={styles.profileButton} onPress={navigateToProFile}>
            <Image source={require('./../assets/profile.png')} style={styles.Icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>MENU</Text>
        <Text style={styles.orderDescription}>Order ahead and pick up your order</Text>
        <TouchableOpacity style={styles.orderButton} onPress={navigateToMenu}>
          <Text style={styles.orderButtonText}>ORDER NOW</Text>
        </TouchableOpacity>
        <View style={styles.circleImageContainer}>
          <Image source={require('./../assets/favicon.png')} style={styles.circleImage} />
        </View>
      </View>

      {isAdmin && (
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>DRINKS MANAGEMENT</Text>
          <Text style={styles.orderDescription}>Drinking water management</Text>
          <Text style={styles.orderDescription}>administrator</Text>
          <TouchableOpacity style={styles.orderButton} onPress={navigateToControlDrinkScreen}>
            <Text style={styles.orderButtonText}>MANAGE</Text>
          </TouchableOpacity>
          <View style={styles.circleImageContainer}>
            <Image source={require('./../assets/delivers.png')} style={styles.circleImage} />
          </View>
        </View>
      )}
      {isAdmin && (
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>USERS MANAGEMENT</Text>
          <Text style={styles.orderDescription}>Users management</Text>
          <Text style={styles.orderDescription}>administrator</Text>
          <TouchableOpacity style={styles.orderButton} onPress={navigateToUserScreen}>
            <Text style={styles.orderButtonText}>MANAGE</Text>
          </TouchableOpacity>
          <View style={styles.circleImageContainer}>
            <Image source={require('./../assets/delivers.png')} style={styles.circleImage} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System', 
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    fontFamily: 'System', 
    fontSize: 16,
  },
  header: {
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',

    marginTop: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 46,
  },
  Icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  buttonsRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inboxButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profileButton: {
    paddingLeft: 16,
  },
  orderContainer: {
    backgroundColor: '#F7F7F7',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  orderTitle: {
    fontSize: 14,
    marginBottom: 6,
  },
  orderDescription: {
    fontSize: 14,
    marginBottom: 0,
    fontWeight: 'bold',
  },
  orderButton: {
    backgroundColor: 'transparent',
    borderBottomWidth: 2, 
    borderColor: '#E01E3E', 
    paddingVertical: 2,
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#B22222', 
    marginTop: 60,
  },
  circleImageContainer: {
    position: 'absolute',
    top: 16, 
    right: 18, 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: 'white', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleImage: {
    width: 40, 
    height: 40, 
  },
  
});

export default HomeScreen;
