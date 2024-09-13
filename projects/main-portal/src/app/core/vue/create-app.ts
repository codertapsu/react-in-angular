import type { Injector } from '@angular/core';
import { CreateAppFunction, inject } from 'vue';

const { createApp: createAppFn } =
  require('vue/dist/vue.esm-bundler.js') as typeof import('vue');

const ANGULAR_INJECTOR = Symbol('ANGULAR_INJECTOR');

const useInjector = (): Injector => {
  const injector = inject(ANGULAR_INJECTOR) as Injector;

  if (!injector) {
    throw new Error('Missing NgContext');
  }

  return injector;
};

const createApp =
  (injector: Injector): CreateAppFunction<Element> =>
  (component, props) => {
    const root = createAppFn(component, props);
    root.provide(ANGULAR_INJECTOR, injector);

    return root;
  };

export { createApp, useInjector };
