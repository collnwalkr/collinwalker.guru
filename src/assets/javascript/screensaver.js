/**
 * Born out of inspiration from Hum Creative: http://humcreative.com/
 *
 */

$(document).ready( function($) {


  // GET YT API
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // ONLY WORK ON DESKTOP
  var isMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Initialize
  function initScreenSaver(){

    if (isMobile) {
      clearTimeout(window.screen_saver_timer);
      return;
    }
    else{
      startScreenSaver();
    }
  }

  // Restart
  function restartScreenSaverTimer(){
    $('#screen-saver-player').remove();
    $(document.body).removeClass('zoom-overlay-open');
    $('div.video-overlay').remove();
    setTimeout(function(){
      $('div.zoom-overlay.overlay-dark').remove();
    }, 300);

    clearTimeout(window.screen_saver_timer);
    window.screen_saver_timer = setTimeout(initScreenSaver,time_to_wait);
  }

  if (!isMobile) {
    var time_to_wait = 25000;
    window.screen_saver_timer = setTimeout(initScreenSaver,time_to_wait);
  } else {
    clearTimeout(window.screen_saver_timer);
  }

  // MOUSEMOVE OR SCROLL RESETS
  $(window).mousemove(restartScreenSaverTimer);
  $(window).scroll(restartScreenSaverTimer);
  $(window).click(restartScreenSaverTimer);

});


function startScreenSaver(){
  var zoom_overlay = '<div class=\'zoom-overlay overlay-dark\'></div>'
  var iframe_vid = '<div id="screen-saver-player"></div>'
  var vid_overlay = '<div class="video-overlay"></div>'

  $(zoom_overlay).appendTo(document.body);
  $(vid_overlay).appendTo(document.body);
  setTimeout(function(){
    $(document.body).addClass('zoom-overlay-open');
    $(iframe_vid).appendTo(document.body);
    setUpYT();
  }, 300);

}


function setUpYT(){

  var player;

  player = new YT.Player('screen-saver-player', {
    height: '390',
    width: '640',
    playerVars: { 'autoplay': 1, 'controls': 0 , 'showinfo':0, 'loop':1},
    videoId: 'MKqrLGFoK9E',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

  function onPlayerStateChange(event){
    if (event.data === YT.PlayerState.ENDED) {
      player.playVideo();
    }
  }
  function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
  }
}
