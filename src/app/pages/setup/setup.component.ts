import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { difficultyOptions, Difficulty } from '../../core/models';
import { ProfileService } from '../../core/profile.service';
import { SoundsService } from '../../core/sounds.service';

@Component({
  selector: 'app-setup',
  imports: [FormsModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  private readonly profiles = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly sounds = inject(SoundsService);

  readonly difficultyOptions = difficultyOptions;

  displayName = '';
  difficulty: Difficulty = 'easy';
  voiceEnabled = true;
  soundEnabled = true;

  start(): void {
    void this.sounds.unlockAudio();
    const profile = this.profiles.createProfile(
      this.displayName,
      this.difficulty,
      this.voiceEnabled,
      this.soundEnabled,
    );
    void this.router.navigate(['/play', profile.progress.currentChallengeId]);
  }
}
