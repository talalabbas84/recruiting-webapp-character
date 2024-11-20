import React from 'react';
import { ClassState } from '../types/characterTypes';

interface ClassesBoxProps {
  characterId: string;
  classes: ClassState;
}

const ClassesBox: React.FC<ClassesBoxProps> = ({ characterId, classes }) => {
  return (
    <div>
      <h3>Classes for {characterId}</h3>
      <ul>
        {Object.keys(classes).map(className => (
          <li key={className}>
            {className}:{' '}
            {classes[className].doesMeetRequirements
              ? 'Eligible'
              : 'Not Eligible'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesBox;
