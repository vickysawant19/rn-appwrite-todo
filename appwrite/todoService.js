import { Databases, Query } from "react-native-appwrite";
import appwriteService from "./service";

class Todo {
  constructor() {
    this.database = new Databases(appwriteService.client);
  }

  async getAllTodo() {
    try {
      const res = await this.database.listDocuments(
        "6580627524c33be9c494",
        "658062bbd434eec52738"
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async getUserTodo(userid) {
    try {
      const res = await this.database.listDocuments(
        "6580627524c33be9c494",
        "658062bbd434eec52738",[Query.equal("userid", userid)]
      );
      return res;
    } catch (error) {
      return error;
    }
  }
}

const todoSerives = new Todo()

export default todoSerives
