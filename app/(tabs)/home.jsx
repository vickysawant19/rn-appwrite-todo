import {
  View,
  Text,
  Alert,
  Pressable,
  StyleSheet,
  FlatList,
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
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true);
        const data = await todoSerives.getUserTodo(user.$id);
        setData(data);
        console.log(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
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

  const renderTodo = (todo) => {
    console.log(todo)
    return (
      <View style={styles.todoContainer}>
        <TextInput style={styles.todoInputText} value={todo.body} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
          <Pressable style={styles.removeButton}>
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
        <TextInput style={styles.inputText} />
        <Pressable style={[styles.button, { backgroundColor: "#5CB338" }]}>
          <Text style={[styles.buttonText]}>Add Todo</Text>
        </Pressable>
      </View>
      <FlatList
        data={data.documents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderTodo(item)}
      />
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
    color: "#FFFFFF", // White text for contrast
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
    // margin: 10,
    elevation: 2,
  },
  inputText: {
    flex: 1,
    fontSize: 18,
    color: "#333333", // Dark gray for better readability
    padding: 10,
    backgroundColor: "#FFFFFF", // White for clear input focus
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB", // Light gray border
  },
  todoContainer: {
    flexDirection: "row",
    gap: 10,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White for card-like design
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3, // Shadow for card appearance
  },
  todoInputText: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#555555", // Medium gray for contrast
  },
  editButton: {
    backgroundColor: "#36C3C1", // Fresh teal for edit action
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  editText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  removeButton: {
    backgroundColor: "#EF4444", // Vibrant red for delete action
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  removeText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
