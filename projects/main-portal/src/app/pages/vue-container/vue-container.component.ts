import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import VueCounter from '@components/vue-counter/vue-counter';
import { ANGULAR_INJECTOR } from '@shared/tokens/vue.token';
import type { CreateAppFunction } from 'vue';

// import VueCounter2 from './vue-counter2.vue';
// import { createApp } from 'vue';

const { createApp } = require('vue/dist/vue.esm-bundler.js');

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
  public readonly _$reactElement =
    viewChild<ElementRef<HTMLElement>>('vueElement');

  public constructor() {
    effect((onCleanup) => {
      const root = (createApp as CreateAppFunction<Element>)(VueCounter, {
        base: 'VueCounter12345',
        // injector: this._injector,
        // environmentInjector: this._environmentInjector,
      });
      root.provide(ANGULAR_INJECTOR, this._injector);
      root.mount(
        this._$reactElement()!.nativeElement!.querySelector('#vue-container')!
      );
      onCleanup(() => {
        root.unmount();
      });
    });
  }
}
