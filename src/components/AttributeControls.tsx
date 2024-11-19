import { useDispatch, useSelector } from 'react-redux';
import { ATTRIBUTE_LIST } from '../consts';
import {
  decrementAttribute,
  incrementAttribute
} from '../state/characterSlice';
import { RootState } from '../state/store';

const AttributeControls = () => {
  const attributes = useSelector(
    (state: RootState) => state.character.attributes
  );
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Attributes</h2>
      <ul>
        {ATTRIBUTE_LIST.map(attribute => (
          <li key={attribute}>
            <span>
              {attribute}: {attributes[attribute]}
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
