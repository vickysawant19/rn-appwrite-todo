import { View, Text, StyleSheet, Alert } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useRouter } from 'expo-router';
import appwriteService from '../../appwrite/service';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const {user , setUser} = useAuth()

  const handleSignup = async (data) => {

   try {
       const res = await appwriteService.createAccount(data)
       if(res){
          const userResp =  await appwriteService.createEmailSession(data)
          setUser(userResp)
          router.replace("/home")
       }
   } catch (error) {
    Alert.alert("Create Account Error:", error.message)
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
        onFooterAction={() => router.push('/login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});
