import { useState } from 'react';
import { ATTRIBUTE_LIST } from '../constants/attributes';

const AttributeControls = () => {
  const [attributes, setAttributes] = useState(
    ATTRIBUTE_LIST.reduce((acc, attribute) => {
      acc[attribute] = 10; // Default value for all attributes
      return acc;
    }, {} as Record<string, number>)
  );

  const incrementAttribute = (attribute: string) => {
    setAttributes(prev => ({
      ...prev,
      [attribute]: prev[attribute] + 1
    }));
  };

  const decrementAttribute = (attribute: string) => {
    setAttributes(prev => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] - 1) // Prevent going below 0
    }));
  };

  return (
    <div>
      <h2>Attributes</h2>
      <ul>
        {ATTRIBUTE_LIST.map(attribute => (
          <li key={attribute}>
            <span>
              {attribute}: {attributes[attribute]}
            </span>
            <button onClick={() => incrementAttribute(attribute)}>+</button>
            <button onClick={() => decrementAttribute(attribute)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttributeControls;
