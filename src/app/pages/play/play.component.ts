import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getChallenge } from '../../core/curriculum';
import { pick, SILLY_REACTION_MS, sillyFaces, sillyMessages, yayMessages } from '../../core/reactions';
import { choicesForChallenge } from '../../core/shuffle';
import { ProfileService } from '../../core/profile.service';
import { SoundsService } from '../../core/sounds.service';
import { SpeechService } from '../../core/speech.service';
import { ConfettiBurstComponent } from '../../shared/confetti-burst/confetti-burst.component';

@Component({
  selector: 'app-play',
  imports: [AsyncPipe, RouterLink, ConfettiBurstComponent],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly profiles = inject(ProfileService);
  private readonly speech = inject(SpeechService);
  private readonly sounds = inject(SoundsService);

  choices: string[] = [];
  feedback = '';
  success = false;
  speaking = false;
  speechError = '';
  confettiKey = 0;
  sillyFace = '';
  trailComplete = false;
  private sillyTimer: ReturnType<typeof setTimeout> | null = null;

  readonly challenge$ = this.route.paramMap.pipe(
    map((params) => getChallenge(params.get('id') ?? '')),
  );
  readonly activeProfile$ = this.profiles.activeProfile$;

  ngOnInit(): void {
    void this.sounds.unlockAudio();
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      const challenge = getChallenge(id);
      this.feedback = '';
      this.success = false;
      this.speechError = '';
      this.sillyFace = '';
      this.trailComplete = false;
      this.clearSillyTimer();
      if (challenge) {
        this.choices = choicesForChallenge(challenge.name, challenge.distractorNames);
        this.profiles.setCurrentChallenge(id);
        this.maybeReadAloud(challenge.description);
      }
    });
  }

  ngOnDestroy(): void {
    this.speech.stop();
    this.clearSillyTimer();
  }

  private clearSillyTimer(): void {
    if (this.sillyTimer) {
      clearTimeout(this.sillyTimer);
      this.sillyTimer = null;
    }
  }

  private maybeReadAloud(text: string): void {
    const profile = this.profiles.activeProfile$.value;
    if (!profile?.voiceEnabled) {
      return;
    }
    this.readAloud(text);
  }

  readAloud(text: string): void {
    void this.sounds.unlockAudio();
    this.speaking = true;
    this.speechError = '';
    this.speech.speak(text).subscribe({
      next: () => {
        this.speaking = false;
      },
      error: () => {
        this.speaking = false;
        this.speechError = 'Voice is unavailable right now. You can still read the clue.';
      },
    });
  }

  guess(
    choice: string,
    correctName: string,
    challengeId: string,
  ): void {
    if (this.success) {
      return;
    }

    void this.sounds.unlockAudio();
    this.profiles.recordAttempt(challengeId);
    const profile = this.profiles.activeProfile$.value;

    if (choice === correctName) {
      this.success = true;
      this.sillyFace = '';
      this.feedback = pick(yayMessages);
      this.confettiKey += 1;
      if (profile?.soundEnabled) {
        this.sounds.playSuccess();
      }
      this.profiles.completeChallenge(challengeId);
      const next = this.nextId(challengeId);
      this.trailComplete = !next;
      if (this.trailComplete && profile?.soundEnabled) {
        window.setTimeout(() => this.sounds.playPageFanfare(), 350);
      }
      return;
    }

    this.sillyFace = pick(sillyFaces);
    this.feedback = pick(sillyMessages);
    if (profile?.soundEnabled) {
      this.sounds.playSilly();
    }
    this.clearSillyTimer();
    this.sillyTimer = setTimeout(() => {
      this.sillyFace = '';
      this.sillyTimer = null;
    }, SILLY_REACTION_MS);
  }

  nextId(challengeId: string): string | null {
    return this.profiles.nextChallengeId(challengeId);
  }
}
