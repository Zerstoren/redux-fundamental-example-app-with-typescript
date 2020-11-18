import {ThunkDispatch} from 'redux-thunk';
import {EntityId} from '@reduxjs/toolkit';

interface ITodoState {
  ids: Array<EntityId>,
  entities: ITodosList,
  // status: TodosLoadingStatus,
  isLoading: boolean
}

interface ITodosList  {
  [key: number]: ITodoItem
}

interface ITodoItem {
  id: number,
  text: string,
  completed: boolean,
  color?: string
}

interface IPayloadChangeColor {
  todoId: number,
  color: string,
}

interface IActionTodosReducer {
  type: TodosReducerAction,
  payload?: any,
}

interface IActionTodoAddedReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_ADDED,
  payload: ITodoItem
}

interface IActionTodoSetReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_LOADED,
  payload: ITodosList
}

interface IActionTodoToggleReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_TOGGLED,
  payload: number
}

interface IActionTodoChangeColorReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_CHANGE_COLOR,
  payload: {
    todoId: number,
    color: string,
  }
}

interface IActionTodoRemoveReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_REMOVE,
  payload: number
}

interface IActionTodoCompleteAllReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_COMPLETE_ALL,
}

interface IActionTodoRemoveCompletedReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_REMOVE_COMPLETED,
}

interface IActionTodoLoadingReducer extends IActionTodosReducer {
  type: TodosReducerAction.TODO_LOADING
}

enum TodosReducerAction {
  TODO_ADDED = 'todo/added',
  TODO_TOGGLED = 'todo/toggled',
  TODO_LOADED = 'todo/loaded',
  TODO_REMOVE = 'todo/remove',
  TODO_CHANGE_COLOR = 'todo/change_color',
  TODO_COMPLETE_ALL = 'todo/check_all',
  TODO_REMOVE_COMPLETED = 'todo/remove_complited',
  TODO_LOADING = 'todo/loading',
}

enum TodosLoadingStatus {
  IDLE,
  LOADING,
  FAILED,
}

export type TodoDispatch = ThunkDispatch<void, void, IActionTodosReducer>;

export type {
  ITodoState,
  ITodosList,
  ITodoItem,
  IActionTodosReducer,
  IActionTodoAddedReducer,
  IActionTodoSetReducer,
  IActionTodoToggleReducer,
  IActionTodoCompleteAllReducer,
  IActionTodoRemoveCompletedReducer,
  IActionTodoChangeColorReducer,
  IActionTodoRemoveReducer,
  IActionTodoLoadingReducer,


  IPayloadChangeColor
}

export {
  TodosReducerAction,
  TodosLoadingStatus
}