import React from 'react';
import {useSelector, shallowEqual} from 'react-redux';
import TodoListItem from './TodoListItem';

import {ITodoItem} from './types';
import {IRootStore} from '../../store';
import {selectTodoIds} from './todoSlice';

// const selectTodosIds = (state: IRootStore) : Array<number> => state.todos.map((todo: ITodoItem) => todo.id);

const TodoList = () => {
  const isLoading = useSelector((state: IRootStore) => state.todos.isLoading)
  const todosIds = useSelector(selectTodoIds);

  let isLoadingTemplate = null;
  if (isLoading) {
    isLoadingTemplate = (
      <div className="todo-list load">
        <div className="mask" />
        <div className="loader" />
      </div>
    )
  }

  const renderTodoItems = todosIds.map((todoId: number) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return (
    <React.Fragment>
      {isLoadingTemplate}
      <ul className="todo-list">{renderTodoItems}</ul>
    </React.Fragment>
  );
}

export default TodoList;