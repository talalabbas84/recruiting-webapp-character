import React from 'react';
import { Attributes } from '../types';
import { SKILL_LIST } from '../consts';

interface Props {
  attributes: Attributes;
}

const SkillsDisplay: React.FC<Props> = ({ attributes }) => {
  const calculateModifier = (attribute: string): number =>
    Math.floor((attributes[attribute] - 10) / 2);

  return (
    <div>
      <h2>Skills</h2>
      <ul>
        {SKILL_LIST.map(skill => (
          <li key={skill.name}>
            {skill.name} (Modifier: {calculateModifier(skill.attributeModifier)}
            )
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsDisplay;
