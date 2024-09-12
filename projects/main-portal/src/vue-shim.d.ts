// src/vue-shim.d.ts
// declare module '*.vue' {
//   import Vue from 'vue';
//   export default Vue;
// }

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: ReturnType<typeof defineComponent>;
  export default component;
}

// declare module '*.scss' {
//   const content: Record<string, string>;
//   export default content;
// }
declare module '*.scss';

declare module '*.html' {
  const value: string;
  export default value;
}
