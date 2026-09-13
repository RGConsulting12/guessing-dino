import {
  easyLevel1,
  easyLevel2,
  easyLevel3,
} from './levels/easy';
import {
  hardLevel1,
  hardLevel2,
  hardLevel3,
} from './levels/hard';
import {
  mediumLevel1,
  mediumLevel2,
  mediumLevel3,
} from './levels/medium';
import { Difficulty, DinoChallenge, Level } from './models';

export const levels: Level[] = [
  {
    id: 'easy-stars',
    difficulty: 'easy',
    title: 'Dino Stars',
    ribbonTitle: 'Stars',
    description: 'Meet the most famous dinosaurs.',
    emoji: '⭐',
    challenges: easyLevel1,
  },
  {
    id: 'easy-explorers',
    difficulty: 'easy',
    title: 'More Explorers',
    ribbonTitle: 'Explore',
    description: 'Armor, crests, and speedy hunters.',
    emoji: '🧭',
    challenges: easyLevel2,
  },
  {
    id: 'easy-legends',
    difficulty: 'easy',
    title: 'Easy Legends',
    ribbonTitle: 'Legends',
    description: 'Finish the easy trail with fan favorites.',
    emoji: '🏆',
    challenges: easyLevel3,
  },
  {
    id: 'medium-longnecks',
    difficulty: 'medium',
    title: 'Horns & Necks',
    ribbonTitle: 'Horns',
    description: 'Compare look-alike plant-eaters.',
    emoji: '🦴',
    challenges: mediumLevel1,
  },
  {
    id: 'medium-hunters',
    difficulty: 'medium',
    title: 'Global Hunters',
    ribbonTitle: 'Hunters',
    description: 'Meat-eaters from around the world.',
    emoji: '🌍',
    challenges: mediumLevel2,
  },
  {
    id: 'medium-duckbills',
    difficulty: 'medium',
    title: 'Duck Bills',
    ribbonTitle: 'Duckbills',
    description: 'Crests, herds, and giant claws.',
    emoji: '🦆',
    challenges: mediumLevel3,
  },
  {
    id: 'hard-claws',
    difficulty: 'hard',
    title: 'Claws & Sails',
    ribbonTitle: 'Claws',
    description: 'Specialized predators and fish-eaters.',
    emoji: '🗡️',
    challenges: hardLevel1,
  },
  {
    id: 'hard-feathers',
    difficulty: 'hard',
    title: 'Feathered Links',
    ribbonTitle: 'Feathers',
    description: 'Dinosaurs close to the first birds.',
    emoji: '🪶',
    challenges: hardLevel2,
  },
  {
    id: 'hard-speed',
    difficulty: 'hard',
    title: 'Speed & Skulls',
    ribbonTitle: 'Speed',
    description: 'Runners, spikes, and record-breaking skulls.',
    emoji: '💨',
    challenges: hardLevel3,
  },
];

export const allChallenges: DinoChallenge[] = levels.flatMap((level) => level.challenges);

export function levelsForDifficulty(difficulty: Difficulty): Level[] {
  return levels.filter((level) => level.difficulty === difficulty);
}

export function getChallenge(id: string): DinoChallenge | undefined {
  return allChallenges.find((challenge) => challenge.id === id);
}

export function nextChallenge(id: string): DinoChallenge | undefined {
  const index = allChallenges.findIndex((challenge) => challenge.id === id);
  if (index < 0 || index >= allChallenges.length - 1) {
    return undefined;
  }
  return allChallenges[index];
}

export function firstChallengeForDifficulty(difficulty: Difficulty): DinoChallenge {
  return levelsForDifficulty(difficulty)[0]!.challenges[0]!;
}

export function challengesForDifficulty(difficulty: Difficulty): DinoChallenge[] {
  return levelsForDifficulty(difficulty).flatMap((level) => level.challenges);
}

export function getLevel(levelId: string): Level | undefined {
  return levels.find((level) => level.id === levelId);
}
