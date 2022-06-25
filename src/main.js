import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

// import useFirebase from './use-firebase';

const app = createApp(App);

app.use(router);

app.mount('#app');
