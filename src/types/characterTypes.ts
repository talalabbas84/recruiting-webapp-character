export interface AttributeState {
  [attributeName: string]: number; // Attribute names like "strength", "dexterity", etc.
}

export interface Skill {
  value: number; // Points allocated to the skill
  modifier: number; // Calculated modifier based on associated attribute
  modifierName: string; // The attribute associated with this skill (e.g., "strength")
}

export interface SkillState {
  [skillName: string]: Skill; // Skill names like "acrobatics", "history", etc.
}

export interface Class {
  showDetails: boolean; // Whether to show additional class details
  doesMeetRequirements: boolean; // Whether the character meets the class requirements
}

export interface ClassState {
  [className: string]: Class; // Class names like "wizard", "barbarian", etc.
}

export interface SkillCheck {
  selectedSkill: string; // The skill selected for the check
  dc: string; // Difficulty Class for the skill check
  rollResult: number | null; // Result of the dice roll
  checkResult: string | null; // Outcome ("Success" or "Failure")
}

export interface Character {
  attributes: AttributeState; // Character's attributes
  skills: SkillState; // Character's skills
  totalSkillBudget: number; // Points available to allocate across skills
  classes: ClassState; // Classes the character can belong to
  skillCheck: SkillCheck; // Skill check data
}

export interface CharacterState {
  [characterId: string]: Character; // Character IDs mapping to their respective data
}
