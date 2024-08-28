import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { useFormStore } from './stores/useFormStore';

const app = createApp(App);

app.use(createPinia());
const formStore = useFormStore();
formStore.initializeStore();

app.mount('#app');
