import React, { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="todo-input"
        maxLength={80}
      />
      <button type="submit" className="add-btn" disabled={!inputValue.trim()}>
        Add
      </button>
    </form>
  );
}