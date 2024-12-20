import { View, Text, StyleSheet, Alert } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useRouter } from 'expo-router';
import appwriteService from '../../appwrite/service';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const res = await appwriteService.createEmailSession(data);
      if (res) {
        setUser(res);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });
        router.replace('/home');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message,
      });
      Alert.alert('Login Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <AuthForm
        onSubmit={handleLogin}
        buttonLabel="Login"
        footerText="Don't have an account?"
        footerActionLabel="Sign up"
        onFooterAction={() => router.push('/signup')}
        isLoading={isLoading}
      />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
