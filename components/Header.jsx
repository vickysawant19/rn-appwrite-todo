import appwriteService from "@/appwrite/service";
import { useAuth } from "@/context/AuthContext";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Header() {
    const {user} = useAuth()
    const handleLogout = async () => {
        try {
          await appwriteService.logout();
          setUser(null);
          router.replace("/login");
        } catch (error) {
          Alert.alert("Logout Error", error?.message || "Failed to logout");
        }
      };

  return (
    <View style={styles.header}>
      <Text style={styles.welcome}>
        Welcome,{" "}
        {user?.name[0].toUpperCase() + user?.name.slice(1) || "Guest"}
      </Text>
      <Pressable
        style={[styles.button, { backgroundColor: "#FB4141" }]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#074799",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
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
