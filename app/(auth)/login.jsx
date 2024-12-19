import { View, Text, StyleSheet, Alert } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useRouter } from 'expo-router';
import appwriteService from '../../appwrite/service';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const {user , setUser } = useAuth()

  const handleLogin = async (data) => {
   try {
     const res = await appwriteService.createEmailSession(data)
     if(res){
      setUser(res)
      router.replace("/home")
     }
   } catch (error) {
    Alert.alert("Login Error:", error.message)
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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
