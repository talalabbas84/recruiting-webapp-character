import React from 'react';
import { Attributes, Class } from '../types';
import { CLASS_LIST } from '../consts';

interface Props {
  attributes: Attributes;
}

const ClassRequirements: React.FC<Props> = ({ attributes }) => {
  const doesMeetRequirements = (className: Class): boolean => {
    const requirements = CLASS_LIST[className];
    return Object.keys(requirements).every(
      attribute => attributes[attribute] >= requirements[attribute]
    );
  };

  return (
    <div>
      <h2>Available Classes</h2>
      <ul>
        {Object.keys(CLASS_LIST).map(className => (
          <li
            key={className}
            style={{
              color: doesMeetRequirements(className as Class) ? 'green' : 'red'
            }}
          >
            {className}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassRequirements;
