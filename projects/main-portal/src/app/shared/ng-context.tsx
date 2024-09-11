import type { EnvironmentInjector, Injector } from "@angular/core";
import { createContext, createElement, type PropsWithChildren } from "react";

export const InjectorCtx = createContext<Injector | null>(null);

export function NgContext(
  props: PropsWithChildren<{
    injector: Injector;
    environmentInjector: EnvironmentInjector;
  }>
) {
  return createElement(InjectorCtx.Provider, {
    children: props.children,
    value: props.injector,
  });
}
