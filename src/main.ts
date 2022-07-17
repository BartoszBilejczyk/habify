import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { i18n } from './i18n';
import { useFirebase } from './composables/useFirebase';
import Vue3Lottie from 'vue3-lottie';

// vue use
// import { OnClickOutside } from '@vueuse/components'
// https://vueuse.org/core/usepermission/#demo

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(Vue3Lottie, { name: 'LottieAnimation' });

app.mount('#app');
