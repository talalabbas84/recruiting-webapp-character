import { useState } from 'react';
import AttributeControls from './components/AttributeControls';
import ClassRequirements from './components/ClassRequirements';
import SkillsDisplay from './components/SkillsDisplay';
import { Attributes } from './types';

const App = () => {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10
  });

  return (
    <div>
      <h1>Recruiting WebApp Character</h1>
      <AttributeControls
        attributes={attributes}
        onAttributesChange={setAttributes}
      />
      <ClassRequirements attributes={attributes} />
      <SkillsDisplay attributes={attributes} />
    </div>
  );
};

export default App;
