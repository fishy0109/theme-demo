import modaal from 'modaal'

export default class Modaal {
  constructor() {
    this.init();
  }

  init() {

    // inline Modal
    $('.modaal-inline-trigger').modaal();
  }
}