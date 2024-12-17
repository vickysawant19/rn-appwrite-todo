import { Account, Client,ID } from "react-native-appwrite";

class Service {
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("66e943139f030e2feaf8");

    this.account = new Account(this.client);
  }

  // Create a new account
  async createAccount(email, password, name) {
    try {
      const response = await this.account.create(ID.unique(), email, password, name);
      console.log("Account Created:", response);
      return response;
    } catch (error) {
      console.error("Error Creating Account:", error);
      throw error;
    }
  }

  // Create a session with email and password
  async createEmailSession({email, password}) {
    try {
      const response = await this.account.createEmailPasswordSession(email, password);
      console.log("Session Created:", response);
      return response;
    } catch (error) {
      console.error("Error Creating Email Session:", error);
      throw error;
    }
  }

  // Get the currently logged-in account
  async getAccount() {
    try {
      const response = await this.account.get();
      console.log("Account Details:", response);
      return response;
    } catch (error) {
      console.error("Error Getting Account Details:", error);
      throw error;
    }
  }

  // Logout the current session
  async logout() {
    try {
      const response = await this.account.deleteSession("current");
      console.log("Logged Out:", response);
      return response;
    } catch (error) {
      console.error("Error Logging Out:", error);
      throw error;
    }
  }
}

const appwriteService = new Service();

export default appwriteService;

