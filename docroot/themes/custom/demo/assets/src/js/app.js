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
        $(".js-form-type-checkbox").append("<div class='control__indicator'></div>");
        $(".js-form-type-checkbox").attr("tabindex", "0");
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