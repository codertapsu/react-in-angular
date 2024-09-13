import { defineComponent } from 'vue';

import template from './vue-child-counter.html';
import { useCounterStore } from '@core/vue';

const VueChildCounter = defineComponent({
  setup: (props) => {
    const counterStore = useCounterStore();
    return {
      counter: counterStore.count,
      increase: counterStore.increase,
    }; // Expose the styles object to the template
  },
  template,
});

export { VueChildCounter };
