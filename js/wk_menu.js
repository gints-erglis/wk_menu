
/**
 * @file
 * Javascript functionality for the esure menu.
 */

(function ($, Drupal, drupalSettings) {
'use strict';

var mobileBreakpoints = [];

function isValidBreakpoint(breakpoint){
    return ($.inArray(breakpoint, mobileBreakpoints) > -1);
}

function getMobileBreakpoints() {
  $('ul.menu').each(function(){
    if($(this).is('[data-breakpoint]')){
      var mobilebreakpoint = "(max-width: "+$(this).attr('data-breakpoint')+"px)";

      //Verify that breakpoint values do not repeat to avoid multiple identical listeners
      if(!isValidBreakpoint(mobilebreakpoint)){
        mobileBreakpoints.push(mobilebreakpoint);
        mediaqueryresponse(mobilebreakpoint);
        window.matchMedia(mobilebreakpoint).addListener(function(){ mediaqueryresponse(mobilebreakpoint); });
      }
    }
  });
}

function mediaqueryresponse(breakpoint){
  $('ul.menu').each(function(){
    if($(this).is('[data-breakpoint]')){
      var dataBreakpoint = "(max-width: "+$(this).attr('data-breakpoint')+"px)";

      // check if ul breakpoint value is the same as listeners
      if(dataBreakpoint === breakpoint) {
        $(this).find('[data-title]').each(function(){
          var $item = $(this).children();

          if (window.matchMedia(breakpoint).matches){
            $item.attr('data-old-title', $item.text());
            $item.text($(this).attr('data-title'));
          }
          else {
            $item.text($item.attr('data-old-title'));
          }
        });
      }
    }
  });

}

Drupal.behaviors.wk_menu = {
  attach: function(context, settings) {

    var menuOverlay = $('#mobile-overlay');
    var overlayClose = $('#mobile-overlay .button-close');
    var menuOrigin = $('.region-sidebar-first .navigation');
    menuOrigin.prepend( '<div id="menu-mobile" class="menu-mobile"></div>' );
    var menuButton = $('#menu-mobile');

    menuOrigin.clone().appendTo(menuOverlay);

    menuButton.click(function(){
      menuOverlay.show();
    });
    overlayClose.click(function(){
      menuOverlay.hide();
    });
    // Verify that the user agent understands media queries.
    if (!window.matchMedia('only screen').matches) {
      return;
    }

    getMobileBreakpoints();
  }
};

}(jQuery, Drupal, drupalSettings));
