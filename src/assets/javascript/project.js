/**
 * Created by collinwalker on 10/13/16.
 */


$( document ).ready(function() {

  $(function () {
    if ($('article').hasClass('post')) {

      // animate screen transitions
      $(function(){

        // get all of the links
        var a_links = $(' nav, footer ').find(' a ');

        console.log(a_links)
        // give them handlers
        for( var i = 0; i < a_links.length; i++){
          (function( index ){
            a_links[ i ].addEventListener( 'click', function(e){

              // prevent default
              e.preventDefault();

              // if the link is valid
              if(a_links[index].href){

                // add the overlay
                var zoom_overlay = '<div class=\'zoom-overlay\'></div>';
                $(zoom_overlay).appendTo(document.body);

                // fade in overlay
                setTimeout(function(){
                  $(document.body).addClass('zoom-overlay-open transition-overlay');
                }, 100);

                // animate to top of screen
                $("html, body").animate({ scrollTop: $('body').offset().top }, 100);

                // change to next page
                setTimeout(function(){
                  window.location.href = a_links[index].href;
                }, 100);
              }
            });
          })( i );
        }
      });
    }
  });

});
