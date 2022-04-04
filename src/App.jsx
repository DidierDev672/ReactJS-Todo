import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./Components/TodoList";

const KEY = "todoApp.todos"

export function App() {
  const [todos, setTodo] = useState([
    { id: 1, task: "Tarea 1", completed: false },
  ]);

  const todoTaskRef = useRef();

  useEffect(() => {
      const storedTodos = JSON.parse(localStorage.getItem(KEY))
      if(storedTodos){
        setTodo(storedTodos)
      }
  },[])

  useEffect(() => {
      localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos])

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    const todo = newTodos.find((todo) => todo.id === id)
    todo.completed = !todo.completed
    setTodo(newTodos)
  }

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;
    setTodo((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, completed: false }];
    });

    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
       const newTodos = todos.filter((todo) => !todo.completed)
       setTodo(newTodos)
  }

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button type="button" onClick={handleTodoAdd}>
        🔩
      </button>
      <button type="button" onClick={handleClearAll}>🗑</button>
      <br/>
      <div>Te quedan {todos.filter((todo) => !todo.completed).length}  tareas por terminar</div>
    </Fragment>
  );
}
