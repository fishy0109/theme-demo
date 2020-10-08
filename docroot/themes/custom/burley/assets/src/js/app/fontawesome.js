import {library, dom, icon} from '@fortawesome/fontawesome-svg-core'
import {faTwitter, faFacebookSquare, faLinkedin, faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faMapMarker, faCalendar, faEnvelope, faMicrophone, faShare, faQuoteLeft,
  faRss, faListUl, faTh, faTimesCircle, faBars, faSearch, faAngleUp, faPrint,
  faChevronLeft, faChevronRight, faBell, faInfoCircle, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

export default class FontAwesome {
  constructor() {
    // free-brands-svg-icons
    library.add(faTwitter, faFacebookSquare, faLinkedin, faInstagram)

    // free-solid-svg-icons
    library.add(faBell, faInfoCircle, faExclamationTriangle, faMapMarker,
      faCalendar, faEnvelope, faMicrophone, faShare, faQuoteLeft, faRss,
      faListUl, faTh, faTimesCircle, faBars, faSearch, faAngleUp, faPrint,
      faChevronLeft, faChevronRight)

    dom.watch();
  }
}