import React from 'react';
import { useDispatch } from 'react-redux';
import { addCharacter } from '../redux/characterSlice';

interface CharacterActionsProps {
  onSave: () => void;
}

const CharacterActions: React.FC<CharacterActionsProps> = ({ onSave }) => {
  const dispatch = useDispatch();

  return (
    <div className='character-actions'>
      <button onClick={() => dispatch(addCharacter())}>Add Character</button>
   
      <button onClick={onSave}>Save Characters</button>
    </div>
  );
};

export default CharacterActions;
