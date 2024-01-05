import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";

const ControlDrinkScreen = () => {
  const navigation = useNavigation();
  const [uniqueDrinkTypes, setUniqueDrinkTypes] = useState([]);
  const [drinksByType, setDrinksByType] = useState([]);
  const [drinksForAll, setDrinksForAll] = useState([]);

  console.log(drinksForAll)

  const { user } = useContext(UserContext);
  const token = user.data.token;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalData, setModalData] = useState([]);
  const [newDrinkData, setNewDrinkData] = useState({
    name: "",
    price: "",
    type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.16.2.4:8000/api/drink/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDrinksForAll(response.data.data);
        setDrinksByType(response.data.data);

        const allDrinkTypes = response?.data.data.map((drink) => drink.type);
        const uniqueTypes = [...new Set(allDrinkTypes)];
        setUniqueDrinkTypes(uniqueTypes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const   toggleModal = (mode, data) => {
    setModalMode(mode);
    setModalData(data || []);
    setNewDrinkData({
      name: "",
      price: "",
      type: "",
    });
    setModalVisible(!modalVisible);
  };

  const handleAddDrink = async () => {

    try {
      const response = await axios.post("http://172.16.2.4:8000/api/drink/", newDrinkData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDrinksForAll([...drinksForAll, response.data.data]);
      Alert.alert("Success", "Add drink success");
      toggleModal("add");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add drink. Please try again.");
    }
  };


  const handleEditButtonPress = (drink) => {
    toggleModal("edit", drink);
  };

  const handleDeleteButtonPress = (drink) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${drink.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteDrink(drink._id),
        },
      ]
    );
  };

 const handleEditDrink = () => {
  if (!modalData || !modalData._id) {
    console.error("Invalid modal data for editing");
    return;
  }

  const updatedDrinks = drinksForAll.map((drink) =>
    drink._id === modalData._id ? modalData : drink
  );

  axios
    .put(`http://172.16.2.4:8000/api/drink/${modalData._id}`, modalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setDrinksForAll(updatedDrinks);
      toggleModal("edit");
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Error", "Failed to edit drink. Please try again.");
    });
};

  const handleDeleteDrink = (drinkId) => {
    axios
      .delete(`http://172.16.2.4:8000/api/drink/${drinkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDrinksForAll(drinksForAll.filter((drink) => drink._id !== drinkId));
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Failed to delete drink. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.Text}>Menu</Text>
      <TouchableOpacity onPress={() => toggleModal("add")}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.drinkList} showsVerticalScrollIndicator={false}>
        {drinksForAll?.map((drink) => (
          <View key={drink?._id} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.menuItemText}>
                {drink?.name} - {drink?.type} - {drink?.price}
              </Text>
            </View>
            <View style={styles.tableCell}>
              <TouchableOpacity onPress={() => handleEditButtonPress(drink)}>
                <View style={styles.editButton}>
                  <Text style={styles.editButtonLabel}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.tableCell}>
              <TouchableOpacity onPress={() => handleDeleteButtonPress(drink)}>
                <View style={styles.deleteButton}>
                  <Text style={styles.deleteButtonLabel}>Delete</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal()}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => toggleModal()}>
            <View style={styles.backButtonInModal}>
              <Text style={styles.backButtonLabel}>Back</Text>
            </View>
          </TouchableOpacity>

          {modalMode === "add" && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add Drink</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={newDrinkData?.name}
                onChangeText={(text) =>
                  setNewDrinkData({ ...newDrinkData, name: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={newDrinkData.price}
                onChangeText={(text) =>
                  setNewDrinkData({ ...newDrinkData, price: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Type"
                value={newDrinkData.type}
                onChangeText={(text) =>
                  setNewDrinkData({ ...newDrinkData, type: text })
                }
              />
              <TouchableOpacity onPress={handleAddDrink}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonLabel}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {modalMode === "edit" && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Drink</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={modalData.name || ""}
                onChangeText={(text) => setModalData({ ...modalData, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={modalData?.price || ""}
                onChangeText={(text) => setModalData({ ...modalData, price: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Type"
                value={modalData?.type || ""}
                onChangeText={(text) => setModalData({ ...modalData, type: text })}
              />
              <TouchableOpacity onPress={handleEditDrink}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonLabel}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  backButtonContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 18,
    marginBottom: 18,
    marginTop: 90,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#B22222",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  drinkList: {
    marginTop: 16,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableCell: {
    flex: 1,
  },
  editButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginRight: 10,
  },
  editButtonLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    marginRight: 10,
  },
  deleteButtonLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonInModal: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonLabel: {
    color: "#B22222",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: "#B22222",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonLabel: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ControlDrinkScreen;