import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { createRoot } from 'react-dom/client';
import { ReactSelect } from './components/react-select/react-select';
import { createElement } from 'react';
import { StoreService } from '@shared/services/store.service';

declare const STABLE_FEATURE: boolean;

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
export class AppComponent implements OnInit {
  public readonly storeService = inject(StoreService);

  public ngOnInit(): void {
    console.log('STABLE_FEATURE:', STABLE_FEATURE);
  }

  public increaseCounter(): void {
    this.storeService.setCounter(this.storeService.counter + 1);
  }
}
