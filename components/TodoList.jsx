import Animated from "react-native-reanimated";
import TodoItem from "./TodoItem";
import { Text } from "react-native";

export default function TodoList({ data, editTodo, setEditTodo, handleEditSave, handleRemove }) {
  return (
    <Animated.FlatList
      data={data}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TodoItem
          todo={item}
          editTodo={editTodo}
          setEditTodo={setEditTodo}
          handleEditSave={handleEditSave}
          handleRemove={handleRemove}
        />
      )}
      ListEmptyComponent={() => (
        <Text style={{ textAlign: "center" }}>No todos added!</Text>
      )}
    />
  );
}
