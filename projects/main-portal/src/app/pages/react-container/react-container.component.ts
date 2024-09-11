import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  Injector,
  viewChild,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { createRoot } from 'react-dom/client';
import { ReactSelect } from '@components/react-select/react-select';
import { createElement } from 'react';
import { NgContext } from '@shared/ng-context';

@Component({
  selector: 'app-react-container',
  standalone: true,
  imports: [],
  templateUrl: './react-container.component.html',
  styleUrl: './react-container.component.scss',
})
export class ReactContainerComponent {
  private readonly _injector = inject(Injector);
  private readonly _environmentInjector = inject(EnvironmentInjector);
  public readonly _$reactElement =
    viewChild<ElementRef<HTMLElement>>('reactElement');

  public constructor() {
    effect((onCleanup) => {
      const root = createRoot(this._$reactElement()!.nativeElement, {
        identifierPrefix: 'react',
        onRecoverableError: (error, errorInfo) => {
          console.error(error);
          console.error(errorInfo);
        },
      });
      root.render(
        createElement(
          NgContext,
          {
            injector: this._injector,
            environmentInjector: this._environmentInjector,
          },
          createElement(ReactSelect, {
            onChange: (event: React.ChangeEvent<HTMLSelectElement>) => {
              console.log(event.target.value);
            },
          })
        )
      );
      onCleanup(() => {
        console.log('onCleanup');

        root.unmount();
      });
    });
  }
}
