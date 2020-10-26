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

import Slick from './app/slick';
new Slick();

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.nca = {
    attach: function (context, settings) {
      // Document.ready function
      $(document).ready(function() {
        $('.bnr-gw2-search #srch-sel-cont').click(function() {
          searchArrowClick();
          return false;
        });

        $('.bnr-gw2-search .srch-sel-site li, #gw-mobile-menu-wrap .srch-sel-site li').click(function() {
          searchSelClick($(this));
          return false;
        });

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


function searchSelClick(listitem) {
  $('.srch-sel-site li').removeClass('srch-selected');
  if (listitem.hasClass('srch-sel-anu')) {
    $('#qt').attr('placeholder', 'Search ANU web, staff & maps');
    $('#qt1').attr('placeholder', 'Search ANU web, staff & maps');
    $('.srch-sel-anu').addClass('srch-selected');
    $('#qt').attr('name', 'q');
    $('#qt1').attr('name', 'q');
    $('.srch-dn').attr('name', 'c-dnavs');
    $('.srch-q').attr('name', 'c-q');
    $('#qt').attr('data-name', 'q');
    $('#qt1').attr('data-name', 'q');
    $('.srch-dn').attr('data-name', 'c-dnavs');
    $('.srch-q').attr('data-name', 'c-q');
    useThisHidden = 'srch-sel-gsa-hidden';
    $('#bnr-gwy #SearchForm').attr('action', '//find.anu.edu.au/search');
    $('.bnr-gw2-search #SearchFormMini').attr('action', '//find.anu.edu.au/search');
    $('#gw-mobile-menu-wrap #SearchForm1').attr('action', '//find.anu.edu.au/search');
    $('#bnr-gwy #SearchForm').attr('method', 'get');
    $('.bnr-gw2-search #SearchFormMini').attr('method', 'get');
    $('#gw-mobile-menu-wrap #SearchForm1').attr('method', 'get');
  } else if (listitem.hasClass('srch-sel-currentsite')) {
    searchname = $('#srch-sel-currentsite-bnr').attr('data-anu-searchname');
    $('#qt').attr('placeholder', 'Search current site');
    $('#qt1').attr('placeholder', 'Search current site');
    $('.srch-sel-currentsite').addClass('srch-selected');
    $('#qt').attr('name', 'as_q');
    $('#qt1').attr('name', 'as_q');
    $('.srch-dn').attr('name', 'dnavs');
    $('.srch-q').attr('name', 'q');
    $('#qt').attr('data-name', 'as_q');
    $('#qt1').attr('data-name', 'as_q');
    $('.srch-dn').attr('data-name', 'dnavs');
    $('.srch-q').attr('data-name', 'q');
    useThisHidden = 'srch-sel-gsa-hidden';
    $('#bnr-gwy #SearchForm').attr('action', '//find.anu.edu.au/search');
    $('.bnr-gw2-search #SearchFormMini').attr('action', '//find.anu.edu.au/search');
    $('#gw-mobile-menu-wrap #SearchForm1').attr('action', '//find.anu.edu.au/search');
    $('#bnr-gwy #SearchForm').attr('method', 'get');
    $('.bnr-gw2-search #SearchFormMini').attr('method', 'get');
    $('#gw-mobile-menu-wrap #SearchForm1').attr('method', 'get');
  } else {
    s_action = listitem.attr('data-anu-searchaction');
    s_q = listitem.attr('data-anu-searchq');
    s_ph = listitem.attr('data-anu-searchplaceholder');
    s_meth = listitem.attr('data-anu-searchmethod');
    useThisHidden = listitem.attr('data-anu-searchextrahidden');
    $('#qt').attr('placeholder', s_ph);
    $('#qt1').attr('placeholder', s_ph);
    $('#qt').attr('name', s_q);
    $('#qt1').attr('name', s_q);
    $('#bnr-gwy #SearchForm').attr('action', s_action);
    $('.bnr-gw2-search #SearchFormMini').attr('action', s_action);
    $('#gw-mobile-menu-wrap #SearchForm1').attr('action', s_action);
    if (s_meth == 'post') {
      $('#bnr-gwy #SearchForm').attr('method', 'post');
      $('.bnr-gw2-search #SearchFormMini').attr('method', 'post');
      $('#gw-mobile-menu-wrap #SearchForm1').attr('method', 'post');
    } else {
      $('#bnr-gwy #SearchForm').attr('method', 'get');
      $('.bnr-gw2-search #SearchFormMini').attr('method', 'get');
      $('#gw-mobile-menu-wrap #SearchForm1').attr('method', 'get');
    }
  }
  $('#bnr-gwy #SearchForm input[type=hidden], .bnr-gw2-search #SearchFormMini input[type=hidden], #gw-mobile-menu-wrap #SearchForm1 input[type=hidden]').each(function() {
    var inputHidden = $(this);
    if (inputHidden.hasClass(useThisHidden)) {
      if (inputHidden.attr('data-name')) {
        inputHidden.attr('name', inputHidden.attr('data-name'));
      }
    } else {
      if (inputHidden.attr('name')) {
        inputHidden.attr('data-name', inputHidden.attr('name'));
        inputHidden.attr('name', '');
      }
    }
  });
  $('#gw-mobile-menu-wrap .srch-sel-site, .bnr-gw2-search  .srch-sel-site').slideUp('fast');
  $('#srch-sel-arrow').attr('src', '//style.anu.edu.au/_anu/4/images/buttons/arrow-down-black.png');
  $('#srch-sel-arrow1').attr('src', '//style.anu.edu.au/_anu/4/images/buttons/arrow-down-black.png');
}

function searchArrowClick() {
  if ($('.srch-sel-site').css('display') == 'none') {
    $('.srch-sel-site').slideDown('fast');
    $('.srch-sel-site').css('display', 'block');
    $('#srch-sel-arrow1').attr('src', '//style.anu.edu.au/_anu/4/images/buttons/arrow-up-black.png');
    $('#srch-sel-arrow').attr('src', '//style.anu.edu.au/_anu/4/images/buttons/arrow-up-black.png');
  } else {
    $('.srch-sel-site').slideUp('fast');
    $('#srch-sel-arrow1').attr('src', '//style.anu.edu.au/_anu/4/images/buttons/arrow-down-black.png');
    $('#srch-sel-arrow').attr('src', '//style.anu.edu.au/_anu/4/images/buttons/arrow-down-black.png');
  }
}

$('.view-id-locations input[type=checkbox]').click(function() {
  alert('clicked');

});

function checkInput(theinput, themessage) {
  elem = document.getElementById(theinput);
  if (elem) {
    oldelem = elem.value;
    elem.value = elem.value.replace(/^\s+|\s+$/g, '');
    if (elem.value == "" || elem.value == elem.defaultValue) {
      clearInput(elem);
      alert(themessage);
      elem.focus()
      return false;
    }
    elem.value = oldelem;
    setCookie('anuSearch', getCheckedValue('stype'), expdate, '/', null);
  }
}

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

