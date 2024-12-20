import { View, Text, StyleSheet, Alert } from "react-native";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "expo-router";
import appwriteService from "../../appwrite/service";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleSignup = async (data) => {
    try {
      setIsLoading(true);
      const res = await appwriteService.createAccount(data);
      if (res) {
        const userResp = await appwriteService.createEmailSession(data);
        setUser(userResp);
        Toast.show({
          autoHide:true,
          type: "success",
          text1: "Account Created",
          text2: "Your account has been created successfully!",
        });
        router.replace("/home");
      }
    } catch (error) {
      Toast.show({
        autoHide:true,
        type: "error",
        text1: "Signup Failed",
        text2: error.message,
      });
      Alert.alert("Create Account Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <AuthForm
        onSubmit={handleSignup}
        buttonLabel="Sign Up"
        footerText="Already have an account?"
        footerActionLabel="Login"
        onFooterAction={() => router.push("/login")}
        isLoading={isLoading}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
