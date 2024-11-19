import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTE_LIST } from '../constants/attributes';
import {
  decrementAttribute,
  incrementAttribute
} from '../state/characterSlice';
import { RootState } from '../state/store';

const AttributeControls = () => {
  const attributes = useSelector(
    (state: RootState) => state.character.attributes
  );
  const modifiers = useSelector(
    (state: RootState) => state.character.modifiers
  );
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Attributes</h2>
      <ul>
        {ATTRIBUTE_LIST.map(attribute => (
          <li key={attribute}>
            <span>
              {attribute}: {attributes[attribute]} (Modifier:{' '}
              {modifiers[attribute]})
            </span>
            <button onClick={() => dispatch(incrementAttribute(attribute))}>
              +
            </button>
            <button onClick={() => dispatch(decrementAttribute(attribute))}>
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttributeControls;
