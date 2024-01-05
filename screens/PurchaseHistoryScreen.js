import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { UserContext } from '../context/UserContext';
import BackButton from '../components/BackButton';

const PurchaseHistoryScreen = () => {
  const { user } = useContext(UserContext);
  const token = user.data.token;

  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    // Fetch purchase history data when the component mounts
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await fetch('http://172.16.2.4:8000/api/order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        // Filter orders based on user ID
        const userPurchaseHistory = data.filter(order => order.user === user.data.id);
  
        // Fetch drink details for each order
        const ordersWithDrinks = await Promise.all(
          userPurchaseHistory.map(async (order) => {
            const drinksWithDetails = await Promise.all(
              order.drinks.map(async (drink) => {
                const drinkDetailsResponse = await fetch(`http://172.16.2.4:8000/api/drink/${drink.drink}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                });
  
                if (drinkDetailsResponse.ok) {
                  const drinkDetails = await drinkDetailsResponse.json();
                  return {
                    name: drinkDetails.name,
                    quantity: drink.quantity,
                  };
                } else {
                  console.error(`Error fetching drink details for order ${order._id}, drink ${drink.drink}`);
                  return null;
                }
              })
            );
            return {
              ...order,
              drinks: drinksWithDetails.filter((drink) => drink !== null),
            };
          })
        );
  
        setPurchaseHistory(ordersWithDrinks);
      } else {
        console.error('Error fetching purchase history');
      }
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    }
  };
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.text}>Purchase History</Text>
      <FlatList
        data={purchaseHistory}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.purchaseItem}>
            <Text style={styles.purchaseItemText}>
              {formatDate(item.createdAt)} - {item.totalPrice.toFixed(3)}Đ
            </Text>
            <Text style={styles.purchaseItemText}>
             Table: {item.table}
            </Text>
            <View style={styles.drinkDetails}>
              {item.drinks.map((drink, index) => (
                <Text key={index}>{drink.name} x {drink.quantity}</Text>
              ))}
            </View>
          </View>
        )}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 10,
    color: '#B22222',
  },
  purchaseItem: {
    flexDirection: 'column',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  purchaseItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  drinkDetails: {
    marginTop: 8,
  },
});

export default PurchaseHistoryScreen;
