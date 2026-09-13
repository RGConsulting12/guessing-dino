import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  challengesForDifficulty,
  firstChallengeForDifficulty,
  getChallenge,
  nextChallenge,
} from './curriculum';
import {
  ACTIVE_PROFILE_KEY,
  Difficulty,
  ProfileProgress,
  STORAGE_KEY,
  UserProfile,
} from './models';

function newId(): string {
  return crypto.randomUUID();
}

function defaultProgress(difficulty: Difficulty): ProfileProgress {
  const first = firstChallengeForDifficulty(difficulty);
  return {
    completedChallengeIds: [],
    currentChallengeId: first.id,
    stars: 0,
    attempts: {},
  };
}

function createProfile(
  displayName: string,
  difficulty: Difficulty,
  voiceEnabled: boolean,
): UserProfile {
  return {
    id: newId(),
    displayName,
    difficulty,
    voiceEnabled,
    createdAt: new Date().toISOString(),
    progress: defaultProgress(difficulty),
  };
}

function sanitizeName(name: string): string {
  return name.replace(/[<>"'&]/g, '').trim().slice(0, 24);
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly profilesSubject = new BehaviorSubject<UserProfile[]>(
    this.loadProfiles(),
  );
  private readonly activeIdSubject = new BehaviorSubject<string | null>(
    this.loadActiveId(),
  );

  readonly profiles$ = this.profilesSubject.asObservable();
  readonly activeProfile$ = new BehaviorSubject<UserProfile | null>(
    this.resolveActiveProfile(),
  );

  private loadProfiles(): UserProfile[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as UserProfile[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private loadActiveId(): string | null {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  }

  private persistProfiles(profiles: UserProfile[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
    this.profilesSubject.next(profiles);
  }

  private persistActiveId(id: string): void {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
    this.activeIdSubject.next(id);
  }

  private resolveActiveProfile(): UserProfile | null {
    const profiles = this.profilesSubject.value;
    const activeId = this.activeIdSubject.value;
    if (!profiles.length) {
      return null;
    }
    return profiles.find((profile) => profile.id === activeId) ?? profiles[0]!;
  }

  private emitActive(): void {
    this.activeProfile$.next(this.resolveActiveProfile());
  }

  hasProfiles(): boolean {
    return this.profilesSubject.value.length > 0;
  }

  createProfile(
    displayName: string,
    difficulty: Difficulty,
    voiceEnabled: boolean,
  ): UserProfile {
    const profile = createProfile(
      sanitizeName(displayName) || 'Explorer',
      difficulty,
      voiceEnabled,
    );
    const profiles = [...this.profilesSubject.value, profile];
    this.persistProfiles(profiles);
    this.persistActiveId(profile.id);
    this.emitActive();
    return profile;
  }

  switchProfile(id: string): void {
    if (!this.profilesSubject.value.some((profile) => profile.id === id)) {
      return;
    }
    this.persistActiveId(id);
    this.emitActive();
  }

  setVoiceEnabled(enabled: boolean): void {
    this.updateActive((profile) => ({ ...profile, voiceEnabled: enabled }));
  }

  private updateActive(mutator: (profile: UserProfile) => UserProfile): void {
    const active = this.resolveActiveProfile();
    if (!active) {
      return;
    }
    const profiles = this.profilesSubject.value.map((profile) =>
      profile.id === active.id ? mutator(profile) : profile,
    );
    this.persistProfiles(profiles);
    this.emitActive();
  }

  recordAttempt(challengeId: string): void {
    this.updateActive((profile) => ({
      ...profile,
      progress: {
        ...profile.progress,
        attempts: {
          ...profile.progress.attempts,
          [challengeId]: (profile.progress.attempts[challengeId] ?? 0) + 1,
        },
      },
    }));
  }

  completeChallenge(challengeId: string): void {
    this.updateActive((profile) => {
      const completed = profile.progress.completedChallengeIds.includes(challengeId)
        ? profile.progress.completedChallengeIds
        : [...profile.progress.completedChallengeIds, challengeId];

      const track = challengesForDifficulty(profile.difficulty);
      const index = track.findIndex((challenge) => challenge.id === challengeId);
      const next =
        index >= 0 && index < track.length - 1 ? track[index + 1]!.id : challengeId;

      return {
        ...profile,
        progress: {
          ...profile.progress,
          completedChallengeIds: completed,
          currentChallengeId: next,
          stars: profile.progress.stars + 1,
        },
      };
    });
  }

  setCurrentChallenge(challengeId: string): void {
    const active = this.resolveActiveProfile();
    if (!active || !getChallenge(challengeId)) {
      return;
    }
    if (getChallenge(challengeId)?.difficulty !== active.difficulty) {
      return;
    }
    this.updateActive((profile) => ({
      ...profile,
      progress: {
        ...profile.progress,
        currentChallengeId: challengeId,
      },
    }));
  }

  isCompleted(profile: UserProfile, challengeId: string): boolean {
    return profile.progress.completedChallengeIds.includes(challengeId);
  }

  nextChallengeId(challengeId: string): string | null {
    const challenge = getChallenge(challengeId);
    if (!challenge) {
      return null;
    }
    const track = challengesForDifficulty(challenge.difficulty);
    const index = track.findIndex((item) => item.id === challengeId);
    if (index < 0 || index >= track.length - 1) {
      return null;
    }
    return track[index + 1]!.id;
  }

  trackProgress(profile: UserProfile): { done: number; total: number } {
    const total = challengesForDifficulty(profile.difficulty).length;
    const done = profile.progress.completedChallengeIds.filter((id) => {
      const challenge = getChallenge(id);
      return challenge?.difficulty === profile.difficulty;
    }).length;
    return { done, total };
  }
}
