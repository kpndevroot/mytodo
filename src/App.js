import React, { useState, useEffect } from 'react';
import './App.css';
// importing Components
import Form from './Components/Form';
import TodoList from './Components/TodoList';



function App() {
  // declare states
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Run once

  useEffect(() => {
    getLocalTodos();
  }, []);

  //Use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;

    }
  };

  //save local
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    }
    else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };



  return (
    <div className="App">
      <h1>Todo App</h1>
      <Form
        setStatus={setStatus} status={status}
        inputText={inputText} todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos} />
    </div>
  );
};

export default App;
