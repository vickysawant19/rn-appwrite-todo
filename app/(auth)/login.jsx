import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useRouter } from 'expo-router';
import appwriteService from '../../appwrite/service';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data) => {
    console.log('Login Data:', data);
   try {
     const res = await appwriteService.createEmailSession(data)
     console.log("res",res)
   } catch (error) {
    console.log(error)
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
