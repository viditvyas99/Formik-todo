import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, moveTodo, removeTodo, reorderTodos } from '../features/todo/todoSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Logout from './Logout';

export default function Todos() {
  const columns = {
    tasks: 'Tasks',
    inProgress: 'In-Progress',
    completed: 'Completed'
  };

  const [input, setInput] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth)
  console.log(user)

  const handleAddTodo = () => {
    if (input) {
      dispatch(addTodo({
        id: Date.now().toString(),
        content: input
      }));
      setInput('');
    }
  };

  const handleRemoveTodo = (id, column) => {
    dispatch(removeTodo({ id, column }));
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      const columnItems = Array.from(todos[source.droppableId]);
      const [movedItem] = columnItems.splice(source.index, 1);
      columnItems.splice(destination.index, 0, movedItem);

      dispatch(reorderTodos({ column: source.droppableId, items: columnItems }));
    } else {
      const movedItem = todos[source.droppableId].find(item => item.id === draggableId);

      dispatch(moveTodo({
        source: source.droppableId,
        destination: destination.droppableId,
        item: movedItem
      }));
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>ADD TODO</button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {Object.entries(columns).map(([columnKey, columnName]) => (
            <Droppable key={columnKey} droppableId={columnKey}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{ margin: '0px 10px', width: '30%' }}
                >
                  <h2>{columnName}</h2>
                  <ul style={{ padding: '0px', listStyle: 'none' }}>
                    {todos[columnKey] && todos[columnKey].map((todo, index) => (
                      <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              margin: '0px 0px 8px 0px',
                              padding: '8px',
                              backgroundColor: '#f0f0f0',
                              borderRadius: '4px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              ...provided.draggableProps.style
                            }}
                          >
                            {todo.content}
                            <button onClick={() => handleRemoveTodo(todo.id, columnKey)}>REMOVE</button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      <Logout/>
    </div>
  );
}