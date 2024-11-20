import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ATTRIBUTE_LIST } from '../constants/attributes';
import { CLASS_LIST } from '../constants/classes';
import { SKILL_LIST } from '../constants/skills';
import {
  AttributeState,
  CharacterState,
  ClassState,
  SkillState
} from '../types/characterTypes';

// Utility: Initialize attributes
const initializeAttributes = (): AttributeState =>
  ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute.toLowerCase()] = 10;
    return acc;
  }, {} as AttributeState);

// Utility: Initialize skills
const initializeSkills = (): SkillState =>
  SKILL_LIST.reduce((acc, skill) => {
    acc[skill.name.toLowerCase()] = {
      value: 0,
      modifier: 0,
      modifierName: skill.attributeModifier.toLowerCase()
    };
    return acc;
  }, {} as SkillState);

// Utility: Initialize classes
const initializeClasses = (): ClassState =>
  Object.keys(CLASS_LIST).reduce((acc, className) => {
    acc[className] = {
      showDetails: false,
      doesMeetRequirements: false
    };
    return acc;
  }, {} as ClassState);

// Utility: Calculate attribute modifier
const calculateModifier = (attributeValue: number): number =>
  Math.floor((attributeValue - 10) / 2);

// Utility: Calculate total attributes
const calculateTotalAttributes = (attributes: AttributeState): number =>
  Object.values(attributes).reduce((total, value) => total + value, 0);

// Utility: Calculate total spent skill points
const calculateTotalSpentSkills = (skills: SkillState): number =>
  Object.values(skills).reduce((total, skill) => total + skill.value, 0);

const getEligibleClasses = (attributes: AttributeState): string[] =>
  Object.keys(CLASS_LIST).filter(className =>
    Object.entries(CLASS_LIST[className]).every(([attr, req]) => {
      const attributeValue = attributes[attr.toLowerCase()] as number;
      return attributeValue >= (req as number);
    })
  );

// Initial state
const initialState: CharacterState = {
  'character-1': {
    attributes: initializeAttributes(),
    skills: initializeSkills(),
    totalSkillBudget: 10,
    classes: initializeClasses(),
    skillCheck: {
      selectedSkill: '',
      dc: '',
      rollResult: null,
      checkResult: null
    }
  }
};

// Slice
const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    adjustAttribute: (
      state,
      action: PayloadAction<{
        attribute: string;
        change: number;
        characterId: string;
      }>
    ) => {
      const { attribute, change, characterId } = action.payload;
      const character = state[characterId];

      // Prevent exceeding the attribute limit
      const totalAttributes = calculateTotalAttributes(character.attributes);
      if (change === 1 && totalAttributes >= 70) {
        alert('The total sum of all attributes cannot exceed 70.');
        return;
      }

      // Adjust attribute and update modifiers
      character.attributes[attribute] += change;
      const newModifier = calculateModifier(character.attributes[attribute]);
      Object.values(character.skills).forEach(skill => {
        if (skill.modifierName === attribute) {
          skill.modifier = newModifier;
        }
      });

      // Update skill budget if intelligence changes
      if (attribute === 'intelligence') {
        character.totalSkillBudget = Math.max(10 + 4 * newModifier, 0);
      }

      // Update class eligibility
      Object.values(character.classes).forEach(classState => {
        classState.doesMeetRequirements = false;
      });
      getEligibleClasses(character.attributes).forEach(className => {
        character.classes[className].doesMeetRequirements = true;
      });
    },

    incrementSpentSkill: (
      state,
      action: PayloadAction<{ skill: string; characterId: string }>
    ) => {
      const { skill, characterId } = action.payload;
      const character = state[characterId];

      if (
        calculateTotalSpentSkills(character.skills) < character.totalSkillBudget
      ) {
        character.skills[skill].value += 1;
      } else {
        alert('Cannot spend more than the allocated budget.');
      }
    },

    decrementSpentSkill: (
      state,
      action: PayloadAction<{ skill: string; characterId: string }>
    ) => {
      const { skill, characterId } = action.payload;
      const character = state[characterId];

      if (character.skills[skill].value > 0) {
        character.skills[skill].value -= 1;
      }
    },

    resetState: () => initialState,

    addCharacter: state => {
      const newCharacterId = `character-${Object.keys(state).length + 1}`;
      state[newCharacterId] = {
        attributes: initializeAttributes(),
        skills: initializeSkills(),
        totalSkillBudget: 10,
        classes: initializeClasses(),
        skillCheck: {
          selectedSkill: '',
          dc: '',
          rollResult: null,
          checkResult: null
        }
      };
    },

    setInitialState: (state, action: PayloadAction<CharacterState>) => {
      return action.payload;
    }
  }
});

// Export actions and reducer
export const {
  adjustAttribute,
  incrementSpentSkill,
  decrementSpentSkill,
  resetState,
  addCharacter,
  setInitialState
} = characterSlice.actions;

export default characterSlice.reducer;
