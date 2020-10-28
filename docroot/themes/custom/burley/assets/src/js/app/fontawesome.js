FontAwesomeConfig = {
  keepOriginalSource: false,
  searchPseudoElements: true
}

import {library, dom} from '@fortawesome/fontawesome-svg-core'

import {
  faInstagram,
  faFacebookF,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

import {

} from '@fortawesome/pro-regular-svg-icons'

import {

} from '@fortawesome/pro-solid-svg-icons'

import {
  faSearch as falSearch
} from '@fortawesome/pro-light-svg-icons'

export default class FontAwesome {
  constructor() {

    library.add(

      // free-brands-svg-icons
      faInstagram,
      faFacebookF,
      faTwitter,

      // pro-regular-svg-icons


      // pro-solid-svg-icons


      // pro-light-svg-icons
      falSearch
    );

    dom.watch();

    this.inserted()
  }

  inserted() {
    // Anything extra to bind or insert manually.
  }
}
