import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { createRoot } from 'react-dom/client';
import { ReactSelect } from './components/react-select/react-select';
import { createElement } from 'react';
import { StoreService } from '@shared/services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers: [
    StoreService
  ],
})
export class AppComponent {
  public readonly storeService = inject(StoreService);

  public increaseCounter(): void {
    this.storeService.setCounter(this.storeService.counter + 1);
  }
}
