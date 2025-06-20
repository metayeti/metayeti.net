// setup font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import icons we need
import { 
	faSearch,
	faArrowLeft,
	faCalendarDays,
	faClock,
	faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'
 
import {
	faGithub,
	faFacebook,
	faLinkedin,
	faXTwitter,
	faYoutube,
	faSoundcloud,
} from '@fortawesome/free-brands-svg-icons';

// add icons to the library
library.add(
	// solid icons
	faSearch,
	faArrowLeft,
	faCalendarDays,
	faClock,
	faFloppyDisk,
	// brand icons
	faGithub,
	faFacebook,
	faLinkedin,
	faXTwitter,
	faYoutube,
	faSoundcloud,
);

export { FontAwesomeIcon };