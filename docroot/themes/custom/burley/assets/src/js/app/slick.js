import slick from 'slick-carousel'

export default class Slick {
  constructor() {
    this.init();
  }

  init() {
    $('.slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      infinite: true,
      speed: 600,
      autoplay: true,
      autoplaySpeed: 6000
    });

    $('.gallery-slider').slick({
      mobileFirst: true,
      dots: true,
      infinite: true,
      centerMode: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerPadding: '0px',
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerPadding: '0px'
          }
        }, {
          breakpoint: 576,
          settings: {
            centerPadding: '0',
            slidesToShow: 1
          }
        }, {
          breakpoint: 320,
          settings: {
            centerPadding: '0',
            slidesToShow: 1
          }
        }]
    });

    $('#feature-slider .view-id-scholars .view-content').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
    });

    $('.slick-prev').append('<i class="fas fa-chevron-left"></i>');
    $('.slick-next').append('<i class="fas fa-chevron-right"></i>');
  }
}