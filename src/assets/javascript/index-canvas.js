/*
 Based off http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
 */


$( document ).ready(function() {

  $(function () {
    if ($('article').hasClass('index')) {

      var canvas = document.getElementById('index-canv');
      var ctx = canvas.getContext('2d');

      //canvas dimensions
      var W = window.innerWidth;
      var H = window.innerHeight;
      if(W < 800){
        W *= 2;
        H *= 2;
        ctx.scale(2,2);
      } else{
        ctx.scale(1,1);
      }
      canvas.width = W;
      canvas.height = H;


      $(window).resize(function(){
        W = window.innerWidth;
        H = window.innerHeight;
        if(W < 800){
          W *= 2;
          H *= 2;
          ctx.scale(2,2);
        } else{
          ctx.scale(1,1);
        }
        canvas.width = W;
        canvas.height = H;
      });

      var mp = 7; //max particles
      var particles = [];
      for(var i = 0; i < mp; i++)
      {
        particles.push({
          x: Math.random()*W, //x-coordinate
          y: Math.random()*H, //y-coordinate
          r: Math.random()+1 + W/1000, //radius
          d: Math.random()*mp, //density
          o: Math.floor(Math.random() * (360 - 1)) // rotation
        })
      }

      function draw()
      {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(202, 106, 255, 0.4)";
        for(var i = 0; i < mp; i++)
        {
          var p = particles[i];
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.scale(p.r/2, p.r/2);
          ctx.rotate(p.o*Math.PI/180);
          ctx.beginPath();
          ctx.rect(-2, -6, 4, 12);
          ctx.fill();
          ctx.restore();
        }
        update();
      }

      var angle = 0;
      function update()
      {
        angle += 0.005;
        for(var i = 0; i < mp; i++)
        {
          var p = particles[i];
          p.y += (Math.cos(angle) + p.r) / 6;
          p.x += Math.sin(angle);
          p.o = p.x * 4;

          if(p.y > H)
          {
            particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d, o: p.o};
          }
        }
      }

      setInterval(draw, 5);
    }
  })
});
