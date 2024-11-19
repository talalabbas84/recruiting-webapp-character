import { useDispatch, useSelector } from 'react-redux';
import { decrementSkill, incrementSkill } from '../state/characterSlice';
import { RootState } from '../state/store';

const SkillsBox = () => {
  const skills = useSelector((state: RootState) => state.character.skills);
  const totalSkillBudget = useSelector(
    (state: RootState) => state.character.totalSkillBudget
  );
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Skills</h2>
      <p>Total Skill Budget: {totalSkillBudget}</p>
      <ul>
        {Object.entries(skills).map(([skillName, skill]) => (
          <li key={skillName}>
            {skillName} - Points: {skill.value}, Modifier: {skill.modifier},
            Total: {skill.value + skill.modifier}
            <button
              onClick={() => dispatch(incrementSkill({ skill: skillName }))}
            >
              +
            </button>
            <button
              onClick={() => dispatch(decrementSkill({ skill: skillName }))}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsBox;
