import {
  View,
  Text,
  Alert,
  Pressable,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import appwriteService from "../../appwrite/service";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-web";
import { StatusBar } from "expo-status-bar";
import todoSerives from "../../appwrite/todoService";

export default function Home() {
  const { user, setUser } = useAuth();

  const router = useRouter();
  const [todo, setTodo] = useState({
    body: "",
    userid: user.$id,
    completed: false,
  });
  const [editTodo, setEditTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchTodo = async () => {
    try {
      setIsLoading(true);
      const data = await todoSerives.getUserTodo(user.$id);
      setData(data.documents.reverse());
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, [user]);

  const handleLogout = async () => {
    try {
      await appwriteService.logout();
      setUser(null);
      router.replace("/login");
    } catch (error) {
      Alert.alert("Logout Error", error?.message || "Failed to logout");
    }
  };

  const handleAddTodo = async () => {
    if (todo.body.trim() === "") {
      console.log("Empty todo not allowed");
      return;
    }
    try {
      setIsLoading(true);
      const res = await todoSerives.addTodo(todo);
      if (res) {
        fetchTodo();
      }
    } catch (error) {
      Alert.alert("AddTodo Error", error?.message || "Failed to Add Todo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSave = async (todo) => {
    if(todo.body === editTodo.body) {
      setEditTodo(null)
      return
    }
    try {
      const res = await todoSerives.updateTodo(editTodo)
      fetchTodo()
    } catch (error) {
      console.log(error)
    }finally{
      setEditTodo(null)
    }
  };

  const handleRemove = async (id) => {
    try {
      setIsLoading(true);
      await todoSerives.removeTodo(id);
      fetchTodo();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  const renderTodo = (todo) => {
    const editEnable = editTodo?.$id === todo.$id;
    return (
      <View style={styles.todoContainer}>
     <Pressable onLongPress={() => handleEditSave({...todo, completed: !todo.completed})}>
     <TextInput
          onChangeText={(text) => setEditTodo(prev => ({...prev, body: text}))}
          style={[
            styles.todoInputText,
            todo.completed ? {textDecoration: "line-through"}: {textDecoration: "none"},
            editEnable
              ? { borderWidth: 1, borderColor: "grey", borderRadius: 10 }
              : {borderWidth:1,borderColor: "white"},
          ]}
          value={editEnable ? editTodo.body : todo.body}
          disabled={!editEnable}
        />
     </Pressable>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => (editEnable ? handleEditSave(todo) : setEditTodo(todo))}
            style={styles.editButton}
          >
            <Text style={styles.editText}>{editEnable ? "Save" : "Edit"}</Text>
          </Pressable>
          <Pressable
            onPress={() => handleRemove(todo.$id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeText}>Remove</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome,{user?.name || "Guest"}</Text>
        <Pressable
          style={[styles.button, { backgroundColor: "#FB4141" }]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={todo.body}
          onChangeText={(text) => setTodo((prev) => ({ ...prev, body: text }))}
          style={styles.inputText}
        />
        <Pressable
          onPress={handleAddTodo}
          style={[styles.button, { backgroundColor: "#5CB338" }]}
        >
          <Text style={[styles.buttonText]}>Add Todo</Text>
        </Pressable>
      </View>
      {!isLoading ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderTodo(item)}
        />
      ) : (
        <ActivityIndicator size={"large"} />
      )}
      <StatusBar backgroundColor="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  header: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#074799",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF", 
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 10,
    elevation: 2,
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    color: "#333333", 
    padding: 10,
    backgroundColor: "#FFFFFF", 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB", 
  },
  todoContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF", 
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3, 
  },
  todoInputText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#555555", 
  },
  editButton: {
    backgroundColor: "#36C3C1", 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  editText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  removeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
