import { configureStore } from '@reduxjs/toolkit'
import { ThunkDispatch } from 'redux-thunk'
import {AnyAction} from 'redux';


import todosReducer from './features/todos/todoSlice';
import filterReducer from './features/filters/filterSlice';
import {ITodoState} from './features/todos/types';
import {IFilter} from './features/filters/types';

export interface IRootStore {
  todos: ITodoState,
  filter: IFilter,
}

export type AppThunkDispath = ThunkDispatch<
  IRootStore,
  unknown,
  AnyAction
>;

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
  }
})


export default store;