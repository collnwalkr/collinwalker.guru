/*
 Based off http://thecodeplayer.com/walkthrough/html5-canvas-snow-effect
 */


$( document ).ready(function() {

  $(function () {
    if ($('article').hasClass('index')) {

      var canvas = document.getElementById('index-canv');
      var ctx = canvas.getContext('2d');

      //canvas dimensions
      let H = $('article').height() * 2;
      let W = $('article').width() * 2;
      ctx.scale(2,2);
      canvas.width = W;
      canvas.height = H;


      $(window).resize(function(){
        H = $('article').height() * 2;
        W = $('article').width() * 2;
        ctx.scale(2,2);
        canvas.width = W;
        canvas.height = H;
      });

      var mp = 6; //max particles
      var particles = [];
      for(var i = 0; i < mp; i++) {
        particles.push({
          x: Math.random()*W, //x-coordinate
          y: (i+1)*H/mp, //y-coordinate
          r: Math.random()+1 + W/1000, //radius
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
          p.y += (Math.cos(angle) + p.r) / 8;
          p.x += Math.sin(angle);
          p.o = p.x * 4;

          if(p.y > H)
          {
            particles[i] = {x: Math.random()*W, y: -10, r: p.r, o: p.o};
          }
        }
      }

      setInterval(draw, 5);
    }
  })
});
