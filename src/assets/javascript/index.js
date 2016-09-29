/**
 * Created by collinwalker on 8/31/16.
 */


$( document ).ready(function() {

  var hello_ux    = $('#hello-ux');
  var hello_slack = $('#hello-slack');
  var hello_sleep = $('#hello-sleep');

  var projects = $('.project');
  projects.each(function(i, obj){

    // IF not mobile
    if (! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $(obj).bind('click', function (e) {
        toggle_focus.call(obj);
      });
      $(obj).bind('mouseenter', function(e){
        add_focus.call(obj);
      });
      $(obj).bind('mouseleave', function(e){
        remove_focus.call(obj);
      });
    }

    // ELSE if mobile
    else{
      $(obj).bind('touchstart', function (e) {
        toggle_focus.call(obj);
      });

      $(obj).bind('mouseleave', function(e){
        remove_focus.call(obj);
      });
    }


  });

  hello_ux.hover(
    function() {show_image.call(this, 'ux')},
    function() {remove_image.call(this, 'ux')}
  );


  hello_slack.hover(
    function() {show_image.call(this, 'slack')},
    function() {remove_image.call(this, 'slack')}
  );


  hello_sleep.hover(
    function() {show_image.call(this, 'sleep')},
    function() {remove_image.call(this, 'sleep')}
  );

});


function show_image(img){
  $('#gif-' + img).removeClass('visibility-hidden');
}

function remove_image(img){
  $('#gif-' + img).addClass('visibility-hidden');
}

function toggle_focus(){
  $(this).toggleClass('hover');
}

function add_focus(){
  $(this).addClass('hover');
}

function remove_focus(){
  $(this).removeClass('hover');
}
