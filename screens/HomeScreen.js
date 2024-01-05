import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import ImageItem from '../components/ImageItem';
import BackButton from '../components/BackButton';
const HomeScreen = () => {
  const {user} = useContext(UserContext);
  console.log("User:" ,user);
  const navigation = useNavigation();

  const navigateToDetail = (title, imageSource, content) => {
    navigation.navigate("Detail", {
      title,
      imageSource,
      content,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>It's a great day for coffee ☕</Text>
        <View style={styles.headerContent}>
          <View style={styles.buttonsLeft}></View>
        </View>
      </View>

      <ScrollView
        style={styles.imageList}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageCover}>
          <Image
            source={require('../assets/starbucks-0.jpg')}
            style={styles.Image}
          />
        </View>

        {/* Replace each imageContainer with ImageItem component */}
        <ImageItem
        source={require('../assets/starbucks-1.jpg')}
        onPress={() => navigateToDetail("Coffee is not Enough", require('../assets/starbucks-1.jpg'), "Most coffee farmers are dependent on coffee alone, a product that provides inadequate income, yet they lack the resources needed to invest in alternatives. Even though the cooperatives we work with produce fair trade, organic-certified coffees, most families have insufficient land to produce enough coffee to achieve an adequate livelihood.")}
        />

        <ImageItem
        source={require('../assets/starbucks-3.jpg')}
        onPress={() => navigateToDetail("Tea (Beverage)", require('../assets/starbucks-3.jpg'), "Tea beverage is prepared by pouring boiling water over processed tea leaves. Tea is valued for its taste, aroma, health benefits, and form part of some cultural practices. ")}
        />

        <ImageItem
        source={require('../assets/starbucks-2.jpg')}
        onPress={() => navigateToDetail("How Coffee is Processed", require('../assets/starbucks-2.jpg'), "The retail value of the U.S. coffee market was $48 billion in 2015, according to the Specialty Coffee Assoc. of America. The average American spends $21 a week on coffee, and average coffee drinkers drink three cups of coffee a day. Ready-to drink, iced, and cold brew coffee consumption is rising. Nitro coffee, coffee that is poured from a tap and has a mouthfeel similar to beer, is also rising in popularity. The single-cup category and foodservice coffee sales are also growing.")}
        />

        <ImageItem
        source={require('../assets/starbucks-4.jpg')}
        onPress={() => navigateToDetail("Is Bread Bad for You? Nutrition Facts and More", require('../assets/starbucks-4.jpg'), "The nutritional content of bread depends on the type. Whole-wheat and Ezekiel bread are healthier options compared to white or sourdough bread, which has more carbohydrates.")}
        />

        <ImageItem
        source={require('../assets/starbucks-5.jpg')}
        onPress={() => navigateToDetail("Mid-Autumn Festival Collection", require('../assets/starbucks-5.jpg'), "This Mid-Autumn festival, let's travel with us to the wonderland and hang out with little cute rabbits to enjoy happy moments under the fullmoon via Mid Autumn Collection. Collection is available from tomorrow - August 08th, 2022 at all Starbucks stores (except Noi Bai Airport, Ba Na and Nha Trang Vinwonders). Selected items are also available on the online stores at 7AM on the same day. Please see the price list at the latest post on our Facebook Starbucks Vietnam.")}
        />

        <ImageItem
        source={require('../assets/starbucks-6.jpg')}
        onPress={() => navigateToDetail("Mid-Autumn Cake", require('../assets/starbucks-6.jpg'), "You need a gift for your clients and business partners this Mid Autumn Festival? Starbucks mooncake is a perfect choice!")}
        />

        <ImageItem
        source={require('../assets/starbucks-7.jpg')}
        onPress={() => navigateToDetail("Starbucks® Blonde Roast Coffees", require('../assets/starbucks-7.jpg'), "Lighter-bodied and mellow, Starbucks® Blonde Roast coffees awaken the senses gently. They’re subtle and soft with mellow acidity, and deliver an approachable and flavorful cup with slight hints of roast.")}
        />

        <View style={styles.endOfList}>
          <Text>You're up to date!</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "System",
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    fontFamily: "System",
    fontSize: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 70,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  Icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  signInButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  inboxButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 18,
  },
  profileButton: {},
  imageList: {
    marginTop: 8,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 4,
  },
  imageCover: {
    position: "relative",
    marginBottom: 15,
  },
  smallImage: {
    width: 382,
    height: 200,
    borderRadius: 8,
  },

  Image: {
    width: 382,
    height: 225,
  },
  imageButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  button: {
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  endOfList: {
    alignItems: "center",
    marginTop: 16,
  },
  joinNowButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  joinNowButton: {
    backgroundColor: "#B22222",
    paddingVertical: 22,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
});

export default HomeScreen;
