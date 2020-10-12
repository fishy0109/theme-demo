import inView from 'in-view'

/**
 * InView
 */

class InView {

    constructor() {
        this.init();
    }

    init() {
        // console.log('InView!!!');

        let x =

        new inView('.fade-in-up')
            .on('enter', el => {
                el.classList.add("animated")
            })

        new inView('.slide-in-left')
            .on('enter', el => {
                el.classList.add("animated")
            })
    }
}

export default InView;