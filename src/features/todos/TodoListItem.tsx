import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {capitalize, availableColors} from '../filters/colors';

import {
  ITodoItem, 
  IActionTodosReducer, 
  TodosReducerAction
} from '../todos/types';

import {
  completeTodo,
  removeTodo,
  editColor,
} from '../todos/todoSlice';

import {IRootStore} from '../../store';


function selectTodoById(state: IRootStore, id: number) : ITodoItem | undefined {
  return state.todos.entities[id];
}

const colorOptions = availableColors.map((c) => (
  <option key={c} value={c}>
    {capitalize(c)}
  </option>
));

export default function TodoListItem(props: {id: number}) {
  const dispatch = useDispatch();
  const todoBase = useSelector((state: IRootStore) => selectTodoById(state, props.id));
  
  if (todoBase === undefined) {
    return (<React.Fragment></React.Fragment>);
  }

  const todo: ITodoItem = todoBase as ITodoItem;

  const {text, completed, color} = todo;
  
  const handleCompleteChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(completeTodo(todo));
  const handleColorChanged = (e: React.ChangeEvent<HTMLSelectElement> & { target: HTMLSelectElement }) => dispatch(editColor(todo, e.target.value));
  const handleDelete = () => dispatch(removeTodo(todo));
  
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompleteChange}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color ? color : ''}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </li>
  );
}