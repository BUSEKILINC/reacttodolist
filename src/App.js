import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (title.trim() !== '' && inputValue.trim() !== '') {
      setTodos([...todos, { title: title, text: inputValue }]);
      setTitle('');
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleEditTodo = (index) => {
    setIsEditing(true);
    setCurrentTodo({
      index: index,
      title: todos[index].title,
      text: todos[index].text,
    });
    setTitle(todos[index].title);
    setInputValue(todos[index].text);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === currentTodo.index ? { ...todo, title: title, text: inputValue } : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setTitle('');
    setInputValue('');
  };

  return (
    <div className="App">
      <div className="header">
        <h1>My Todo List</h1>
      </div>
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add a new todo"
        />
      </div>
      <div className="button-group">
        <button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <strong>{todo.title}</strong>: {todo.text}
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
