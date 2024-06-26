import { createSlice } from "@reduxjs/toolkit";

const todoSlice=createSlice({
    name:'todos',
    initialState:{
        tasks:[],
        inProgress:[],
        completed:[],
    },
    reducers:{
        addTodo:(state,action)=>{
            state.tasks.push(action.payload)
        },
        removeTodo:(state,action)=>{
            const {id,column}=action.payload
            state[column]= state[column].filter((todo)=>todo.id !== id)
        },
        moveTodo:(state,action)=>{
            const{source,destination,item}=action.payload
            state[source].splice(state[source].indexof(item),1)
            state[destination].push(item)
        },
        reoderTodos:(state,action)=>{
            const { column ,reorderedItems}=action.payload
            state[column]=reorderedItems
        }

    }
})
export const {addTodo,removeTodo,moveTodo,reoderTodos}=todoSlice.actions
export default todoSlice.reducer
