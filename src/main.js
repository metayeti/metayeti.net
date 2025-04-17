import './styles/fonts.css'; // font imports
import './styles/metayeti.css'; // main site styles
import './styles/tw.css'; // tailwind styles

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const website = createApp(App);
website.use(router);
website.mount('#metayeti-root');