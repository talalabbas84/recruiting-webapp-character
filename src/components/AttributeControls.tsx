import React from 'react';
import { ATTRIBUTE_LIST } from '../consts';

interface Props {
  attributes: Record<string, number>;
  onAttributesChange: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
}

const AttributeControls: React.FC<Props> = ({
  attributes,
  onAttributesChange
}) => {
  const incrementAttribute = (attribute: string) => {
    onAttributesChange(prev => ({
      ...prev,
      [attribute]: prev[attribute] + 1
    }));
  };

  const decrementAttribute = (attribute: string) => {
    onAttributesChange(prev => ({
      ...prev,
      [attribute]: Math.max(0, prev[attribute] - 1)
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
