import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {availableColors, capitalize} from '../filters/colors';
import {
  StatusFilter,
  StatusFilterArray,
  IFilter,
  IFilterColors,
  ChangeFilterColorAction,
} from '../filters/types';

import {
  colorFilterChange,
  statusChange
} from '../filters/filterSlice';

import {
  completeAllTodos,
  removeCompletedTodos,
} from '../todos/todoSlice';

import {ITodoItem} from '../todos/types';
import {IRootStore} from '../../store';


const RemainingTodos = (props: {count: number}) => (
  <div className="todo-count">
    <h5>Remaining Todos</h5>
    <strong>{props.count}</strong> item{props.count === 1 ? '' : 's'} left
  </div>
);

const StatusFilters = (props: {status: StatusFilter, onChange: Function}) => {
  const renderedFilters = StatusFilterArray.map((statusFilter) => {
    const handleClick = () => props.onChange(statusFilter)
    const className = statusFilter === props.status ? 'selected' : ''

    return (
      <li key={statusFilter}>
        <button className={className} onClick={handleClick}>
          {statusFilter[0].toUpperCase()}{statusFilter.slice(1)}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = (props: {value: IFilterColors, onChange: Function}) : JSX.Element => {
  const renderedColors = availableColors.map((color) => {
    const checked: boolean = props.value.includes(color);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(color, checked ? ChangeFilterColorAction.REMOVE : ChangeFilterColorAction.ADDED);
    };

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        {capitalize(color)}
      </label>
    )
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

export default function Footer () {
  const dispatch = useDispatch();
  const todosRemaining = useSelector((state: IRootStore) : number => {
    const uncompletedTodos = Object.values(state.todos.entities).filter((todo: ITodoItem) => !todo.completed);
    return uncompletedTodos.length;
  });

  const {status, colors} = useSelector((state: IRootStore) : IFilter => state.filter);

  const onColorChange = (color: string, changeType: ChangeFilterColorAction) => dispatch(colorFilterChange({color, changeType}));
  const onStatusChange = (status: StatusFilter) => dispatch(statusChange(status));
  const onMarkAllCompleted = () => dispatch(completeAllTodos());
  const onClearCompleted = () => dispatch(removeCompletedTodos());

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkAllCompleted}>Mark All Completed</button>
        <button className="button" onClick={onClearCompleted}>Clear Completed</button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilters status={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  )
}