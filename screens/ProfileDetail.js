import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import BackButton from '../components/BackButton';
import { UserContext } from '../context/UserContext';

const ProfileDetail = () => {
  const { user, setUserData } = useContext(UserContext);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user && user.data) {
      setFullname(user.data.fullname || '');
      setEmail(user.data.email || '');
      setAddress(user.data.address || '');
    }
  }, [user]);

  const handleSaveProfile = () => {
    // Update the user data in the context
    const updatedUser = { ...user, data: { ...user.data, fullname, address } };
    setUserData(updatedUser);

    // Show success alert
    Alert.alert('Success', 'Profile updated successfully', [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

    // Here you may want to send the updated data to your server
    console.log('Save profile:', { fullname, address });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Profile Detail</Text>

        {/* Fullname Input */}
        <TextInput
          style={styles.input}
          placeholder="Fullname"
          value={fullname}
          onChangeText={(text) => setFullname(text)}
        />

        {/* Email Input */}
        <View style={styles.input}>
          <Text style={styles.emailText}>{email}</Text>
        </View>

        {/* Address Input */}
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center', // Center vertically
  },
  content: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  emailText: {
    color: 'black', // Adjust the color as needed
  },
});

export default ProfileDetail;
