import AttributeControls from './AttributeControls';
import ClassDisplay from './ClassDisplay';
import SkillsBox from './SkillsBox';

const Character = () => {
  return (
    <div>
      <h1>Character Editor</h1>
      <AttributeControls />
      <ClassDisplay />
      <SkillsBox />
    </div>
  );
};

export default Character;
