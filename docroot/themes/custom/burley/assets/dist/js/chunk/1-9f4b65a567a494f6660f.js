(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./assets/src/js/app/mmenu.js":
/*!************************************!*\
  !*** ./assets/src/js/app/mmenu.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mmenu; });
/* harmony import */ var _scss_dynamic_menu_mobile_theme_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/scss/dynamic/menu-mobile-theme.scss */ "./assets/src/scss/dynamic/menu-mobile-theme.scss");
/* harmony import */ var _scss_dynamic_menu_mobile_theme_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_dynamic_menu_mobile_theme_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Site globals.
 */

var Mmenu = /*#__PURE__*/function () {
  /**
   * Init the mobile menu
   */
  function Mmenu() {
    var _this = this;

    _classCallCheck(this, Mmenu);

    this.icon = jquery__WEBPACK_IMPORTED_MODULE_1___default()('#mobile-menu-button');
    this.nav = jquery__WEBPACK_IMPORTED_MODULE_1___default()('#mobile-menu');
    this.nav[0].removeAttribute('style');
    this.nav[0].removeAttribute('hidden');
    __webpack_require__.e(/*! import() | mmenu */ "vendors~mmenu").then(__webpack_require__.t.bind(null, /*! jquery.mmenu/dist/jquery.mmenu.all.js */ "./node_modules/jquery.mmenu/dist/jquery.mmenu.all.js", 7)).then(function () {
      _this.bind();
    });
  }

  _createClass(Mmenu, [{
    key: "bind",
    value: function bind() {
      var _this2 = this;

      var config = {
        extensions: {
          "all": ["position-right", "pagedim-black"],
          "(min-width: 600px)": ["listview-large"]
        },
        setSelected: true,
        lazySubmenus: true,
        offCanvas: {
          position: "bottom",
          zposition: "front"
        },
        keyboardNavigation: {
          enable: true,
          enhance: true
        },
        navbars: [{
          position: "top",
          content: ["searchfield"]
        }],
        searchfield: {
          showSubPanels: false,
          search: false
        }
      };
      var options = {
        offCanvas: {
          page: {
            noSelector: ['#toolbar-administration']
          }
        },
        searchfield: {
          form: {
            method: 'get',
            action: '/search'
          },
          input: {
            name: 'keywords'
          },
          submit: true
        }
      };
      this.nav.mmenu(config, options);
      this.api = this.nav.data('mmenu');
      this.icon.on('click', function () {
        _this2.api.open();
      });
      this.api.bind('open:finish', function () {
        setTimeout(function () {
          _this2.icon.addClass('is-active');
        }, 100);
      });
      this.api.bind('close:finish', function () {
        setTimeout(function () {
          _this2.icon.removeClass('is-active');
        }, 100);
      });
    }
  }]);

  return Mmenu;
}();



/***/ }),

/***/ "./assets/src/scss/dynamic/menu-mobile-theme.scss":
/*!********************************************************!*\
  !*** ./assets/src/scss/dynamic/menu-mobile-theme.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=1-9f4b65a567a494f6660f.js.map