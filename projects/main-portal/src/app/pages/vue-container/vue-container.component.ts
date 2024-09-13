import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  viewChild,
} from '@angular/core';

import VueCounter from '@components/vue-counter/vue-counter';
import { CounterStore, createApp } from '@core/vue';

@Component({
  selector: 'app-vue-container',
  templateUrl: './vue-container.component.html',
  styleUrl: './vue-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VueContainerComponent {
  private readonly _injector = inject(Injector);
  private readonly _environmentInjector = inject(EnvironmentInjector);
  private readonly _destroyRef = inject(DestroyRef);
  public readonly _$reactElement =
    viewChild<ElementRef<HTMLElement>>('vueElement');

  public constructor() {
    effect((onCleanup) => {
      const root = createApp(this._injector)(CounterStore(VueCounter));
      root.mount(
        this._$reactElement()!.nativeElement!.querySelector('#vue-container')!
      );
      onCleanup(() => {
        root.unmount();
      });
    });
  }
}
