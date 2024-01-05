import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import BackButton from '../components/BackButton';
import { UserContext } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const ShoppingCartScreen = ({ route }) => {
  const navigation = useNavigation();
  const navigateToPurchaseHistoryScreen = () => {
    navigation.navigate('PurchaseHistoryScreen');
  };
  const { cartItems: initialCartItems } = route.params;
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [groupedCartItems, setGroupedCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [updatedGroupedCartItems, setUpdatedGroupedCartItems] = useState([]);
  const [table, setTable] = useState('');
  const { user } = useContext(UserContext);
  const userId = user.data.id;
  const token = user.data.token;

  useEffect(() => {
    calculateGroupedCartItems();
  }, [cartItems]);

  const calculateGroupedCartItems = () => {
    const groupedItems = {};

    cartItems.forEach((item) => {
      if (groupedItems[item.id]) {
        groupedItems[item.id].quantity += 1;
        groupedItems[item.id].totalPrice += item.price;
      } else {
        groupedItems[item.id] = {
          name: item.name,
          quantity: 1,
          totalPrice: item.price,
        };
      }
    });

    const groupedCartArray = Object.keys(groupedItems).map((id) => ({
      id,
      ...groupedItems[id],
    }));

    setGroupedCartItems(groupedCartArray);

    let total = 0;
    groupedCartArray.forEach((item) => {
      total += item.totalPrice;
    });
    setTotalPrice(total);
  };

  const handleQuantityChange = (item, action) => {
    const updatedGroupedCartItems = groupedCartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        const updatedCartItem = { ...cartItem };

        if (action === 'increase') {
          updatedCartItem.quantity += 1;
          updatedCartItem.totalPrice = updatedCartItem.totalPrice + (item.totalPrice / item.quantity);
        } else if (action === 'decrease' && updatedCartItem.quantity > 1) {
          updatedCartItem.quantity -= 1;
          updatedCartItem.totalPrice = updatedCartItem.totalPrice - (item.totalPrice / item.quantity);
        }

        return updatedCartItem;
      } else {
        return cartItem;
      }
    });

    console.log('Updated Cart Items:', updatedGroupedCartItems);
    calculateTotalPrice(updatedGroupedCartItems);
    setGroupedCartItems(updatedGroupedCartItems);
    setUpdatedGroupedCartItems(updatedGroupedCartItems);
  };

  const calculateTotalPrice = (updatedGroupedCartItems) => {
    let total = 0;
    updatedGroupedCartItems.forEach((item) => {
      total += item.totalPrice;
    });
    setTotalPrice(total);
  };

  const handlePaymentClick = async () => {
    const orderData = {
      user: userId,
      drinks: updatedGroupedCartItems.map(item => ({ drink: item.id, quantity: item.quantity })),
      totalPrice: totalPrice,
      table: table,
    };

    try {
      const response = await fetch('http://172.16.2.4:8000/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        Alert.alert('Order Success', 'Your order has been placed successfully.', [
          { text: 'OK', onPress: () => navigation.navigate('PurchaseHistoryScreen') },
        ]);
      } else {
        Alert.alert('Order Error', 'There was an error while placing your order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      Alert.alert('Order Error', 'There was an error while placing your order. Please try again.');
    }
    console.log(orderData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.text}>Cart</Text>
      <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
        {groupedCartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.name} - {item.totalPrice.toFixed(3)}Đ</Text>

            <View style={styles.quantityButtons}>
              <TouchableOpacity onPress={() => handleQuantityChange(item, 'decrease')}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(item, 'increase')}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <TextInput
        style={styles.tableInput}
        placeholder="Table Number"
        value={table}
        onChangeText={(text) => setTable(text)}
      />
      <Text style={styles.totalText}>Total: {totalPrice.toFixed(3)}Đ</Text>
      <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentClick}>
        <Text style={styles.paymentButtonText}>Order</Text>
      </TouchableOpacity>
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
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
  cartList: {
    marginTop: 16,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    alignItems: 'center',
  },
  cartItemText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    color: 'red',
    marginRight: 16,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 16,
  },
  paymentButton: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B22222',
    marginHorizontal: 8,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
});

export default ShoppingCartScreen;
