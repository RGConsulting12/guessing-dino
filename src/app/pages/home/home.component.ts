import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { levelsForDifficulty } from '../../core/curriculum';
import { difficultyOptions } from '../../core/models';
import { ProfileService } from '../../core/profile.service';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, RouterLink, TitleCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly profiles = inject(ProfileService);
  private readonly router = inject(Router);

  readonly difficultyOptions = difficultyOptions;
  readonly activeProfile$ = this.profiles.activeProfile$;
  readonly profiles$ = this.profiles.profiles$;

  levelsFor(profile: { difficulty: 'easy' | 'medium' | 'hard' }) {
    return levelsForDifficulty(profile.difficulty);
  }

  trackProgress(profile: Parameters<ProfileService['trackProgress']>[0]) {
    return this.profiles.trackProgress(profile);
  }

  isCompleted(
    profile: Parameters<ProfileService['isCompleted']>[0],
    challengeId: string,
  ): boolean {
    return this.profiles.isCompleted(profile, challengeId);
  }

  switchProfile(id: string): void {
    this.profiles.switchProfile(id);
  }

  toggleVoice(profile: { voiceEnabled: boolean }): void {
    this.profiles.setVoiceEnabled(!profile.voiceEnabled);
  }

  toggleSound(profile: { soundEnabled: boolean }): void {
    this.profiles.setSoundEnabled(!profile.soundEnabled);
  }

  ngOnInit(): void {
    if (!this.profiles.hasProfiles()) {
      void this.router.navigate(['/setup']);
    }
  }
}
