/*
 Based off pen by Tiffany Rayside http://codepen.io/tmrDevelops/pen/vOPZBv
 */

var l = document.getElementById('index-canv-left');
var r = document.getElementById('index-canv-right');
var lxt = l.getContext('2d');
var rxt = r.getContext('2d');

var x, y = 0;


var col = function(x, y, r, g, b) {

  rxt.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  rxt.fillRect(x, y, 1,1);

  g+= 190;
  lxt.fillStyle = "rgb(" + g + "," + g + "," + g + ")";
  lxt.fillRect(x, y, 1,1);
};
var R = function(x, y, t) {
  return( Math.floor(202 + 6*Math.cos( (x*x-y*y)/300 + t )) );
};

var G = function(x, y, t) {
  return( Math.floor(62 + 5*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
};

var B = function(x, y, t) {
  return( Math.floor(252 + 8*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
};

var t = 0;

var run = function() {
  for(x=0;x<=35;x++) {
    for(y=0;y<=35;y++) {
      col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
    }
  }
  t = t + 0.070;
  window.requestAnimationFrame(run);
};

run();
