!function ($) {

  $(function(){

    var $window = $(window)

    // Toggle Sidebar
    $(".toggle-sidebar").click(function() {
        $('.ui-sidebar').toggleClass("col-3 col-1", 1000, "easeOutSine");
        $('.ui-mainbody').toggleClass("col-9 col-11", 1000, "easeOutSine");
        $(".sidebar-label").toggle();
        $('.ui-sidebar [class^="icon"]').toggleClass("h3", 1000, "easeOutSine");
        $('.ui-sidebar img').toggleClass("avatar-lg", 1000, "easeOutSine");
    });

    // Toggle Success
    $(".btn-success").click(function() {
        $(this).toggleClass("btn-success btn-danger", 1000, "easeOutSine");
    });

    // Random Blur
    (function($) {
        $.fn.random = function() {
            var n = this.length;
            var r = Math.floor(n * Math.random());
            return n ? $(this[r]) : $();
        };
    })(jQuery);

    (function iterate() {
        $('#collapse-call img').random().toggleClass("blur-on", 3000, iterate);
    })();

    // Collapse
    $('.collapse-video').on('show.bs.collapse', function () {
      $(".collapse-call").collapse('hide')
    })

    // Timer
    function get_elapsed_time_string(total_seconds) {
      function pretty_time_string(num) {
        return ( num < 10 ? "0" : "" ) + num;
      }

      var hours = Math.floor(total_seconds / 3600);
      total_seconds = total_seconds % 3600;

      var minutes = Math.floor(total_seconds / 60);
      total_seconds = total_seconds % 60;

      var seconds = Math.floor(total_seconds);

      // Pad the minutes and seconds with leading zeros, if required
      hours = pretty_time_string(hours);
      minutes = pretty_time_string(minutes);
      seconds = pretty_time_string(seconds);

      // Compose the string for display
      var currentTimeString = hours + ":" + minutes + ":" + seconds;

      return currentTimeString;
    }

    var elapsed_seconds = 0;
    setInterval(function() {
      elapsed_seconds = elapsed_seconds + 1;
      $('.timer').text(get_elapsed_time_string(elapsed_seconds));
    }, 1000);

    // tooltip
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.has-tooltip').tooltip()
    $('.has-popover').popover()

    // popover
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

})

}(window.jQuery)
