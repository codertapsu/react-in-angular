import { useCounter } from "@shared/contexts/counter/counter.context";
import { StoreService } from "@shared/services/store.service";
import { useInjector } from "@shared/use-injector";
import { useEffect, useState } from "react";

export const ReactCounter = () => {
  const injector = useInjector();
  const storeService = injector.get(StoreService);
  const [counter, setCounter] = useState(storeService.counter);
  const { counter: rCounter, setCounter: rSetCounter } = useCounter();

  useEffect(() => {
    const subscription = storeService.counter$.subscribe(setCounter);
    return () => {
      subscription.unsubscribe();
    };
  }, [storeService.$counter()]);

  return (
    <div>
      <h1>React Counter</h1>
      <div>
        <button onClick={() => storeService.increment()}>Increment</button>
        <span>{counter}</span>
      </div>
      <hr />
      <div>
        <h1>Counter React 1: {rCounter}</h1>
        <button onClick={() => rSetCounter(rCounter + 1)}>Increment</button>
      </div>
    </div>
  );
};
