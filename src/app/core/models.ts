export type Difficulty = 'easy' | 'medium' | 'hard';

export type DinoChallenge = {
  id: string;
  difficulty: Difficulty;
  levelId: string;
  name: string;
  emoji: string;
  /** Kid-friendly description drawn from museum-grade public sources. */
  description: string;
  distractorNames: [string, string, string];
};

export type Level = {
  id: string;
  difficulty: Difficulty;
  title: string;
  ribbonTitle: string;
  description: string;
  emoji: string;
  challenges: DinoChallenge[];
};

export type ProfileProgress = {
  completedChallengeIds: string[];
  currentChallengeId: string;
  stars: number;
  attempts: Record<string, number>;
};

export type UserProfile = {
  id: string;
  displayName: string;
  difficulty: Difficulty;
  voiceEnabled: boolean;
  soundEnabled: boolean;
  createdAt: string;
  progress: ProfileProgress;
};

export const STORAGE_KEY = 'guessing-dino:profiles';
export const ACTIVE_PROFILE_KEY = 'guessing-dino:active-profile-id';

export const difficultyOptions: {
  id: Difficulty;
  label: string;
  ages: string;
  detail: string;
}[] = [
  {
    id: 'easy',
    label: 'Easy',
    ages: 'Ages 4–6',
    detail: 'Famous dinosaurs and short clues.',
  },
  {
    id: 'medium',
    label: 'Medium',
    ages: 'Ages 7–8',
    detail: 'More species and trickier hints.',
  },
  {
    id: 'hard',
    label: 'Hard',
    ages: 'Ages 9–10',
    detail: 'Less common names and detailed clues.',
  },
];
