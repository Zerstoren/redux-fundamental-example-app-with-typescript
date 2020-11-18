import {ITodosList, ITodoItem} from '../features/todos/types';
import store from '../store';

const todos: ITodosList = {
  1: {
    id: 1,
    text: "Todo 1",
    completed: false,
  }, 
  2: {
    id: 2,
    text: "Todo 2",
    completed: false,
  }, 
  3: {
    id: 3,
    text: "Todo 3",
    completed: true,
  }, 
}

export interface IGetTodosResolve {
  todos: ITodosList
}

export interface ISaveTodoResolve {
  saved: boolean,
  todo: ITodoItem
}

function nextTodoId(todos: ITodosList) {
  const maxId = Object.values(todos).reduce((maxId: number, todo: ITodoItem) : number => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

export function getTodos() : Promise<IGetTodosResolve> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      todos: todos
    }), 1000)
  });
}

export function saveTodo(data: {text: string}) : Promise<ITodoItem> {
  return new Promise((resolve, reject) => {
    const todoItem: ITodoItem = {
      text: data.text,
      id: nextTodoId(store.getState().todos.entities),
      completed: false,
    };
    
    setTimeout(() => resolve(todoItem), 1000);
  })
}

export function changeColor(data: {todoId: number, color: string}) : Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });  
}

export function remove(data: {todoId: number}) : Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });  
}

export function completeTodo(data: {todoId: number}) : Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });
}

export function completeAllTodo() : Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });
}

export function removeCompletedTodo() : Promise<boolean> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });
}