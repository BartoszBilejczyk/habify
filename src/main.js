import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

import { useFirebase } from './useFirebase';

// vue use
// import { OnClickOutside } from '@vueuse/components'
// https://vueuse.org/core/usepermission/#demo

const app = createApp(App);

app.use(router);

app.mount('#app');
