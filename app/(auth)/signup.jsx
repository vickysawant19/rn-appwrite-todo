import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useRouter } from 'expo-router';

export default function SignupPage() {
  const router = useRouter();

  const handleSignup = (data) => {
    console.log('Signup Data:', data);
    // Add signup logic here
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
