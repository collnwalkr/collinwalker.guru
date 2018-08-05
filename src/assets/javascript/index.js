/**
 * Created by collinwalker on 8/31/16.
 */


$( document ).ready(function() {


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

  logo.mouseenter(function(){
    $('.logo-anim-i').each(function(){
      this.beginElement();
    });
  });

  logo.mouseleave(function(){
    $('.logo-anim-o').each(function(){
      this.beginElement();
    });
  });



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
