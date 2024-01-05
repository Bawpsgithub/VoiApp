import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CardsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Phần tiêu đề */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Starbucks eGift</Text>
        <Text style={styles.smallText}>
          Send a digital Starbucks Card to your loved ones with our eGift feature.
        </Text>
      
      </View>
      <Image
        source={require('./../assets/starbucks-gift.jpg')}
        style={styles.centerImage}
      />
    
      {/* Nút "Join now" */}
      <View style={styles. eGiftButtonContainer}>
        <TouchableOpacity style={styles. eGiftButton}>
          <Text style={styles.buttonText}>Start sending eGift</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#183D36',
    fontFamily: 'System',
    fontSize: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 90,
    color: 'white',
    textAlign: 'center',
  },

  smallText: {
    fontSize: 14.5,
    color: '#90A19C',
    marginTop: 50,
    marginLeft: 8,
    marginRight: 8,
    textAlign: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  eGiftButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  eGiftButton: {
    backgroundColor: '#01874D',
    paddingVertical: 12,
    paddingHorizontal: 124,
    borderRadius: 30,

  },
  centerImage: {
    width: 420, 
    height: 400, 
    alignSelf: 'center',
    marginTop: 60, 
  },
  
});

export default CardsScreen;
