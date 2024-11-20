import React from 'react';
import { useDispatch } from 'react-redux';
import { adjustAttribute } from '../redux/characterSlice';
import { AttributeState } from '../types/characterTypes';
import { calculateModifier } from '../utils/modifier';

interface AttributesBoxProps {
  characterId: string;
  attributes: AttributeState;
}

const AttributesBox: React.FC<AttributesBoxProps> = ({
  characterId,
  attributes
}) => {
  const dispatch = useDispatch();


  return (
    <div className='card'>
      <h3>Attributes</h3>
      <ul>
        {Object.entries(attributes).map(([attr, value]) => (
          <li key={attr}>
            <span>
              {attr}: {value} (Modifier: {calculateModifier(value)})
            </span>
            <div>
              <button
                onClick={() =>
                  dispatch(
                    adjustAttribute({ attribute: attr, change: 1, characterId })
                  )
                }
              >
                +
              </button>
              <button
                onClick={() =>
                  dispatch(
                    adjustAttribute({
                      attribute: attr,
                      change: -1,
                      characterId
                    })
                  )
                }
              >
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttributesBox;
