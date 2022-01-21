(function() {
    "use strict";

    // custom scrollbar

    $("html").niceScroll({styler:"fb",cursorcolor:"#f1f1f1", cursorwidth: '4', cursorborderradius: '10px', background: '#ff4f57FFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});

    $(".scrollbar1").niceScroll({styler:"fb",cursorcolor:"#f1f1f1", cursorwidth: '0', cursorborderradius: '0',autohidemode: 'false', background: '#ff4f57FFF', spacebarenabled:false, cursorborder: '0'});

	
	
    $(".scrollbar1").getNiceScroll();
    if ($('body').hasClass('scrollbar1-collapsed')) {
        $(".scrollbar1").getNiceScroll().hide();
    }

})(jQuery);

(function() {
    "use strict";

    // custom scrollbar

    $("html").niceScroll({styler:"fb",cursorcolor:"#ff4f57", cursorwidth: '4', cursorborderradius: '10px', background: '#ff4f57FFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000'});

    $(".scrollbar1").niceScroll({styler:"fb",cursorcolor:"#ff4f57", cursorwidth: '0', cursorborderradius: '0',autohidemode: 'false', background: '#ff4f57FFF', spacebarenabled:false, cursorborder: '0'});

	
	
    $(".scrollbar1").getNiceScroll();
    if ($('nav.gn-menu-wrapper').hasClass('scrollbar1-collapsed')) {
        $(".scrollbar1").getNiceScroll().hide();
    }

})(jQuery);

                     
     
  