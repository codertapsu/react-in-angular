import { effect, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StoreService {
  private readonly _$counter = signal(100);
  private readonly _counter$ = new BehaviorSubject(this._$counter());

  private _ = effect(() => {
    this._counter$.next(this._$counter());
  });

  get counter(): number {
    return this._$counter();
  }

  get $counter() {
    return this._$counter;
  }

  get counter$() {
    return this._counter$.asObservable();
  }

  public increment(): void {
    this._$counter.update((value) => value + 1);
  }

  public decrement(): void {
    this._$counter.update((value) => value - 1);
  }

  public reset(): void {
    this._$counter.set(0);
  }

  public setCounter(value: number): void {
    this._$counter.set(value);
  }
}
