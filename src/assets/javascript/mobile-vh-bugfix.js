/*
 Based off fix from Dave Molinero: http://www.davemolinero.com/2015/09/21/quick-fix-for-the-100vh-mobile-adress-bar-bug/
 */
$( document ).ready(function() {

  //if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  //  set_height();
  //}


});

function set_height(){

  var h = $(window).height();
  $('.full-height').height(h);

  var r = $(window).height() / 2;
  $('.half-height').height(r);
}
