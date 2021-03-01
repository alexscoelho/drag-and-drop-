import React, { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: new Date().valueOf(),
      label: todo,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (position) => {
    const newTodos = todos.filter((todo) => todo.id !== position);
    setTodos(newTodos);
  };

  const modify = (item) => {
    setIsEditing(true);
    setTodo(item.label);
    setId(item.id);
  };

  const modifyTodo = (e) => {
    e.preventDefault();
    const newTodos = todos.map((item) =>
      item.id === id ? { id, label: todo } : item
    );
    setTodos(newTodos);
    setIsEditing(false);
    setTodo("");
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="row">
        <div className="col-auto ">
          <form
            className="d-flex"
            onSubmit={(e) => (isEditing ? modifyTodo(e) : addTodo(e))}
          >
            <input
              className="form-control "
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
            />
            <input
              className={isEditing ? "btn btn-secondary" : "btn btn-primary"}
              type="submit"
              value={isEditing ? "Edit" : "Add todo"}
            ></input>
          </form>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-4">
          <DragDropContext>
            <Droppable droppableId="todos" type="TODOS">
              {(provided) => (
                <ul
                  style={{ listStyleType: "none" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.label}
                      index={index}
                    >
                      {(provided) => (
                        <div style={{ display: "flex" }}>
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {todo.label}
                          </li>
                          <button
                            className="btn btn-light"
                            onClick={() => deleteTodo(todo.id)}
                            style={{ marginLeft: "auto" }}
                            type="button"
                          >
                            &times;
                          </button>
                          <button
                            className="btn btn-light"
                            onClick={() => modify(todo)}
                            type="button"
                          >
                            ✏️
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;
