import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SpeechService {
  private readonly http = inject(HttpClient);
  private currentAudio: HTMLAudioElement | null = null;

  speak(text: string): Observable<void> {
    return this.http
      .post('/api/speak', { text }, { responseType: 'blob' })
      .pipe(
        switchMap((blob) =>
          from(
            (async () => {
              this.stop();
              const url = URL.createObjectURL(blob);
              const audio = new Audio(url);
              this.currentAudio = audio;
              await audio.play();
              audio.addEventListener(
                'ended',
                () => {
                  URL.revokeObjectURL(url);
                  if (this.currentAudio === audio) {
                    this.currentAudio = null;
                  }
                },
                { once: true },
              );
            })(),
          ),
        ),
      );
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }
}
