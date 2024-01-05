import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BackButton from '../components/BackButton';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../context/UserContext";

const MenuScreen = () => {
  const navigation = useNavigation();
  const [uniqueDrinkTypes, setUniqueDrinkTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [drinksByType, setDrinksByType] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(UserContext);
  const token = user.data.token;
  const userId = user.data.id;
  const allDrinkTypes = ['All', ...uniqueDrinkTypes];

  const [drinksForAll, setDrinksForAll] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const drinkImages = {
    "Hazelnut Macchiato": require("../assets/hazelnut-macchiato.jpg"),
    "Café Latte": require("../assets/caffee-latte.jpg"),
    "Espresso Con Panna": require("../assets/espressoconpanna.jpg"),
    "Iced Caffè Mocha": require("../assets/iced-caffee-mocha_tcm89-2099_w1024_n.jpg"),
    "Hot Chocolate Classic": require("../assets/hot-chocolate_tcm89-2025_w1024_n.jpg"),
    "Asian Dolce Frappuccino® Blended Beverage": require("../assets/mocha-blanco-frappuccino-blended_tcm89-18629_w1024_n.png"),
    "Java Chip Frappuccino® Light Blended Beverage": require("../assets/java-chip-frappuccino-blended-coffee_tcm89-3771_w1024_n.jpg"),
    "Speermint Green": require("../assets/drinks-spearmint-green-tea-menu-asset_tcm89-9943_w1024_n.jpg"),
    "Black Shaken Iced Tea": require("../assets/iced-tea-black-menu-asset_tcm89-9906_w1024_n.jpg"),
    "Vanilla Cream Frappuccino® Blended Beverage": require("../assets/vanilla-bean-creme-frappuccino-blended-creme_tcm89-3791_w1024_n.jpg"),
    "Raspberry Black Currant Blended Juice": require("../assets/frappuccinadeframboesa-pt_tcm89-11346_w1024_n.jpg"),
    "Iced Skinny Flavored Latte": require("../assets/iced-skinny-flavored-latte_tcm89-2110_w1024_n.jpg"),
    // Add more entries for other drinks
  };
  useEffect(() => {
    axios
      .get("http://172.16.2.4:8000/api/drink/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDrinksForAll(response.data.data);
        setDrinksByType(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://172.16.2.4:8000/api/drink/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const allDrinkTypes = response.data.data.map((drink) => drink.type);
        const uniqueTypes = [...new Set(allDrinkTypes)];
        setUniqueDrinkTypes(uniqueTypes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // Calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalQuantity);
  }, [cartItems]);

  const handleTypeClick = (type) => {
    if (type === 'All') {
      setDrinksByType(drinksForAll);
      setSelectedType(type);
      if (drinksForAll.length > 0) {
        setSelectedName(drinksForAll[0].name);
        setSelectedPrice(drinksForAll[0].price);
      }
    } else {
      axios
        .get("http://172.16.2.4:8000/api/drink/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const drinksWithType = response.data.data.filter((drink) => drink.type === type);
          setDrinksByType(drinksWithType);
          setSelectedType(type);
          if (drinksWithType.length > 0) {
            setSelectedName(drinksWithType[0].name);
            setSelectedPrice(drinksWithType[0].price);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addToCart = (drink) => {
    // Check if the item is already in the cart
    const existingItemIndex = cartItems.findIndex((item) => item.id === drink._id);
  
    if (existingItemIndex !== -1) {
      // Item exists in the cart, increase quantity
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return updatedCartItems;
      });
    } else {
      // Item is not in the cart, add it with the default quantity of 1
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { id: drink._id, name: drink.name, price: drink.price, quantity: 1 },
      ]);
  
      // Increase cartCount only if the item is not already in the cart
      setCartCount((prevCount) => prevCount + 1);
    }
  };
  
  const navigateToShoppingCartScreen = () => {
    navigation.navigate('ShoppingCartScreen', { cartItems });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.Text}>Menu</Text>
      <TouchableOpacity onPress={navigateToShoppingCartScreen}>
        <View style={styles.cartButton}>
          <Text style={styles.cartButtonText}>{cartCount}</Text>
          <Text style={styles.cartButtonText}>🛒</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.typeList} horizontal={true} showsHorizontalScrollIndicator={false}>
        {allDrinkTypes.map((drinkType) => (
          <TouchableOpacity key={drinkType} onPress={() => handleTypeClick(drinkType)}>
            <View style={styles.typeItem}>
              <Text style={styles.typeItemText}>{drinkType}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.drinkList} showsVerticalScrollIndicator={false}>
      {drinksByType.map((drink) => (
  <TouchableOpacity key={drink._id}>
    <View style={styles.menuItem}>
      <Image source={drinkImages[drink.name]} style={styles.drinkImage} />
      <View style={styles.menuItemDetails}>
        <Text style={styles.menuItemText}>{drink.name}</Text>
        <Text style={styles.menuItemText}>{drink.price.toFixed(3)}Đ</Text>
      </View>
      <TouchableOpacity onPress={() => addToCart(drink)}>
        <View style={styles.addToCartButton}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </View>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1,
  },
  Text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 18,
    marginBottom: 18,
    marginTop: 90,
    textAlign: 'center',
  },
  typeList: {
    flexDirection: 'row',
  },
  typeItem: {
    alignItems: 'center',
    padding: 20,
    width: 180,
    height: 70,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#B22222',
  },
  typeItemText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    alignItems: 'center',
  },
  menuItemDetails: {
    flexDirection: 'column',
    marginLeft: 16,
    flex: 1,
  },
  menuItemText: {
    fontSize: 14,
    marginRight: 8,
  },
  cartButton: {
    position: "absolute",
    bottom: 45,
    right: 0,
    backgroundColor: "#B22222",
    padding: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  cartButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
  drinkImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  addToCartButton: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MenuScreen;