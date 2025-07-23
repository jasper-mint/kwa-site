(() => {
    'use strict';
    window.addEventListener('load', function () {
        var canvas = document.getElementById('canvas');

        if (!canvas || !canvas.getContext) {
            return false;
        }

        /********************
          Random Number
        ********************/
        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        /********************
          Var
        ********************/
        var ctx = canvas.getContext('2d');
        var X = canvas.width = window.innerWidth;
        var Y = canvas.height = window.innerHeight;
        var num = 3;
        var shapeNum = X / num;
        var shapes = [];
        var height = 33;
        var scaleX = 0.25;

        var fps = 10, fpsInterval, startTime, now, then, elapsed;

        if (X < 768) {
            height = 30;
            num = 2;
            shapeNum = X / num;
            scaleX = 0.05;
        }

        /********************
          Ground
        ********************/
        class Shape {
            constructor(ctx, x, y, i, c) {
                this.ctx = ctx;
                this.init(x, y, i, c);
            }

            init(x, y, i, c) {
                this.x = x;
                this.y = 0;
                this.c = c;
                this.a = i * 0.1;
                this.rad = this.a * Math.PI / 180;
                this.r = rand(10, 15);
                this.ina = 0.5;
                this.ga = Math.random() * Math.random();
                fpsInterval = 1000 / fps;
                then = Date.now();
                startTime = then;
            }

            draw() {
                var ctx = this.ctx;
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';
                ctx.globalAlpha = 0.25;
                ctx.fillStyle = this.c;
                ctx.beginPath();
                ctx.translate(this.x, this.y);
                ctx.scale(Math.sin(this.rad * 2) * scaleX, Math.sin(this.rad) * height);
                ctx.translate(-this.x, -this.y);
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.restore();
            }

            updateParams() {
                this.a += this.ina;
                this.rad = this.a * Math.PI / 180;
            }

            render(i) {
                this.updateParams();
                this.draw();
            }
        }

        for (var i = 0; i < shapeNum; i++) {
            var s = new Shape(ctx, i * num, Y / 2, i, auroraColor1);
            shapes.push(s);
        }

        for (var i = 0; i < shapeNum; i++) {
            var s = new Shape(ctx, i * num, Y / 2, i * 5, auroraColor2);
            shapes.push(s);
        }

        for (var i = 0; i < shapeNum; i++) {
            var s = new Shape(ctx, i * num, Y / 2, i * 10, auroraColor3);
            shapes.push(s);
        }

        /********************
          Render
        ********************/
        function render() {
            requestAnimationFrame(render);
            // calc elapsed time since last loop
            now = Date.now();
            elapsed = now - then;

            // if enough time has elapsed, draw the next frame

            if (elapsed > fpsInterval) {
                // Get ready for next frame by setting then=now, but also adjust for your
                // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                then = now - (elapsed % fpsInterval);

                ctx.clearRect(0, 0, X, Y);
                for (var i = 0; i < shapes.length; i++) {
                    shapes[i].render(i);
                }
            }
        }

        render();

        /********************
          Event
        ********************/
        function onResize() {
            X = canvas.width = window.innerWidth;
            Y = canvas.height = window.innerHeight;

            if (X < 768) {
                height = 30;
                num = 2;
                shapeNum = X / num;
                scaleX = 0.05;
            } else {
                height = 33;
                num = 3;
                shapeNum = X / num;
                scaleX = 0.25;
            }
            shapes = [];
            for (var i = 0; i < shapeNum; i++) {
                var s = new Shape(ctx, i * num, Y / 2, i, auroraColor1);
                shapes.push(s);
            }

            for (var i = 0; i < shapeNum; i++) {
                var s = new Shape(ctx, i * num, Y / 2, i * 5, auroraColor2);
                shapes.push(s);
            }

            for (var i = 0; i < shapeNum; i++) {
                var s = new Shape(ctx, i * num, Y / 2, i * 10, auroraColor3);
                shapes.push(s);
            }
        }

        window.addEventListener('resize', function () {
            onResize();
        });
    });
    // Author
    console.log('File Name / aurora.js\nCreated Date / July 06, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo');
})();