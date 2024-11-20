import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CharacterState } from '../types/characterTypes';
import { SKILL_LIST } from '../constants/skills';

interface SkillCheckBoxProps {
  characterId: string;
  isParty?: boolean;
}

const SkillCheckBox: React.FC<SkillCheckBoxProps> = ({
  characterId,
  isParty
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [dc, setDC] = useState<number | ''>('');
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [checkResult, setCheckResult] = useState<string | null>(null);

  const state = useSelector(
    (state: { character: CharacterState }) => state.character
  );

  const handleRoll = () => {
    if (!selectedSkill || !dc) {
      alert('Please select a skill and enter a valid DC.');
      return;
    }

    const roll = Math.floor(Math.random() * 20) + 1; // Random roll between 1 and 20
    const skillObj = state[characterId]?.skills?.[selectedSkill.toLowerCase()];

    if (!skillObj) {
      alert('Invalid skill selection or missing character data.');
      return;
    }

    const total = roll + skillObj.value + skillObj.modifier;

    if (isParty) {
      // Party logic: Find character with the highest skill total for the selected skill
      const highestSkillCharacter = Object.keys(state).reduce(
        (best, id) => {
          const currentSkill = state[id]?.skills?.[
            selectedSkill.toLowerCase()
          ] ?? { value: 0, modifier: 0 };
          const currentTotal = currentSkill.value + currentSkill.modifier;

          return currentTotal > (best.total || 0)
            ? { id, total: currentTotal }
            : best;
        },
        { id: '', total: 0 }
      );

      console.log(
        'Party Skill Check - Highest Skill Character:',
        highestSkillCharacter
      );
    }

    setRollResult(roll);
    setCheckResult(total >= dc ? 'Success' : 'Failure');
  };

  return (
    <div className='skill-check-box'>
      <h3>
        {isParty ? 'Party Skill Check' : `Skill Check for ${characterId}`}
      </h3>
      <div className='form-group'>
        <label htmlFor='skill-select'>Select Skill:</label>
        <select
          id='skill-select'
          value={selectedSkill}
          onChange={e => setSelectedSkill(e.target.value)}
        >
          <option value=''>--Choose a Skill--</option>
          {SKILL_LIST.map(skill => (
            <option key={skill.name} value={skill.name}>
              {skill.name}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor='dc-input'>DC:</label>
        <input
          id='dc-input'
          type='number'
          value={dc}
          onChange={e => setDC(Number(e.target.value))}
        />
      </div>
      <button onClick={handleRoll} className='roll-button'>
        Roll
      </button>
      {rollResult !== null && (
        <div className='result'>
          <p>Roll: {rollResult}</p>
          <p>Result: {checkResult}</p>
        </div>
      )}
    </div>
  );
};

export default SkillCheckBox;
