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
} from 'vue';
import * as styles from './styles.module.scss';
import template from './vue-counter.html';
import { ANGULAR_INJECTOR, VUE_STATE } from '@shared/tokens/vue.token';
import { Inject, Injector } from '@angular/core';
import { Router } from '@angular/router';

//   },
//   template: `
//       <div>
//         <p class="contact_us_text">Vue 3.1 Counter: {{ count }}</p>
//         <button @click="count++">Increment</button>
//       </div>
//     `,
// };

const Notification = defineComponent(
  (props) => {
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

    return () => {
      // render function or JSX
      return h('div', `${props.message}/${state.count.value}`);
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

const VueCounter = defineComponent({
  setup: (props) => {
    const injector = inject(ANGULAR_INJECTOR) as Injector;
    // const count = ref(0);
    // const styles = `
    //   .highlighted {
    //     color: red;
    //   }
    // `;
    const count = ref(0);

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

      // console.log('onMounted');
      // const styleTag = document.createElement('style');
      // styleTag.setAttributeNode(document.createAttribute('scoped'));
      // styleTag.appendChild(document.createTextNode(css));
      // (instance?.proxy?.$el as HTMLElement).appendChild(styleTag);
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
    Notification,
  },
  props: {
    base: String,
  },
});

export default VueCounter;
