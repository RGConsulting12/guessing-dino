import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { difficultyOptions, Difficulty } from '../../core/models';
import { ProfileService } from '../../core/profile.service';

@Component({
  selector: 'app-setup',
  imports: [FormsModule],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss',
})
export class SetupComponent {
  private readonly profiles = inject(ProfileService);
  private readonly router = inject(Router);

  readonly difficultyOptions = difficultyOptions;

  displayName = '';
  difficulty: Difficulty = 'easy';
  voiceEnabled = true;

  start(): void {
    const profile = this.profiles.createProfile(
      this.displayName,
      this.difficulty,
      this.voiceEnabled,
    );
    void this.router.navigate(['/play', profile.progress.currentChallengeId]);
  }
}
