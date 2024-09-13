import { useEffect, useRef, type PropsWithChildren } from "react";
import { useInjector } from "@shared/use-injector";
import { Router } from "@angular/router";
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
} from "@angular/core";
import { NotificationComponent } from "@components/notification/notification.component";
import { ReactCounter } from "@components/react-counter/react-counter";
import {
  CounterContext,
  CounterProvider,
  useCounter,
} from "@shared/contexts/counter/counter.context";

type ReactSelectProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const ReactSelect: React.FC<PropsWithChildren<ReactSelectProps>> = ({
  onChange,
  children,
}) => {
  const notificationRef = useRef<HTMLDivElement>(null);
  const injector = useInjector();
  const appRef = injector.get(ApplicationRef);
  const environmentInjector = injector.get(EnvironmentInjector);

  useEffect(() => {
    const dialogRef = createComponent(NotificationComponent, {
      environmentInjector,
      elementInjector: injector,
      hostElement: notificationRef.current as Element,
    });

    dialogRef.setInput("text", "12345");

    // document.body.appendChild(dialogRef.location.nativeElement);

    // Register the newly created ref using the `ApplicationRef` instance
    // to include the component view into change detection cycles.
    appRef.attachView(dialogRef.hostView);
  }, [notificationRef.current]);

  return (
    <CounterProvider>
      <h1>React</h1>
      <div>
        <select
          onChange={(value) => {
            console.log(value);
            onChange(value);
          }}
        >
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>
      <button onClick={() => injector.get(Router).navigateByUrl("/")}>
        Home
      </button>
      {children}
      <div>
        <h5>
          Render Angular Component in React using Angular's `createComponent`
        </h5>
        <div ref={notificationRef}></div>
      </div>
      <hr />
      <div>
        <ReactCounter />
      </div>
      <hr />
      <CounterContext.Consumer>
        {({ counter: rCounter, setCounter: rSetCounter }) => {
          return (
            <>
              <div>
                <h1>Counter React 2: {rCounter}</h1>
                <button onClick={() => rSetCounter(rCounter + 1)}>
                  Increment
                </button>
              </div>
            </>
          );
        }}
      </CounterContext.Consumer>
    </CounterProvider>
  );
};
