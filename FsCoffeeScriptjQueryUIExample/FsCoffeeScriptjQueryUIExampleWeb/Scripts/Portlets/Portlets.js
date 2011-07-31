(function() {
  (function(portlets) {
    return portlets.init = function() {
      $(".column").sortable({
        connectWith: ".column"
      }).disableSelection();
      $(".portlet").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all").find(".portlet-header").addClass("ui-widget-header ui-corner-all").prepend("<span class='ui-icon ui-icon-minusthick'></span>").end().find(".portlet-content");
      return $(".portlet-header .ui-icon").click(function() {
        $(this).toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
        return $(this).parents(".portlet:first").find(".portlet-content").toggle();
      });
    };
  })(window.portlets = window.portlets || {});
}).call(this);
