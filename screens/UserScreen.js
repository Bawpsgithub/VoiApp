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
  const [users, setUsers] = useState([]);


  const { user } = useContext(UserContext);
  const token = user.data.token;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [modalData, setModalData] = useState([]);
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://172.16.2.4:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [users]);
  

  const toggleModal = (mode, data) => {
    setModalMode(mode);
    setModalData(data || []);
    setNewUser({
      fullname: "",
      password: "",
      email: "",
    });
    setModalVisible(!modalVisible);
  };

  const handleAddUser = async () => {

    try {
      const response = await axios.post("http://172.16.2.4:8000/api/auth/register", newUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers([...users, response.data.data]);
      Alert.alert("Success", "Add user success");
      toggleModal("add");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add user. Please try again.");
    }
  };


  const handleEditButtonPress = (user) => {
    toggleModal("edit", user);
  };

  const handleDeleteButtonPress = (user) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${user.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => handleDeleteUser(user._id),
        },
      ]
    );
  };

 const handleEditUser = () => {
  if (!modalData || !modalData._id) {
    console.error("Invalid modal data for editing");
    return;
  }

  const updatedUser = users.map((user) =>
    user._id === modalData._id ? modalData : user
  );

  axios
    .put(`http://172.16.2.4:8000/api/user/${modalData._id}`, modalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setUsers(updatedUser);
      toggleModal("edit");
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Error", "Failed to edit user. Please try again.");
    });
};

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://172.16.2.4:8000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUsers(users.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Failed to delete user. Please try again.");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backButtonContainer}>
        <BackButton />
      </View>
      <Text style={styles.Text}>Add User</Text>
      <TouchableOpacity onPress={() => toggleModal("add")}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add</Text>
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.drinkList} showsVerticalScrollIndicator={false}>
        {users?.map((user) => (
          <View key={user?._id} style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text style={styles.menuItemText}>
                {user?.fullname} 
              </Text>
            </View>
            <View style={styles.tableCell}>
              <TouchableOpacity onPress={() => handleEditButtonPress(user)}>
                <View style={styles.editButton}>
                  <Text style={styles.editButtonLabel}>Edit</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.tableCell}>
              <TouchableOpacity onPress={() => handleDeleteButtonPress(user)}>
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
              <Text style={styles.modalTitle}>Add User</Text>
              <TextInput
                style={styles.input}
                placeholder="Fullname"
                value={newUser.fullname}
                onChangeText={(text) =>
                  setNewUser({ ...newUser, fullname: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={newUser.password}
                onChangeText={(text) =>
                  setNewUser({ ...newUser, password: text })
                }
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newUser.email}
                onChangeText={(text) =>
                  setNewUser({ ...newUser, email: text })
                }
              />
              <TouchableOpacity onPress={handleAddUser}>
                <View style={styles.modalButton}>
                  <Text style={styles.modalButtonLabel}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}

          {modalMode === "edit" && (
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit user</Text>
              <TextInput
                style={styles.input}
                placeholder="Fullname"
                value={modalData.fullname || ""}
                onChangeText={(text) => setModalData({ ...modalData, fullname: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={""}
                onChangeText={(text) => setModalData({ ...modalData, password: text })}
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={modalData.email || ""}
                onChangeText={(text) => setModalData({ ...modalData, email: text })}
              />
              <TouchableOpacity onPress={handleEditUser}>
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