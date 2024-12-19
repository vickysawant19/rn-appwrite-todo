import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useState } from 'react';

export default function AuthForm({ onSubmit, buttonLabel, footerText, footerActionLabel, onFooterAction }) {
  const [form, setForm] = useState({ email: '', password: '',name: "" });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <View style={styles.form}>
     {buttonLabel === "Sign Up" && <TextInput
        placeholder="Name"
        value={form.email}
        onChangeText={(text) => handleChange('name', text)}
        style={styles.input}
      />}
      <TextInput
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title={buttonLabel} onPress={() => onSubmit(form)} />
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
  form: { width: '100%', padding: 16 },
  input: { borderBottomWidth: 1, marginBottom: 16, padding: 8 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  footerAction: { color: 'blue', marginLeft: 4 },
});
