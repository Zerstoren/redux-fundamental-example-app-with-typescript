import { createSelector } from 'reselect';
import {
  createSlice, 
  PayloadAction,
  createEntityAdapter,
  createAsyncThunk
} from '@reduxjs/toolkit';

import {
  ITodoState,
  ITodosList,
  ITodoItem,
  IPayloadChangeColor
} from './types';

import * as apiClient from '../../api/client';
import { IRootStore } from '../../store';
import {
  StatusFilter, IFilterColors
} from '../filters/types';
import { act } from 'react-dom/test-utils';

const todosAdapter = createEntityAdapter<ITodoItem>();

const initialState: ITodoState = todosAdapter.getInitialState({
  entities: <ITodosList>{},
  isLoading: false,
});

export const fetchTodos = createAsyncThunk('todo/fetch', async () => {
  const response = await apiClient.getTodos();
  return response.todos
});

export const saveNewTodo = createAsyncThunk('todo/add', async (text: string) => {
  return await apiClient.saveTodo({ text: text });
});

const todoSlicer = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    toggled: {
      reducer(state, action: PayloadAction<number>) {
        state.entities[action.payload].completed = !state.entities[action.payload].completed;
      },
      prepare: (todo: ITodoItem) => ({payload: todo.id})
    },

    changeColor: {
      reducer(state, action: PayloadAction<IPayloadChangeColor>) {
        state.entities[action.payload.todoId].color = action.payload.color;
      },
      prepare: (todo: ITodoItem, color: string) => ({payload: {todoId: todo.id, color}})
    },

    remove: {
      reducer: todosAdapter.removeOne,
      prepare: (todo: ITodoItem) => ({payload: todo.id})
    },

    completeAll: (state) => Object.values(state.entities).forEach((todo: ITodoItem) => todo.completed = true),

    removeCompleted: (state) => {
      const ids = Object.values(state.entities)
        .filter((todo: ITodoItem) => (todo.completed))
        .map((todo: ITodoItem) => todo.id);

      todosAdapter.removeMany(state, ids);
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        todosAdapter.setAll(state, Object.values(action.payload));
        state.isLoading = false;
      })

      .addCase(saveNewTodo.pending, (state) => {state.isLoading = true})
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        todosAdapter.addOne(state, action);
      })
  }
});

export const {
  changeColor, 
  completeAll, 
  remove,
  removeCompleted, 
  toggled
} = todoSlicer.actions;
export default todoSlicer.reducer;

export const selectTodoIds = createSelector(
  (state: IRootStore) => state.todos.entities,
  (state: IRootStore) => state.filter.colors,
  (state: IRootStore) => state.filter.status,
  (todos: ITodosList, colors: IFilterColors, status: StatusFilter) : Array<number> => Object.values(todos)
    .filter((todo) => (colors.length ? (colors.includes(todo.color ? todo.color : '')) : true))
    .filter((todo) => (status === StatusFilter.ALL ? true : (todo.completed === (status === StatusFilter.COMPLETED))))
    .map((todo) => todo.id)
);