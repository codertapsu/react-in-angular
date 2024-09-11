import { ApplicationRef, EnvironmentInjector } from "@angular/core";
import { StoreService } from "@shared/services/store.service";
import { useInjector } from "@shared/use-injector";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { filter } from "rxjs/operators";

export type CounterContextType = {
  counter: number;
  setCounter: (value: number) => void;
};

export const CounterContext = createContext<CounterContextType>(null as any);

export const CounterProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const injector = useInjector();
  const storeService = injector.get(StoreService);

  const [counter, setCounter] = useState(storeService.counter);

  useEffect(() => {
    const subscription = storeService.counter$.pipe().subscribe(setCounter);
    console.log("Sync from Angular to React");

    return () => {
      subscription.unsubscribe();
    };
  }, [storeService.counter]);

  const updateCounter = (value: number) => {
    console.log(value);

    storeService.setCounter(value);
  };
  const value = { counter, setCounter: updateCounter };

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
};
