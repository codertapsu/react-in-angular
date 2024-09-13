import { defineComponent } from 'vue';

import template from './vue-select.html';
import { useCounterStore } from '@core/vue';
import { VueChildCounter } from '@components/vue-child-counter/vue-child-counter';

const VueSelect = defineComponent({
  setup: (props) => {
    const counterStore = useCounterStore();
    return {
      counter: counterStore.count,
      increase: counterStore.increase,
    }; // Expose the styles object to the template
  },
  template,
  components: {
    VueChildCounter
  },
});

export { VueSelect };
