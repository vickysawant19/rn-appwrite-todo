import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function TodoItem({ todo, editTodo, setEditTodo, handleEditSave, handleRemove }) {
  const editEnable = editTodo?.$id === todo.$id;

  return (
    <View style={styles.todoContainer}>
      <Pressable
        onLongPress={() =>
          handleEditSave({ ...todo, completed: !todo.completed })
        }
      >
        <TextInput
          onChangeText={(text) =>
            setEditTodo((prev) => ({ ...prev, body: text }))
          }
          style={[
            styles.todoInputText,
            todo.completed
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" },
            editEnable
              ? { borderWidth: 1, borderColor: "grey", borderRadius: 10 }
              : { borderWidth: 1, borderColor: "white" },
          ]}
          value={editEnable ? editTodo?.body : todo.body}
          disabled={!editEnable}
        />
      </Pressable>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() =>
            editEnable ? handleEditSave(todo) : setEditTodo(todo)
          }
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
}

const styles = StyleSheet.create({
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
