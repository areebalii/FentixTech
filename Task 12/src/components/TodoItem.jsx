import React, { useState, useRef, useEffect } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      onEdit(todo.id, editText);
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="item-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
          disabled={isEditing}
        />

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="todo-edit-input"
          />
        ) : (
          <span className="todo-text" onDoubleClick={() => !todo.completed && setIsEditing(true)}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="item-actions">
        {!todo.completed && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="action-btn edit-btn" title="Edit Task">
            ✏️
          </button>
        )}
        <button onClick={() => onDelete(todo.id)} className="action-btn delete-btn" title="Delete Task">
          🗑️
        </button>
      </div>
    </li>
  );
}