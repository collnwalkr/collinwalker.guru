/**
 * Created by collinwalker on 8/31/16.
 */


$( document ).ready(function() {

  var hello_ux    = $('#hello-ux');
  var hello_slack = $('#hello-slack');
  var hello_sleep = $('#hello-sleep');

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
