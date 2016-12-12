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
      canvas.width = W;
      canvas.height = H;

      $(window).resize(function(){
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
      });

      //snowflake particles
      var mp = 10; //max particles
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

      //Lets draw the flakes
      function draw()
      {
        ctx.clearRect(0, 0, W, H);

        ctx.fillStyle = "rgba(202, 106, 255, 0.5)";
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

      //Function to move the snowflakes
      //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
      var angle = 0;
      function update()
      {
        angle += 0.005;
        for(var i = 0; i < mp; i++)
        {
          var p = particles[i];
          p.y += (Math.cos(angle+p.d) + 1 + p.r) / 4;
          p.x += Math.sin(angle);
          p.o = p.x * 4;
          //isNaN(p.o) ? p.o = 0 : p.o += 1;

          if(p.x > W+5 || p.x < -5 || p.y > H)
          {
            if(i%3 > 0) //66.67% of the flakes
            {
              particles[i] = {x: Math.random()*W, y: -10, r: Math.random()+1 + W/1000, d: p.d, o: p.o};
            }
            else
            {
              //If the flake is exitting from the right
              if(Math.sin(angle) > 0)
              {
                //Enter from the left
                particles[i] = {x: -5, y: H, r: p.r, d: p.d, o: p.o};
              }
              else
              {
                //Enter from the right
                particles[i] = {x: W+5, y: H, r: p.r, d: p.d, o: p.o};
              }
            }
          }
        }
      }

      //animation loop
      setInterval(draw, 5);
    }
  })
});
