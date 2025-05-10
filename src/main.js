// global css imports
import './styles/fonts.css'; // font imports
import './styles/metayeti.scss'; // main site styles
import './styles/tw.css'; // tailwind styles

// vue imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// import font-awesome
import { FontAwesomeIcon } from './plugins/fontawesome';

// create the app
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#metayeti-root');