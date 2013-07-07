// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

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

    // Disable certain links in docs
    $('[href=#]').click(function (e) {
      e.preventDefault()
    })

    // back to top
    setTimeout(function () {
      $('.bs-sidebar').affix({
        offset: {
          top: function () { return $window.width() <= 980 ? 290 : 210 }
        , bottom: 270
        }
      })
    }, 100)

    setTimeout(function () {
      $('.bs-top').affix()
    }, 100)

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.has-tooltip').tooltip()
    $('.has-popover').popover()

    $('.bs-docs-navbar').tooltip({
      selector: "a[data-toggle=tooltip]",
      container: ".bs-docs-navbar .nav"
    })

    // popover demo
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('.bs-docs-carousel-example').carousel()

    // javascript build logic
    var inputsComponent = $("#less input")
      , inputsPlugin = $("#plugins input")
      , inputsVariables = $("#less-variables input")

    // toggle all plugin checkboxes
    $('#less .toggle').on('click', function (e) {
      e.preventDefault()
      inputsComponent.prop('checked', !inputsComponent.is(':checked'))
    })

    $('#plugins .toggle').on('click', function (e) {
      e.preventDefault()
      inputsPlugin.prop('checked', !inputsPlugin.is(':checked'))
    })

    $('#less-variables .toggle').on('click', function (e) {
      e.preventDefault()
      inputsVariables.val('')
    })

    // request built javascript
    $('.bs-customize-download .btn').on('click', function (e) {
      e.preventDefault()

      var css = $("#less input:checked")
            .map(function () { return this.value })
            .toArray()
        , js = $("#plugins input:checked")
            .map(function () { return this.value })
            .toArray()
        , vars = {}
        , img = ['glyphicons-halflings.png', 'glyphicons-halflings-white.png']

      $("#less-variables input")
        .each(function () {
          $(this).val() && (vars[ $(this).prev().text() ] = $(this).val())
      })

      $.ajax({
        type: 'POST'
      , url: /localhost/.test(window.location) ? 'http://localhost:9001' : 'http://bootstrap.herokuapp.com'
      , dataType: 'jsonpi'
      , params: {
          js: js
        , css: css
        , vars: vars
        , img: img
      }
      })
    })
  })

// Modified from the original jsonpi https://github.com/benvinegar/jquery-jsonpi
$.ajaxTransport('jsonpi', function(opts, originalOptions, jqXHR) {
  var url = opts.url;

  return {
    send: function(_, completeCallback) {
      var name = 'jQuery_iframe_' + jQuery.now()
        , iframe, form

      iframe = $('<iframe>')
        .attr('name', name)
        .appendTo('head')

      form = $('<form>')
        .attr('method', opts.type) // GET or POST
        .attr('action', url)
        .attr('target', name)

      $.each(opts.params, function(k, v) {

        $('<input>')
          .attr('type', 'hidden')
          .attr('name', k)
          .attr('value', typeof v == 'string' ? v : JSON.stringify(v))
          .appendTo(form)
      })

      form.appendTo('body').submit()
    }
  }
})

}(window.jQuery)
