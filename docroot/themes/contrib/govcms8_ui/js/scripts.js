!function(t,i,o){"use strict";i.behaviors.govcmsui={attach:function(i,o){"function"==typeof tooltip&&(t("main.container [title]").each(function(){t(this).parents(".sf-dump, .kint").length||(t(this).attr("data-toggle","tooltip"),t(this).attr("data-placement","top"))}),t('[data-toggle="tooltip"]').tooltip())}}}(jQuery,Drupal,drupalSettings);