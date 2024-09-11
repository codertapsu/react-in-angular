import { Injector } from '@angular/core';
import { PropsWithChildren, createContext, useContext } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { InjectorCtx } from './ng-context';

export function useInjector(): Injector {
  const injector = useContext(InjectorCtx);

  if (!injector) {
    throw new Error('Missing NgContext');
  }

  return injector;
}
