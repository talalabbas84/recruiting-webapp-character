import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CLASS_LIST } from '../constants/classes';
import { RootState } from '../state/store';

const ClassDisplay = () => {
  const classes = useSelector((state: RootState) => state.character.classes);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const handleClassClick = (className: string) => {
    setSelectedClass(className);
  };

  return (
    <div>
      <h2>Classes</h2>
      <ul>
        {Object.keys(classes).map(className => (
          <li
            key={className}
            style={{
              color: classes[className] ? 'green' : 'red',
              cursor: 'pointer'
            }}
            onClick={() => handleClassClick(className)}
          >
            {className}
          </li>
        ))}
      </ul>
      {selectedClass && (
        <div>
          <h3>{selectedClass} Requirements</h3>
          <ul>
            {(
              Object.entries(CLASS_LIST[selectedClass]) as [string, number][]
            ).map(([attribute, value]) => (
              <li key={attribute}>
                {attribute}: {value}
              </li>
            ))}
          </ul>
          <button onClick={() => setSelectedClass(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ClassDisplay;
