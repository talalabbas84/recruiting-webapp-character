import { createSlice } from '@reduxjs/toolkit';
import { CLASS_LIST } from '../constants/classes';
import { SKILL_LIST } from '../constants/skills';
import { ATTRIBUTE_LIST } from '../consts';

const calculateModifier = (attributeValue: number) =>
  Math.floor((attributeValue - 10) / 2);


const initialState = {
  attributes: ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10; // Default attribute value
    return acc;
  }, {} as Record<string, number>),
  modifiers: ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = Math.floor((10 - 10) / 2); // Default modifier
    return acc;
  }, {} as Record<string, number>),
  totalAttributes: 60,
  classes: Object.keys(CLASS_LIST).reduce((acc, className) => {
    acc[className] = false; // Default to not meeting requirements
    return acc;
  }, {} as Record<string, boolean>),
  skills: SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name] = {
      value: 0,
      modifier: 0, // To be updated dynamically based on the related attribute
      relatedAttribute: skill.attributeModifier
    };
    return acc;
  }, {} as Record<string, { value: number; modifier: number; relatedAttribute: string }>),
  totalSkillBudget: 10 // Default skill budget
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

        // Update skills affected by this attribute
        Object.keys(state.skills).forEach(skill => {
          if (state.skills[skill].relatedAttribute === attribute) {
            state.skills[skill].modifier = state.modifiers[attribute];
          }
        });

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

        // Update skills affected by this attribute
        Object.keys(state.skills).forEach(skill => {
          if (state.skills[skill].relatedAttribute === attribute) {
            state.skills[skill].modifier = state.modifiers[attribute];
          }
        });

        // Update class requirements
        Object.keys(state.classes).forEach(className => {
          state.classes[className] = doesMeetClassRequirements(
            state.attributes,
            className
          );
        });
      }
    },
    incrementSkill: (state, action) => {
      const { skill } = action.payload;
      const spentSkills = Object.values(state.skills).reduce(
        (total, skill) => total + skill.value,
        0
      );
      if (spentSkills < state.totalSkillBudget) {
        state.skills[skill].value += 1;
      } else {
        alert('Cannot spend more than the total skill budget.');
      }
    },
    decrementSkill: (state, action) => {
      const { skill } = action.payload;
      if (state.skills[skill].value > 0) {
        state.skills[skill].value -= 1;
      }
    }
  }
});

export const {
  incrementAttribute,
  decrementAttribute,
  incrementSkill,
  decrementSkill
} = characterSlice.actions;
export default characterSlice.reducer;
