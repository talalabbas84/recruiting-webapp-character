import { createSlice } from '@reduxjs/toolkit';
import { ATTRIBUTE_LIST } from '../consts';

const initialState = {
  attributes: ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10;
    return acc;
  }, {} as Record<string, number>),
  totalAttributes: 60
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    incrementAttribute: (state, action) => {
      const attribute = action.payload;
      if (state.totalAttributes < 70) {
        state.attributes[attribute] += 1;
        state.totalAttributes += 1;
      } else {
        alert('Total attributes cannot exceed 70.');
      }
    },
    decrementAttribute: (state, action) => {
      const attribute = action.payload;
      if (state.attributes[attribute] > 0) {
        state.attributes[attribute] -= 1;
        state.totalAttributes -= 1;
      }
    }
  }
});

export const { incrementAttribute, decrementAttribute } =
  characterSlice.actions;
export default characterSlice.reducer;
