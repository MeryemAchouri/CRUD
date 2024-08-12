import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import  React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addUser, deleteUser, updateUser } from '../store/crudReducer';
import { User } from '../store/crudReducer';
const FormScreen = () => {
  const users = useSelector((state :RootState ) => state.user.users || []);
  const dispatch = useDispatch();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [pressed, setPressed] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const handleAddUser = () => {
    dispatch(addUser({
      id: (users.length+ 1).toString(),
      name: name,
      email: email
    }))
    setName("");
    setEmail("");
  };

  const handleUpdateUser = () => {
    if (selectedUserId) {
      dispatch(updateUser({
        id: selectedUserId,
        name: newName,
        email: newEmail
      }));
      setNewName("");
      setNewEmail("");
      setPressed(false);
      setSelectedUserId(null);
    }
  };

  const handleDeleteUser = (id : string) => {
   dispatch(deleteUser(id))
  } 

  return (
    <View style={styles.background}>
      {pressed ? (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Name'
            style={styles.input}
            value={newName}
            onChangeText={setNewName}
          />
          <TextInput
            placeholder='Email'
            style={styles.input}
            keyboardType='email-address'
            value={newEmail}
            onChangeText={setNewEmail}
          />
          <View style={styles.button}>
            <TouchableOpacity onPress={handleUpdateUser}>
              <Text style={{ color: "#ffffff" }}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Name'
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder='Email'
            style={styles.input}
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.button}>
            <TouchableOpacity onPress={handleAddUser}>
              <Text style={{ color: "#ffffff" }}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.data}>
        {users.map((user: User , index: number) => (
          <View key={index} style={styles.userRow}>
            <View style={styles.userInfo}>
              <Text style={styles.text}>{user.name}</Text>
              <Text style={styles.text}>{user.email}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.smallButton}
                onPress={() => {
                  setSelectedUserId(user.id);
                  setNewName(user.name);
                  setNewEmail(user.email);
                  setPressed(true);
                }}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} onPress={()=>handleDeleteUser(user.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#ffff",
    justifyContent: "flex-start",
  },
  inputContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#E7E7E7",
    width: "70%",
    borderRadius: 10,
    paddingHorizontal: 7,
    marginBottom: 10,
    color:"black"
  },
  button: {
    alignItems: "center",
    backgroundColor: "tomato",
    width: "20%",
    borderRadius: 10,
    padding: 10,
    marginBottom: 40
  },
  data: {
    marginHorizontal: 20,
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  userInfo: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    marginRight: 20,
    fontSize: 10,
    color: "#000000"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  smallButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginLeft: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 9,
  },
});
