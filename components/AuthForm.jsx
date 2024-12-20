import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";

export default function AuthForm({
  onSubmit,
  buttonLabel,
  footerText,
  footerActionLabel,
  onFooterAction,
  isLoading,
}) {
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // Check if all required fields are filled
  const isFormValid =
    form.email.trim() !== "" &&
    form.password.trim() !== "" &&
    (buttonLabel !== "Sign Up" || form.name.trim() !== "");

  return (
    <View style={styles.form}>
      {buttonLabel === "Sign Up" && (
        <TextInput
          placeholderTextColor={"gray"}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          style={styles.input}
        />
      )}
      <TextInput
        placeholder="Email"
        placeholderTextColor={"gray"}
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={"gray"}
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        style={styles.input}
      />
      <Button
        title={!isLoading ? buttonLabel : <ActivityIndicator size={"small"} />}
        onPress={() => onSubmit(form)}
        disabled={!isFormValid || isLoading}
      />
      {footerText && (
        <View style={styles.footer}>
          <Text>{footerText}</Text>
          <Text onPress={onFooterAction} style={styles.footerAction}>
            {footerActionLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: { width: "100%", padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 16 },
  footerAction: { color: "blue", marginLeft: 4 },
});
