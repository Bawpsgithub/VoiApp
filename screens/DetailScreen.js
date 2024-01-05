// Trong file DetailScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import BackButton from '../components/BackButton';

const DetailScreen = ({ route }) => {
  const { title, imageSource, content } = route.params;

  return (
    <View contentContainerStyle={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  image: {
    marginTop: 120,
    width: "100%",
    height: 225,
    borderRadius: 8,
    marginBottom: 15,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24, 
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
});

export default DetailScreen;
