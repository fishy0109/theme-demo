/**
 * @file
 * Global utilities.
 *
 */
import '@/scss/app.scss'

import $ from 'jquery'
window.$ = window.JQuery = $;

import(
    '@/js/app/fontawesome'
    ).then(module => {
  new module.default()
});

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.nca = {
    attach: function (context, settings) {
      // Document.ready function
      $(document).ready(function() {
        $(".field--name-field-components").append('<div class="carousel-counter"><p class="carousel-status"></p></div>');


      });
    }
  };

})(jQuery, Drupal);

/**
 * Mobile menu
 */

$(window).on('resize', () => {
  let width = document.documentElement.clientWidth;
  let done = document.body.classList.contains('mm-once');
  document.body.classList.add('mm-once')

  import(
    '@/js/app/mmenu'
    ).then(module => {
    new module.default()
  })
});

$(window).resize();

/**
 * Move to top
 */

$(window).scroll(function() {
  if ($(this).scrollTop() != 0) {
    $("#to-top").fadeIn();
  } else {
    $("#to-top").fadeOut();
  }
});

$("#to-top").click(function (e) {
  e.preventDefault();
  $("body,html").animate({scrollTop: 0}, 500);
});

//Main nav hover showing second level menu items
const $dropdown = $("#main-navigation .dropdown");
const $dropdownToggle = $("#main-navigation .dropdown-toggle");
const $dropdownMenu = $("#main-navigation .dropdown-menu");
const showClass = "show";

$(window).on("load resize", function() {
  if (this.matchMedia("(min-width: 768px)").matches) {
    $dropdown.hover(
      function() {
        const $this = $(this);
        $this.addClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "true");
        $this.find($dropdownMenu).addClass(showClass);
      },
      function() {
        const $this = $(this);
        $this.removeClass(showClass);
        $this.find($dropdownToggle).attr("aria-expanded", "false");
        $this.find($dropdownMenu).removeClass(showClass);
      }
    );
    $dropdown.click(function () {
      const $this = $(this);
      $this.removeClass(showClass);
    });
  } else {
    $dropdown.off("mouseenter mouseleave");
  }
});

/* search form functions */
var searchInput = $('.header-search-form .form-item input');
var searchButton = $('.search-trigger');
var searchForm = $('.header-site-search-content-wrapper');
var searchInputBtn = $('.header-site-search-content-wrapper .js-form-submit');

// Open search form helper function.
var searchOpen = function(searchForm, searchInput) {
  $(searchForm).addClass('open');
  /*$(this).attr('aria-expanded', 'true');*/

  // Wait for the width to transition before setting focus.
  setTimeout(function() {
    $(searchInput).focus();
  }, 250);
};

// Close search form helper function.
var searchClose = function(focusItem, searchForm) {
  $(searchForm).removeClass('open');
  //$(searchButton).attr('aria-expanded', 'false');
  $(focusItem).focus();
};

// If they click the search icon, open the form.
$(searchButton).on('click', function () {
  searchOpen(searchForm, searchInput);
  return false;
});


// If they click the search button, but haven't entered keywords, close it.
$(searchInputBtn).click(function (){
  if (!$(searchInput).val()) {
    searchClose(searchButton, searchForm);
    return false;
  }
});

// If they click outside of the search form when it's open, close it.
$(document).click(function(e) {
  if( searchForm.hasClass('open') && searchForm.has(e.target).length === 0) {
    searchClose(searchButton, searchForm);
  }
});

// If they the search form is focused when not active, open it.
$(searchInput).focus(function() {
  if(!searchForm.hasClass('open')) {
    searchOpen(searchForm, searchInput);
  }
});

// If they tab or esc without entering keywords, close it.
$(searchForm).keydown(function(e) {
  var keyCode = e.keyCode || e.which;

  if (!$(searchInput).val() && (keyCode == 9 || keyCode == 27)) {
    searchClose(searchButton, searchForm);
  }
});

//Flickity

let Flickity = require('flickity');

let flkty = new Flickity( '.field--name-field-components', {
  // options...
  autoPlay: true,
  wrapAround: true
});


function updateStatus() {
  let slideNumber = flkty.selectedIndex + 1;
  $('.carousel-status').html('<strong>' + slideNumber + '</strong> of ' + flkty.slides.length);
  console.log(slideNumber)
}
updateStatus();

flkty.on( 'select', updateStatus );

new Flickity( '.carousel', {
  // options...
  freeScroll: true,
  wrapAround: true
});

