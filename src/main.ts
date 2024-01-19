import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';

const pinia = createPinia();

// @ts-ignore
import App from './App.vue';

createApp(App).use(pinia).mount('#app');
