// setup font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import icons we need
import { 
  faSearch,
  faArrowLeft,
  faCalendarDays
} from '@fortawesome/free-solid-svg-icons'
 
import {
  faXTwitter,
  faGithub,
  faLinkedin,
  faSoundcloud,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

// add icons to the library
library.add(
  // solid icons
  faSearch,
  faArrowLeft,
  faCalendarDays,
  // brand icons
  faXTwitter,
  faGithub,
  faLinkedin,
  faSoundcloud,
  faYoutube,
);

export { FontAwesomeIcon };