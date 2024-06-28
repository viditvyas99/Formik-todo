import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    tasks: [],
    inProgress: [],
    completed: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeTodo: (state, action) => {
      const { id, column } = action.payload;
      state[column] = state[column].filter((todo) => todo.id !== id);
    },
    moveTodo: (state, action) => {
      const { source, destination, item } = action.payload;
      state[source] = state[source].filter((todo) => todo.id !== item.id);
      state[destination].push(item);
    },
    reorderTodos: (state, action) => {
      const { column, items } = action.payload;
      state[column] = items;
    }
  }
});

export const { addTodo, removeTodo, moveTodo, reorderTodos } = todoSlice.actions;
export default todoSlice.reducer;