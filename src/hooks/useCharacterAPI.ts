import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../redux/characterSlice';
import { RootState } from '../types/reduxTypes';

const API_URL =
  'https://recruiting.verylongdomaintotestwith.ca/api/{talalabbas84}/character';

export const useCharacterAPI = () => {
  const state = useSelector((state: RootState) => state.character);
  const dispatch = useDispatch();

  const fetchInitialState = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error fetching initial state: ${response.status}`);
      }
      const data = await response.json();
      if (data && Object.keys(data.body).length > 0) {
        dispatch(setInitialState(data.body));
      }
    } catch (error) {
      console.error('Failed to fetch initial state:', error);
    }
  }, [dispatch]);

  const saveCharacters = useCallback(async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      });

      if (!response.ok) {
        throw new Error(`Error saving characters: ${response.status}`);
      }
      alert('Characters saved successfully');
    } catch (error) {
      alert('Failed to save characters.');
      console.error(error);
    }
  }, [state]);

  return { fetchInitialState, saveCharacters };
};
