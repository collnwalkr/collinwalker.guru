/**
 * Created by collinwalker on 8/31/16.
 */


$( document ).ready(function() {


  $(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
      window.location.reload()
    }
  });

  switch(window.location.pathname) {
    case '/':
      setActive('work');
      break;
    case '/about/':
      setActive('about');
      break;
  }

  function setActive(page){
    $('.' + page).addClass('active');
  }

  var logo = $('.logo-svg');
  console.log(logo);

  logo.hover(function(){
    $('.logo-anim')[0].beginElement();
    $('.logo-anim')[1].beginElement();
  });

  $(function () {
    if ($('article').hasClass('index')) {

      var hello_ux      = $('#hello-ux');
      var hello_slack   = $('#hello-slack');
      var hello_seattle = $('#hello-seattle');
      var hello_music   = $('#hello-music');

      hello_ux.hover(
        function () {
          show_image.call(this, 'ux')
        },
        function () {
          remove_image.call(this, 'ux')
        }
      );

      hello_music.hover(
        function () {
          show_image.call(this, 'music')
        },
        function () {
          remove_image.call(this, 'music')
        }
      );

      hello_seattle.hover(
        function () {
          show_image.call(this, 'seattle')
        },
        function () {
          remove_image.call(this, 'seattle')
        }
      );


      hello_slack.hover(
        function () {
          show_image.call(this, 'slack')
        },
        function () {
          remove_image.call(this, 'slack')
        }
      );



      // animate screen transitions
      $(function(){

        // get all of the links
        var a_links = $('.project-contents , .blog-posts').find(' a ');

        // give them handlers
        for( var i = 0; i < a_links.length; i++){
          (function( index ){
            a_links[ i ].addEventListener( 'click', function(e){


              // if the link is valid and not going elsewhere
              if(a_links[index].href && a_links[index].target != '_blank'){

                // prevent default
                e.preventDefault();

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



  function show_image(img) {
    $(this).addClass('hello-hover');
    $('#gif-' + img).removeClass('visibility-hidden');
  }

  function remove_image(img) {
    $(this).removeClass('hello-hover');
    $('#gif-' + img).addClass('visibility-hidden');
  }

  function toggle_focus() {
    $(this).toggleClass('hover');
  }

  function add_focus() {
    $(this).addClass('hover');
  }

  function remove_focus() {
    $(this).removeClass('hover');
  }
});
