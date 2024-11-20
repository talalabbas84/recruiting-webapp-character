import React from 'react';
import { useDispatch } from 'react-redux';
import {
  decrementSpentSkill,
  incrementSpentSkill
} from '../redux/characterSlice';
import { SkillState } from '../types/characterTypes';

interface SkillsBoxProps {
  characterId: string;
  skills: SkillState;
  totalBudget: number;
}

const SkillsBox: React.FC<SkillsBoxProps> = ({
  characterId,
  skills,
  totalBudget
}) => {
  const dispatch = useDispatch();

  // Calculate total spent skill points
  const totalSpent = Object.values(skills).reduce(
    (total, skill) => total + skill.value,
    0
  );

  // Calculate remaining budget
  const remainingBudget = totalBudget - totalSpent;

  // Render individual skill item
  const renderSkillItem = (skillName: string, skill: SkillState[string]) => (
    <li key={skillName} className='skill-item'>
      <strong>{skillName}:</strong>
      <span> Spent: {skill.value} </span>
      <span> Modifier: {skill.modifier} </span>
      <span> Total: {skill.value + skill.modifier} </span>
      <div className='skill-controls'>
        <button
          onClick={() =>
            dispatch(incrementSpentSkill({ skill: skillName, characterId }))
          }
          disabled={totalSpent >= totalBudget}
        >
          +
        </button>
        <button
          onClick={() =>
            dispatch(decrementSpentSkill({ skill: skillName, characterId }))
          }
          disabled={skill.value <= 0}
        >
          -
        </button>
      </div>
    </li>
  );

  return (
    <div className='skills-box'>
      <h3>Skills for {characterId}</h3>
      <p>
        <strong>Total Budget:</strong> {totalBudget} | <strong>Spent:</strong>{' '}
        {totalSpent} | <strong>Remaining:</strong> {remainingBudget}
      </p>
      <ul>
        {Object.entries(skills).map(([skillName, skill]) =>
          renderSkillItem(skillName, skill)
        )}
      </ul>
    </div>
  );
};

export default SkillsBox;
