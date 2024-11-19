import { createSlice } from '@reduxjs/toolkit';
import { CLASS_LIST } from '../constants/classes';
import { ATTRIBUTE_LIST } from '../consts';

const calculateModifier = (attributeValue: number) =>
  Math.floor((attributeValue - 10) / 2);


const initialState = {
  attributes: ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10; // Default value
    return acc;
  }, {} as Record<string, number>),
  modifiers: ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = Math.floor((10 - 10) / 2); // Default modifier for value 10
    return acc;
  }, {} as Record<string, number>),
  totalAttributes: 60,
  classes: Object.keys(CLASS_LIST).reduce((acc, className) => {
    acc[className] = false; // Default to not meeting requirements
    return acc;
  }, {} as Record<string, boolean>)
};


const doesMeetClassRequirements = (
  attributes: Record<string, number>,
  className: string
) => {
  const classRequirements = CLASS_LIST[className];
  return Object.keys(classRequirements).every(
    attribute => attributes[attribute] >= classRequirements[attribute]
  );
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    incrementAttribute: (state, action) => {
      const attribute = action.payload;
      if (state.totalAttributes < 70) {
        state.attributes[attribute] += 1;
        state.modifiers[attribute] = Math.floor(
          (state.attributes[attribute] - 10) / 2
        );
        state.totalAttributes += 1;

        // Update class requirements
        Object.keys(state.classes).forEach(className => {
          state.classes[className] = doesMeetClassRequirements(
            state.attributes,
            className
          );
        });
      } else {
        alert('Total attributes cannot exceed 70.');
      }
    },
    decrementAttribute: (state, action) => {
      const attribute = action.payload;
      if (state.attributes[attribute] > 0) {
        state.attributes[attribute] -= 1;
        state.modifiers[attribute] = Math.floor(
          (state.attributes[attribute] - 10) / 2
        );
        state.totalAttributes -= 1;

        // Update class requirements
        Object.keys(state.classes).forEach(className => {
          state.classes[className] = doesMeetClassRequirements(
            state.attributes,
            className
          );
        });
      }
    }
  }
});

export const { incrementAttribute, decrementAttribute } =
  characterSlice.actions;
export default characterSlice.reducer;
