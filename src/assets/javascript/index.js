/**
 * Created by collinwalker on 8/31/16.
 */


$( document ).ready(function() {

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

    }

  });


  function show_image(img) {
    $('#gif-' + img).removeClass('visibility-hidden');
    $('#index-right').css('background-color','#FAFAFA');
  }

  function remove_image(img) {
    $('#gif-' + img).addClass('visibility-hidden');
    $('#index-right').css('background-color','white');
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
