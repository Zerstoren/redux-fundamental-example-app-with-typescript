import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IFilter, 
  ChangeFilterColorAction,
  StatusFilter,

  IPayloadChangeColor,
  IPayloadChangeStatus
} from './types';

const initialState: IFilter = {
  status: StatusFilter.ALL,
  colors: []
}

const filtersSlicer = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    statusChange: (state, action: PayloadAction<IPayloadChangeStatus>) => {
      state.status = action.payload;
    },
    
    colorFilterChange: (state, action: PayloadAction<IPayloadChangeColor>) => {
      const {color, changeType} = action.payload;

      if (changeType === ChangeFilterColorAction.ADDED) {
        state.colors.push(color);
      } else if (changeType === ChangeFilterColorAction.REMOVE) {
        state.colors.splice(state.colors.indexOf(color), 1);
      }
    }
  }
});

export const {statusChange, colorFilterChange} = filtersSlicer.actions;
export default filtersSlicer.reducer;