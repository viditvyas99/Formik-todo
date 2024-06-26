import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { addTodo, moveTodo, removeTodo, reoderTodos } from '../features/todo/todoSlice'



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
        const {source,destination,dragableId}=result
        if(source.droppableId===destination.droppableId){
            const reorderItems=Array.from(todos[source.droppableId])
            const [movedItem]=reorderItems.splice(source.index,1)
            reorderItems.splice(destination.index,0,movedItem)
            dispatch(reoderTodos({column:source.droppableId,reorderItems}))
        }
        else{
            const movedItem=todos[source.droppableId].find(item=>item.id===dragableId)
            dispatch(moveTodo({
                source:source.droppableId,
                item:movedItem
            }))
        }
    }
  return (
    <div>
    
      
    </div>
  )
}
