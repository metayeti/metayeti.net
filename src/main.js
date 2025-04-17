// global css imports
import './styles/fonts.css'; // font imports
import './styles/metayeti.css'; // main site styles
import './styles/tw.css'; // tailwind styles

// vue imports
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// setup font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/*
import { 
} from '@fortawesome/free-solid-svg-icons'
 */
 
import {
	faFacebook,
	faXTwitter,
	faGithub,
	faLinkedin,
	faRedditAlien,
	faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
	// brands
	faFacebook,
	faXTwitter,
	faGithub,
	faLinkedin,
	faRedditAlien,
	faYoutube
);

// create the app
const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#metayeti-root');