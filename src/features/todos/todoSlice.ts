import { createSelector } from 'reselect';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
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
  TodoDispatch,
  TodosReducerAction,
  TodosLoadingStatus
} from './types';

import * as apiClient from '../../api/client';
import { IRootStore } from '../../store';
import {
  StatusFilter, IFilterColors
} from '../filters/types';
import { act } from 'react-dom/test-utils';

const initialState: ITodoState = {
  status: TodosLoadingStatus.IDLE,
  entities: [],
  isLoading: false,
}

const setTodos = (todos: ITodosList): IActionTodoSetReducer => ({
  type: TodosReducerAction.TODO_LOADED,
  payload: todos
});

const todoAdd = (todo: ITodoItem): IActionTodoAddedReducer => ({
  type: TodosReducerAction.TODO_ADDED,
  payload: todo
});

const toggleTodo = (todoId: number): IActionTodoToggleReducer => ({
  type: TodosReducerAction.TODO_TOGGLED,
  payload: todoId
})

const completeAll = (): IActionTodoCompleteAllReducer => ({
  type: TodosReducerAction.TODO_COMPLETE_ALL
});

const removeCompleted = (): IActionTodoRemoveCompletedReducer => ({
  type: TodosReducerAction.TODO_REMOVE_COMPLETED
});

const changeColor = (todo: ITodoItem, color: string): IActionTodoChangeColorReducer => ({
  type: TodosReducerAction.TODO_CHANGE_COLOR,
  payload: {
    todoId: todo.id,
    color: color
  }
});

const remove = (todo: ITodoItem): IActionTodoRemoveReducer => ({
  type: TodosReducerAction.TODO_REMOVE,
  payload: todo.id
});

const loading = () : IActionTodoLoadingReducer => ({
  type: TodosReducerAction.TODO_LOADING
});

export const fetchTodos = () => async (dispatch: TodoDispatch) => {
  dispatch<IActionTodoLoadingReducer>(loading());
  const response: apiClient.IGetTodosResolve = await apiClient.getTodos();
  dispatch<IActionTodosReducer>(setTodos(response.todos));
};

export const saveNewTodo = (text: string) => async (dispatch: TodoDispatch) : Promise<void> => {
  return new Promise(async (resolve, reject) => {
    dispatch<IActionTodoLoadingReducer>(loading());
    const response = await apiClient.saveTodo({ text: text });
    resolve();
    dispatch<IActionTodosReducer>(todoAdd(response));
  })
};

export const editColor = (todo: ITodoItem, color: string) => async (dispatch: TodoDispatch) => {
  dispatch<IActionTodoChangeColorReducer>(changeColor(todo, color));
  const response = await apiClient.changeColor({ todoId: todo.id, color: color });
}

export const completeTodo = (todo: ITodoItem) => async (dispatch: TodoDispatch) => {
  dispatch<IActionTodoToggleReducer>(toggleTodo(todo.id));
  const response = await apiClient.completeTodo({ todoId: todo.id });
}

export const removeTodo = (todo: ITodoItem) => async (dispatch: TodoDispatch) => {
  dispatch<IActionTodoLoadingReducer>(loading());
  const response = await apiClient.remove({ todoId: todo.id });
  dispatch<IActionTodoRemoveReducer>(remove(todo));
}

export const completeAllTodos = () => async (dispatch: TodoDispatch) => {
  dispatch<IActionTodoLoadingReducer>(loading());
  const response = await apiClient.completeAllTodo();
  dispatch<IActionTodoCompleteAllReducer>(completeAll());
};

export const removeCompletedTodos = () => async (dispatch: TodoDispatch) => {
  dispatch<IActionTodoLoadingReducer>(loading());
  const response = await apiClient.removeCompletedTodo();
  dispatch<IActionTodoRemoveCompletedReducer>(removeCompleted());
};

const todoSlicer = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    added: (state, action: PayloadAction<ITodoItem>) => {
      state.isLoading = true;
      state.entities[action.payload.id] = action.payload;
    },

    toggled: (state, action: PayloadAction<number>) => {
      state.entities[action.payload].completed = !state.entities[action.payload].completed;
    }
  }
})

export default function todosReducer(
  state: ITodoState = initialState,
  action: IActionTodosReducer
): ITodoState {
  let entities: ITodosList;
  let todo: ITodoItem;

  switch (action.type) {

    case TodosReducerAction.TODO_TOGGLED:
      const actionToggled: IActionTodoToggleReducer = action as IActionTodoToggleReducer;
      todo = state.entities[actionToggled.payload];

      return {
        ...state, 
        entities: {
          ...state.entities,
          [todo.id]: {
            ...todo,
            completed: !todo.completed
          }
        }
      };

    case TodosReducerAction.TODO_CHANGE_COLOR:
      const actionColor: IActionTodoChangeColorReducer = action as IActionTodoChangeColorReducer;
      todo = state.entities[actionColor.payload.todoId];

      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: {
            ...todo,
            color: actionColor.payload.color
          }
        }
      };

    case TodosReducerAction.TODO_REMOVE:
      const actionRemove: IActionTodoRemoveReducer = action as IActionTodoRemoveReducer;
      entities = {...state.entities};
      delete entities[actionRemove.payload];
      return {
        ...state,
        isLoading: false,
        entities: entities
      };

    case TodosReducerAction.TODO_LOADED:
      const actionLoaded: IActionTodoSetReducer = action as IActionTodoSetReducer;

      return {
        ...state,
        isLoading: false,
        entities: {
          ...actionLoaded.payload
        }
      };

    case TodosReducerAction.TODO_COMPLETE_ALL:
      const actionCompleteAll: IActionTodoCompleteAllReducer = action as IActionTodoCompleteAllReducer;
      entities = {...state.entities};
      Object.values(state.entities).map((value: ITodoItem) => {
        entities[value.id] = {
          ...entities[value.id],
          completed: true
        }
      });


      return {
        ...state, 
        isLoading: false,
        entities: entities
      };

    case TodosReducerAction.TODO_REMOVE_COMPLETED:
      const actionRemoveCompleted: IActionTodoRemoveCompletedReducer = action as IActionTodoRemoveCompletedReducer;
      entities = {...state.entities};
      Object.values(state.entities).map((todo: ITodoItem) => {
        if (todo.completed) {
          delete entities[todo.id];
        }
      });

      return {
        ...state, 
        isLoading: false,
        entities: entities
      };

    case TodosReducerAction.TODO_LOADING:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state
  }
}

export const selectTodoIds = createSelector(
  (state: IRootStore) => state.todos.entities,
  (state: IRootStore) => state.filter.colors,
  (state: IRootStore) => state.filter.status,
  (todos: ITodosList, colors: IFilterColors, status: StatusFilter) : Array<number> => Object.values(todos)
    .filter((todo) => (colors.length ? (colors.includes(todo.color ? todo.color : '')) : true))
    .filter((todo) => (status === StatusFilter.ALL ? true : (todo.completed === (status === StatusFilter.COMPLETED))))
    .map((todo) => todo.id)
);