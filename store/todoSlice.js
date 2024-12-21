import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState = {
    todoList: [{
        $id: 1,
        body: "hello there"
    }]
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
        },
    },
})

export default todoSlice.reducer
export const {addTodo} = todoSlice.actions

export const getTodos = () => useSelector((state) => state.todo.todoList)