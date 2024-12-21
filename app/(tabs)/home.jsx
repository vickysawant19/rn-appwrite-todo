import { ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import todoSerives from "../../appwrite/todoService";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { getTodos } from "@/store/todoSlice";


export default function Home() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [todo, setTodo] = useState({
    body: "",
    userid: user?.$id,
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


  console.log(getTodos())


  const handleAddTodo = async () => {
    if (todo.body.trim() === "") {
      console.log("Empty todo not allowed");
      return;
    }
    try {
      const res = await todoSerives.addTodo(todo);
      setTodo({ ...todo, body: "" });
      if (res) {
        fetchTodo();
      }
    } catch (error) {
      Alert.alert("AddTodo Error", error?.message || "Failed to Add Todo");
    }
  };

  const handleEditSave = async (todo) => {
    if (todo.body === editTodo.body) {
      setEditTodo(null);
      return;
    }
    try {
      const res = await todoSerives.updateTodo(editTodo);
      fetchTodo();
    } catch (error) {
      console.log(error);
    } finally {
      setEditTodo(null);
    }
  };

  const handleRemove = async (id) => {
    try {
      await todoSerives.removeTodo(id);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TodoInput todo={todo} setTodo={setTodo} handleAddTodo={handleAddTodo} />
      {isLoading && <ActivityIndicator size={"large"} />}
      <TodoList
        data={data}
        editTodo={editTodo}
        setEditTodo={setEditTodo}
        handleEditSave={handleEditSave}
        handleRemove={handleRemove}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
});
