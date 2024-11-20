import React from 'react';
import { CharacterState } from '../types/characterTypes';
import AttributesBox from './AttributesBox';
import ClassesBox from './ClassesBox';
import SkillCheckBox from './SkillCheckBox';
import SkillsBox from './SkillsBox';

interface CharacterProps {
  characterId: string;
  characterData: CharacterState[string];
}

const Character: React.FC<CharacterProps> = ({
  characterId,
  characterData
}) => {
  return (
    <div className='character-container'>
      <h2>Edit Panel for: {characterId}</h2>
      <SkillCheckBox characterId={characterId}  />
      <div className='grid'>
        <AttributesBox
          characterId={characterId}
          attributes={characterData.attributes}
        />
        <ClassesBox characterId={characterId} classes={characterData.classes} />
        <SkillsBox
          characterId={characterId}
          skills={characterData.skills}
          totalBudget={characterData.totalSkillBudget}
        />
      </div>
    </div>
  );
};

export default Character;
