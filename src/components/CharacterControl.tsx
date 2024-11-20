import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCharacterAPI } from '../hooks/useCharacterAPI';
import { RootState } from '../types/reduxTypes';
import Character from './Character';
import CharacterActions from './CharacterActions';

const CharacterControl: React.FC = () => {
  const { fetchInitialState, saveCharacters } = useCharacterAPI();
  const state = useSelector((state: RootState) => state.character);

  useEffect(() => {
    fetchInitialState();
  }, [fetchInitialState]);

  return (
    <div>
      <CharacterActions onSave={saveCharacters} />
      <div className='grid'>
        {Object.entries(state).map(([characterId, characterData]) => (
          <Character
            key={characterId}
            characterId={characterId}
            characterData={characterData}
          />
        ))}
      </div>
    </div>
  );
};

export default CharacterControl;
