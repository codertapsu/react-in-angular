import {
  Component,
  effect,
  EnvironmentInjector,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly _injector = inject(Injector);
  private readonly _environmentInjector = inject(EnvironmentInjector);

  public createEffect(): void {
    // const ref = runInInjectionContext(this._environmentInjector, () => {
    //   return effect(() => {
    //     console.log(
    //       `side effect angular signal after movie changes ${JSON.stringify(
    //         this.movieSig()
    //       )}`
    //     );
    //   });
    // });
  }
}
