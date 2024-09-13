import {
  Component,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  watch,
} from 'vue';
import { useInjector } from './create-app';
import { StoreService } from '@shared/services/store.service';
import { Subscription } from 'rxjs';

interface CounterStore {
  count: number;
  increase: () => void;
}

const COUNTER_INJECTOR = Symbol('COUNTER_INJECTOR');

const useCounterStore = (): CounterStore => {
  const injector = inject(COUNTER_INJECTOR) as CounterStore;

  if (!injector) {
    throw new Error('Missing CounterStore');
  }

  return injector;
};

const CounterStore = (component: Component) =>
  defineComponent(() => {
    const injector = useInjector();
    const storeService = injector.get(StoreService);
    // const count = ref(storeService.counter);
    const count = ref(0);

    const increase = ref(() => {
      storeService.setCounter(count.value + 1);
      // storeService.increaseCounter();
    });

    console.log('CounterStore Created');

    let subscription: Subscription;
    onMounted(() => {
      subscription = storeService.counter$.pipe().subscribe(value => {
        console.log('Sync from Angular to Vue');
        count.value = value;
      });
    });
    onBeforeUnmount(() => {
      console.log('CounterStore Destroyed');
      subscription.unsubscribe();
    });

    provide(COUNTER_INJECTOR, {
      count: count,
      increase: increase.value,
    });

    return () => {
      return h(component);
    };
  });

export { CounterStore, useCounterStore };
