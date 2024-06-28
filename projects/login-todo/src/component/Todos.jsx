import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { addTodo, moveTodo, removeTodo, reoderTodos } from '../features/todo/todoSlice'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'




export default function Todos() {
    const columns={
        tasks:'task',
        inProgress:'In-Progress',
        completed:'Completed'
    }
    const [input, setinput] = useState('')
    const todos=useSelector((state)=>{
        // console.log(state.todos)
        return state.todos})
    const dispatch = useDispatch()


    const handleAddtodo =()=>{
        if(input){
            // console.log(Date.now().toString(),input)
            dispatch(addTodo({
                id:Date.now().toString(),
                content:input
            }))
            setinput('')
        }
    }


    const  handleRemoveTodo =(id,column)=>{
        console.log(id,column)
        dispatch(removeTodo({id,column}))
    }


    const handleOnDragEnd =(result)=>{
        if(!result.destination) return
        const {source,destination,draggableId}=result
        if(source.droppableId===destination.droppableId){
            const reorderItems=Array.from(source.droppableId)
            const [movedItem]=reorderItems.splice(source.index,1)
            reorderItems.splice(destination.index,0,movedItem)
            dispatch(reoderTodos({column:source.droppableId,reorderItems}))
        }
        else{
            console.log(source.droppableId,destination.droppableId)
            const movedItem=todos[source.droppableId].find(item=>item.id===draggableId)
            dispatch(moveTodo({
                source:source.droppableId,
                destination:destination.droppableId,
                item:movedItem
            })
        )
        }
    }
  return (
    <div>
    <div>
        <input type="text" value={input}
        onChange={(e)=>setinput(e.target.value)}/>
        <button onClick={handleAddtodo}>ADD TODO</button>
    </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            {Object.entries(columns).map((columnKey,index)=>(<Droppable key={index} droppableId={columnKey[0].toString()}>
                {/* {console.log(columnKey,index)} */}
                {(Provided)=>(
                    <div ref={Provided.innerRef}
                    {...Provided.droppableProps}
                    style={{margin:'0px 10px', width:'25%'}}
                    >
                        <h2>{columnKey[1]}</h2>
                        <ul style={{padding:'0px',listStyle:'none'}}>
                            {
                                todos[columnKey[0]] && todos[columnKey[0]].map((todo,index)=>
                                    (
                                    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                        {(Provided)=>(
                                            <li ref={Provided.innerRef}
                                            {...Provided.draggableProps}
                                            {...Provided.dragHandleProps}
                                            style={{
                                                margin:'0px 0px 8px 0px ',padding:'8px',backgroundColor:'#f0f0f0',borderRadius:'4px',
                                                display:'flex',justifyContent:'space-between',...Provided.dragHandleProps.style
                                            }}>
                                                {todo.content}
                                                <button
                                                onClick={()=>handleRemoveTodo(todo.id,columnKey[0])}
                                                >
                                                    REMOVE
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {Provided.placeholder}
                        </ul>
                    </div>
                )}
            </Droppable>
        ))}
        </div>
      </DragDropContext>
    </div>
  )
}
