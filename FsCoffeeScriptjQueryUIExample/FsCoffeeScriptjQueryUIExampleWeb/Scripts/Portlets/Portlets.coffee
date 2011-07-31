((portlets) -> 
  portlets.init = ->  
    $(".column").sortable(connectWith: ".column").disableSelection()

    $(".portlet")
      .addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
      .find(".portlet-header").addClass("ui-widget-header ui-corner-all")
      .prepend("<span class='ui-icon ui-icon-minusthick'></span>")
      .end().find ".portlet-content"

    $(".portlet-header .ui-icon").click -> 
      $(this).toggleClass("ui-icon-minusthick").toggleClass "ui-icon-plusthick"
      $(this).parents(".portlet:first").find(".portlet-content").toggle()
) window.portlets = window.portlets or {}

