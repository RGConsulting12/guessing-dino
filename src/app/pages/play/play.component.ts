import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { getChallenge } from '../../core/curriculum';
import { choicesForChallenge } from '../../core/shuffle';
import { ProfileService } from '../../core/profile.service';
import { SpeechService } from '../../core/speech.service';

@Component({
  selector: 'app-play',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.scss',
})
export class PlayComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly profiles = inject(ProfileService);
  private readonly speech = inject(SpeechService);

  choices: string[] = [];
  feedback = '';
  success = false;
  speaking = false;
  speechError = '';

  readonly challenge$ = this.route.paramMap.pipe(
    map((params) => getChallenge(params.get('id') ?? '')),
  );
  readonly activeProfile$ = this.profiles.activeProfile$;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') ?? '';
      const challenge = getChallenge(id);
      this.feedback = '';
      this.success = false;
      this.speechError = '';
      if (challenge) {
        this.choices = choicesForChallenge(challenge.name, challenge.distractorNames);
        this.profiles.setCurrentChallenge(id);
        this.maybeReadAloud(challenge.description);
      }
    });
  }

  ngOnDestroy(): void {
    this.speech.stop();
  }

  private maybeReadAloud(text: string): void {
    const profile = this.profiles.activeProfile$.value;
    if (!profile?.voiceEnabled) {
      return;
    }
    this.readAloud(text);
  }

  readAloud(text: string): void {
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

    this.profiles.recordAttempt(challengeId);

    if (choice === correctName) {
      this.success = true;
      this.feedback = 'Roarsome! You guessed it!';
      this.profiles.completeChallenge(challengeId);
      return;
    }

    this.feedback = 'Not quite — try another dinosaur!';
  }

  nextId(challengeId: string): string | null {
    return this.profiles.nextChallengeId(challengeId);
  }
}
