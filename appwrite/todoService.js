import { Databases, ID, Query } from "react-native-appwrite";
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
        "658062bbd434eec52738",
        [Query.equal("userid", userid)]
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  async addTodo(todo) {
    try {
      const res = await this.database.createDocument(
        "6580627524c33be9c494",
        "658062bbd434eec52738",
        ID.unique(),
        todo
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  async removeTodo(todoId) {
    try {
      const res = await this.database.deleteDocument(
        "6580627524c33be9c494",
        "658062bbd434eec52738",
        todoId
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  async updateTodo(todo) {
    try {
      const res = await this.database.updateDocument(
        "6580627524c33be9c494",
        "658062bbd434eec52738",
        todo.$id,
        { body: todo.body, completed: todo.completed }
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const todoSerives = new Todo();

export default todoSerives;
