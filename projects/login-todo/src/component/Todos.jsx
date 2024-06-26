import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { addTodo, removeTodo } from '../features/todo/todoSlice'



const columns={
    tasks:'task',
    inProgress:'In-Progress',
    completed:'Completed'
}

export default function Todos() {
    const dispatch = useDispatch()
    const [input, setinput] = useState('')
    const todos=useSelector((state)=>state.Todos)
    const handleAddtodo =()=>{
        if(input){
            dispatch(addTodo({
                id:Date.now().toString(),
                content:input
            }))
            setinput('')
        }
    }
    const  handleRemoveTodo =(id,column)=>{
        dispatch(removeTodo({id,column}))
    }
    const handleOnDragEnd =(result)=>{
        if(!result.destination) return
        const {souce,destination,dragableId}=result
        if(souce.droppableId===destination.droppableId){
            
        }
    }


  return (
    <div>
    
      
    </div>
  )
}
