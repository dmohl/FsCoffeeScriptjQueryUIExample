((pictureManager) ->
  pictureManager.init = ->
    $gallery = $("#gallery")
    $trash = $("#trash")
    recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off'  
                            title='Recycle this image' 
                            class='ui-icon ui-icon-refresh'>Recycle image</a>"
    trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' 
                         title='Delete this image' 
                         class='ui-icon ui-icon-trash'>Delete image</a>"

    deleteImage = ($item) ->
      $item.fadeOut ->
        $list = if $("ul", $trash).length then $("ul", $trash) else $("<ul class='gallery ui-helper-reset'/>").appendTo $trash
        $item.find("a.ui-icon-trash").remove()
        $item.append(recycle_icon).appendTo($list).fadeIn ->
          $item.animate(width: "48px").find("img").animate height: "36px"

    recycleImage = ($item) ->
      $item.fadeOut ->
        $item.find("a.ui-icon-refresh").remove().end()
          .css("width", "96px").append(trash_icon).find("img")
          .css("height", "72px").end().appendTo($gallery).fadeIn()

    viewLargerImage = ($link) ->
      src = $link.attr "href"
      title = $link.siblings("img").attr "alt"
      $modal = $("img[src$='#{src}']")
      if $modal.length
        $modal.dialog "open"
      else
        img = $("<img alt='#{title}' width='384' height='288' 
               style='display: none; padding: 8px;' />")
               .attr("src", src).appendTo "body"
        setTimeout (->
          img.dialog 
            title: title
            width: 400
            modal: true
        ), 1

    $("li", $gallery).draggable 
      cancel: "a.ui-icon"
      revert: "invalid"
      containment: if $("#demo-frame").length then "#demo-frame" else "document"
      helper: "clone"
      cursor: "move"
    
    $trash.droppable 
      accept: "#gallery > li"
      activeClass: "ui-state-highlight"
      drop: (event, ui) ->
        deleteImage ui.draggable
    
    $gallery.droppable 
      accept: "#trash li"
      activeClass: "custom-state-active"
      drop: (event, ui) ->
        recycleImage ui.draggable
    
    $("ul.gallery > li").click (event) ->
      $item = $(this)
      $target = $(event.target)
      if $target.is "a.ui-icon-trash"
        deleteImage $item
      else if $target.is "a.ui-icon-zoomin"
        viewLargerImage $target
      else recycleImage $item  if $target.is "a.ui-icon-refresh"
      false
    
) window.pictureManager = window.pictureManager or {}