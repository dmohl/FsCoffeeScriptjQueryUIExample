(function() {
  var Slider;
  Slider = (function() {
    function Slider() {
      $('#master').slider({
        value: 60,
        orientation: "horizontal",
        range: "min",
        animate: true
      });
      $('#eq > span').each(function() {
        var value;
        value = parseInt($(this).text(), 10);
        return $(this).empty().slider({
          value: value,
          range: "min",
          animate: true,
          orientation: "vertical"
        });
      });
    }
    return Slider;
  })();
  window.Slider = new Slider();
}).call(this);
