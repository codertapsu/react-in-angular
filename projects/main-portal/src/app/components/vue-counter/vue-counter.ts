// import { ref, Component, getCurrentInstance } from 'vue';
// const VueCounter: Component = {
//   setup() {
//     const count = ref(0);
//     return { count };
//   },
//   mounted:() => {
//     const instance = getCurrentInstance();
//     console.log(instance?.proxy?.$el);
// https://vuejs.org/api/general.html
// https://vuejs.org/api/composition-api-setup.html

import { on } from 'events';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  nextTick,
  onMounted,
  ref,
  version,
  provide,
  inject,
  watch,
  useTemplateRef,
  defineExpose,
} from 'vue';
import * as styles from './styles.module.scss';
import template from './vue-counter.html';
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  Inject,
  Injector,
} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationComponent as AngularNotificationComponent } from '@components/notification/notification.component';
import { VueSelect } from '@components/vue-select/vue-select';
import { useCounterStore, useInjector } from '@core/vue';

//   },
//   template: `
//       <div>
//         <p class="contact_us_text">Vue 3.1 Counter: {{ count }}</p>
//         <button @click="count++">Increment</button>
//       </div>
//     `,
// };

// interface NotificationComponentProps {
//   message: string;
// }

const VUE_STATE = Symbol('VUE_STATE');

const NotificationComponent = defineComponent(
  (props, { expose }) => {
    const counterStore = useCounterStore();
    console.log(counterStore);

    const state = inject(VUE_STATE) as any;
    console.log(state);

    // use Composition API here like in <script setup>

    watch(
      () => state.count.value,
      (newValue, oldValue) => {
        console.log('watch', newValue, oldValue);
      },
      {
        immediate: false,
      }
    );

    const update = () => {
      console.log('update');
      counterStore.increase();
    };

    expose({
      update,
    });

    return () => {
      // render function or JSX
      const innerHtml = `
        Check Notification: ${props.message}/${state.count.value}
    `;

      return h('div', [
        h('p', {
          innerHTML: innerHtml,
          class: styles.highlighted,
        }),
        h(
          'button',
          {
            onClick: update,
          },
          `Count: ${state.count.value}xxx`
        ),
      ]);
      // return h('div', `Check Notification: ${props.message}/${state.count.value}`);
    };

    // return () => {
    //   // render function or JSX
    //   return <div>{count.value}</div>
    // }
  },
  // extra options, e.g. declare props and emits
  {
    props: {
      message: Number,
    },
  }
);

type NotificationComponentInstance = InstanceType<
  typeof NotificationComponent
> & {
  update: () => void;
};

const VueCounter = defineComponent({
  setup: (props) => {
    const injector = useInjector();
    const environmentInjector = injector.get(EnvironmentInjector);
    const appRef = injector.get(ApplicationRef);
    // const count = ref(0);
    // const styles = `
    //   .highlighted {
    //     color: red;
    //   }
    // `;
    const count = ref(0);
    const childRef = useTemplateRef<NotificationComponentInstance>('child');
    const notificationRef = useTemplateRef<HTMLElement>('notification');

    // Define the styles object
    // const styles = computed(() => ({
    //   highlighted: count.value >= 5,
    //   normal: count.value < 5,
    // }));

    // const css = `
    //   .highlighted {
    //     color: red;
    //     font-weight: bold;

    //     &:hover {
    //       color: blue;
    //     }
    //   }
    //   .normal {
    //     color: black;
    //   }
    // `;

    onMounted(() => {
      const instance = getCurrentInstance();
      console.log(instance?.proxy?.$el);

      nextTick(() => {
        // count.value = 5;
      });
      // const rect = wrapper!.value!.$el!.getBoundingClientRect();
      // console.log(childRef.value?.update);

      // console.log('onMounted');
      // const styleTag = document.createElement('style');
      // styleTag.setAttributeNode(document.createAttribute('scoped'));
      // styleTag.appendChild(document.createTextNode(css));
      // (instance?.proxy?.$el as HTMLElement).appendChild(styleTag);

      const dialogRef = createComponent(AngularNotificationComponent, {
        environmentInjector,
        elementInjector: injector,
        hostElement: notificationRef.value as Element,
      });

      dialogRef.setInput('text', 'From Vue');

      // document.body.appendChild(dialogRef.location.nativeElement);

      // Register the newly created ref using the `ApplicationRef` instance
      // to include the component view into change detection cycles.
      appRef.attachView(dialogRef.hostView);
    });
    // const styles = require('./styles.module.scss');
    // console.log(styles);
    provide(VUE_STATE, {
      count,
    });

    const backToHome = () => {
      console.log(props.base);

      injector.get(Router).navigateByUrl('/');
    };

    return { count, styles, version, backToHome }; // Expose the styles object to the template
  },
  // mounted: () => {
  //   console.log('mounted');
  // },
  template,
  components: {
    NotificationComponent,
    VueSelect,
  },
  props: {
    base: String,
  },
});

export default VueCounter;
