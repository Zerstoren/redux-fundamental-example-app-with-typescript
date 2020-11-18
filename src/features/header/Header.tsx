import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {TodosReducerAction, IActionTodosReducer} from '../todos/types';
import {saveNewTodo} from '../todos/todoSlice';

export default function Header() {
  const [text, setText] = useState('');
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => {
    const trimmedText = e.target.value.trim();

    if (e.which === 13 && trimmedText) {
      setLoading(true);
      await dispatch(saveNewTodo(trimmedText));
      setText('');
      setLoading(false);
    } 
  }
  let placeholder = isLoading ? '' : 'What needs to be done?'
  let loader = isLoading ? <div className="loader" /> : null
  
  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      {loader}
    </header>
  )
}