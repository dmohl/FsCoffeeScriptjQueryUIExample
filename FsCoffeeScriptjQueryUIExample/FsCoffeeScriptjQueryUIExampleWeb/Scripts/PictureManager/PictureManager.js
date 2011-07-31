(function() {
  (function(pictureManager) {
    return pictureManager.init = function() {
      var $gallery, $trash, deleteImage, recycleImage, recycle_icon, trash_icon, viewLargerImage;
      $gallery = $("#gallery");
      $trash = $("#trash");
      recycle_icon = "<a href='link/to/recycle/script/when/we/have/js/off'                              title='Recycle this image'                             class='ui-icon ui-icon-refresh'>Recycle image</a>";
      trash_icon = "<a href='link/to/trash/script/when/we/have/js/off'                          title='Delete this image'                          class='ui-icon ui-icon-trash'>Delete image</a>";
      deleteImage = function($item) {
        return $item.fadeOut(function() {
          var $list;
          $list = $("ul", $trash).length ? $("ul", $trash) : $("<ul class='gallery ui-helper-reset'/>").appendTo($trash);
          $item.find("a.ui-icon-trash").remove();
          return $item.append(recycle_icon).appendTo($list).fadeIn(function() {
            return $item.animate({
              width: "48px"
            }).find("img").animate({
              height: "36px"
            });
          });
        });
      };
      recycleImage = function($item) {
        return $item.fadeOut(function() {
          return $item.find("a.ui-icon-refresh").remove().end().css("width", "96px").append(trash_icon).find("img").css("height", "72px").end().appendTo($gallery).fadeIn();
        });
      };
      viewLargerImage = function($link) {
        var $modal, img, src, title;
        src = $link.attr("href");
        title = $link.siblings("img").attr("alt");
        $modal = $("img[src$='" + src + "']");
        if ($modal.length) {
          return $modal.dialog("open");
        } else {
          img = $("<img alt='" + title + "' width='384' height='288'                style='display: none; padding: 8px;' />").attr("src", src).appendTo("body");
          return setTimeout((function() {
            return img.dialog({
              title: title,
              width: 400,
              modal: true
            });
          }), 1);
        }
      };
      $("li", $gallery).draggable({
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: $("#demo-frame").length ? "#demo-frame" : "document",
        helper: "clone",
        cursor: "move"
      });
      $trash.droppable({
        accept: "#gallery > li",
        activeClass: "ui-state-highlight",
        drop: function(event, ui) {
          return deleteImage(ui.draggable);
        }
      });
      $gallery.droppable({
        accept: "#trash li",
        activeClass: "custom-state-active",
        drop: function(event, ui) {
          return recycleImage(ui.draggable);
        }
      });
      return $("ul.gallery > li").click(function(event) {
        var $item, $target;
        $item = $(this);
        $target = $(event.target);
        if ($target.is("a.ui-icon-trash")) {
          deleteImage($item);
        } else if ($target.is("a.ui-icon-zoomin")) {
          viewLargerImage($target);
        } else {
          if ($target.is("a.ui-icon-refresh")) {
            recycleImage($item);
          }
        }
        return false;
      });
    };
  })(window.pictureManager = window.pictureManager || {});
}).call(this);
