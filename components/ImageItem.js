// ImageItem.js
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ImageItem = ({ source, onPress }) => {
  return (
    <View style={styles.imageContainer}>
      <Image source={source} style={styles.smallImage} />
      <TouchableOpacity style={styles.imageButton} onPress={onPress}>
        <Text style={styles.button}>Find out more</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  smallImage: {
    width: 382,
    height: 200,
    borderRadius: 8,
  },
  imageButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  button: {
    fontWeight: 'bold',
  },
});

export default ImageItem;
