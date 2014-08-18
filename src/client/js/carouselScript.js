  $('.carousel').carousel({
                interval: 5000,
                pause: "hover",
                wrap: true
            })
            .on('click', '.carousel-control', handle_nav);

  var handle_nav = function(e) {
        e.preventDefault();
        var nav = $(this);
        nav.parents('.carousel').carousel(nav.data('slide'));
  }