import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";

export default function TodoInput({ todo, setTodo, handleAddTodo }) {
  return (
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
        <Text style={styles.buttonText}>Add Todo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
