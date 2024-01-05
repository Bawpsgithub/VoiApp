import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../context/UserContext";

const ProfileScreen = () => {
  const { user } = useContext(UserContext);
  const navigation = useNavigation();

  const navigateToProfileDetail = () => {
    navigation.navigate('ProfileDetail');
  };
  const navigateToPurchaseHistoryScreen = () => {
    navigation.navigate('PurchaseHistoryScreen');
  };
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>Name:</Text>
          <Text style={styles.userInfoText}>{user.data.fullname}</Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoText}>{user.data.email}</Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>Address:</Text>
          <Text style={styles.userInfoText}>{user.data.address}</Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoLabel}>Role:</Text>
          <Text style={styles.userInfoText}>{user.isAdmin ? 'User' : 'Admin'}</Text>
        </View>
      </View>

      {/* Profile editing form */}
      <View style={styles.formContainer}>
        {/* Add your profile editing form components here */}

        {/* Profile button */}
        <TouchableOpacity style={styles.profileButton} onPress={navigateToProfileDetail}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Purchase History button */}
        <TouchableOpacity style={styles.purchaseHistoryButton} onPress={navigateToPurchaseHistoryScreen}>
          <Text style={styles.buttonText}>Purchase History</Text>
        </TouchableOpacity>

        {/* Log Out button */}
        <TouchableOpacity style={styles.logOutButton} onPress={navigateToSignIn}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  userInfoText: {
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  profileButton: {
    backgroundColor: '#2ecc71',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  purchaseHistoryButton: {
    backgroundColor: '#3498db',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  logOutButton: {
    backgroundColor: '#e74c3c',
    width: '80%',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
