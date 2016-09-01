/*
 Based off fix from Dave Molinero: http://www.davemolinero.com/2015/09/21/quick-fix-for-the-100vh-mobile-adress-bar-bug/
 */
$( document ).ready(function() {
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var h = $('.full-height').height();
    $('.full-height').height(h);

    var r = $('.half-height').height();
    $('.half-height').height(r);
  }
});
