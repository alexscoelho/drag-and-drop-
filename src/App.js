import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [todos, setTodos] = useState([
    { id: 0, label: "Practice React" },
    { id: 1, label: "Practice Django" },
    { id: 2, label: "Practice SQL" },
  ]);
  const [launch, setLaunch] = useState([
    { id: 3, label: "Publich website" },
    { id: 4, label: "Marketing" },
  ]);
  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");
  const [isTodo, setIsTodo] = useState(null);

  const addTodo = (e) => {
    e.preventDefault();
    if (todo.trim() === "") {
      return;
    }
    const newTodo = {
      id: new Date().valueOf(),
      label: todo,
    };
    setTodos([...todos, newTodo]);
    setTodo("");
  };

  const deleteTodo = (position) => {
    const isTodo = todos.filter((todo) => todo.id === position).length !== 0;

    if (isTodo) {
      const newTodos = todos.filter((todo) => todo.id !== position);
      setTodos(newTodos);
    } else {
      const newLaunch = launch.filter((item) => item.id !== position);
      setLaunch(newLaunch);
    }
  };

  const modify = (item) => {
    setIsEditing(true);
    setIsTodo(todos.filter((todo) => todo.id === item.id).length !== 0);
    if (isTodo) {
      setTodo(item.label);
      setId(item.id);
    } else {
      setTodo(item.label);
      setId(item.id);
    }
  };

  const modifyTodo = (e) => {
    e.preventDefault();
    if (isTodo) {
      const newTodos = todos.map((item) =>
        item.id === id ? { id, label: todo } : item
      );
      setTodos(newTodos);
    } else {
      const newLaunch = launch.map((item) =>
        item.id === id ? { id, label: todo } : item
      );
      setLaunch(newLaunch);
    }
    setIsEditing(false);
    setTodo("");
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (destination === null) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const todoItems = Array.from(todos);
      const launchItems = Array.from(launch);

      if (destination.droppableId === "todos") {
        const [reorderedItem] = todoItems.splice(source.index, 1);
        todoItems.splice(destination.index, 0, reorderedItem);
        setTodos(todoItems);
      }
      if (destination.droppableId === "launch") {
        const [reorderedItem] = launchItems.splice(source.index, 1);
        launchItems.splice(destination.index, 0, reorderedItem);
        setLaunch(launchItems);
      }
    } else if (source.droppableId === "todos") {
      const sourceColumn = Array.from(todos);
      const [reorderedSourceColumn] = sourceColumn.splice(source.index, 1);
      setTodos(sourceColumn);

      const launchColumn = Array.from(launch);
      launchColumn.splice(destination.index, 0, reorderedSourceColumn);
      setLaunch(launchColumn);
    } else if (source.droppableId === "launch") {
      const sourceColumn = Array.from(launch);
      const [reorderedSourceColumn] = sourceColumn.splice(source.index, 1);
      setLaunch(sourceColumn);

      const todosColumn = Array.from(todos);
      todosColumn.splice(destination.index, 0, reorderedSourceColumn);
      setTodos(todosColumn);
    }
  };

  return (
    <div className="container">
      <h2>To-do App</h2>
      <div className="row">
        <div className="col-auto ">
          <form
            className="d-flex"
            onSubmit={(e) => (isEditing ? modifyTodo(e) : addTodo(e))}
          >
            <input
              className="form-control me-2"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              placeholder="Add a new todo"
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="col-5 border">
            <h4 style={{ marginLeft: "2rem" }}>Todo</h4>
            <Droppable droppableId="todos">
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
                            onClick={(e) => {
                              deleteTodo(todo.id);
                            }}
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
          </div>
          <div className="col-2" />
          {/* second column */}
          <div className="col-5 border">
            <h4 style={{ marginLeft: "2rem" }}>In Progress</h4>
            <Droppable droppableId="launch">
              {(provided) => (
                <ul
                  style={{ listStyleType: "none" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {launch.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.label}
                      index={index}
                    >
                      {(provided) => (
                        <div style={{ display: "flex" }}>
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {item.label}
                          </li>
                          <button
                            className="btn btn-light"
                            onClick={(e) => {
                              deleteTodo(item.id);
                            }}
                            style={{ marginLeft: "auto" }}
                            type="button"
                          >
                            &times;
                          </button>
                          <button
                            className="btn btn-light"
                            onClick={() => modify(item)}
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
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
