/*
 Author: Martin Mach
 */

// GENERAL: useful things

var General = (function() {

    var canvas  = document.getElementById('game'),
        context = canvas.getContext('2d'),
        speed   = 33,
        keys    = {left: [65, false], right: [68, false], up: [87, false], down: [83, false], fire: [13, false]};

    function getBodySizes() {
        var body = document.getElementsByTagName('body')[0];
        return { width: body.offsetWidth, height: body.offsetHeight };
    }

    return {
        canvas:       canvas,
        context:      context,
        speed:        speed,
        keys:         keys,
        getBodySizes: getBodySizes
    };

})();

// UNITS: objects in game

var Units = (function() {

    var player  = {pos:   { x: 140, y: 200, width: 32, height: 48, deg: 45},
            speed: { rotate: 3, move: 2 },
            imgs:  { standard: document.getElementById('tank'), fire: document.getElementById('tank_fire') },
            fire:  { delay: 500, speed: 10, face: { color: [255,200,0], width: 2, height: 10} }
        },
        bullets = [];

    function createBullet(x, y, deg) {
        bullets.push({x: x, y: y, deg: deg});
    }

    return {
        player:       player,
        bullets:      bullets,
        createBullet: createBullet
    };
})();

// MAIN: important parts

var Main = (function() {

    // true = can't shoot; false = can shoot
    var fireWait = false;

    function update() {
        updateBullets(Units.bullets, Units.player);
        updatePlayer(Units.player, General.keys);
    }

    function updatePlayer(player, keys) {
        if(keys.left[1]) player.pos.deg  -= player.speed.rotate;
        if(keys.right[1]) player.pos.deg += player.speed.rotate;

        if(player.pos.deg < 0) player.pos.deg   = 360;
        if(player.pos.deg > 360) player.pos.deg = 0;

        if(keys.up[1]) {
            player.pos.x += player.speed.move * Math.sin(player.pos.deg * (Math.PI / 180));
            player.pos.y -= player.speed.move * Math.cos(player.pos.deg * (Math.PI / 180));
        }

        if(keys.down[1]) {
            player.pos.x -= player.speed.move * Math.sin(player.pos.deg * (Math.PI / 180));
            player.pos.y += player.speed.move * Math.cos(player.pos.deg * (Math.PI / 180));
        }

        if(keys.fire[1]) {
            if(!fireWait) {
                Units.createBullet(player.pos.x + (player.pos.width  / 2),
                    player.pos.y + (player.pos.height / 2), player.pos.deg);
                fireWait = true;
                setTimeout(function() { fireWait = false; }, player.fire.delay);
            }
        }

    }

    function updateBullets(bullets, player) {
        for(var i = 0; i < bullets.length; i++) {
            bullets[i].x += player.fire.speed * Math.sin(bullets[i].deg * (Math.PI / 180));
            bullets[i].y -= player.fire.speed * Math.cos(bullets[i].deg * (Math.PI / 180));
        }
    }

    function render(ctx) {
        // resize canvas
        ctx.canvas.width  = General.getBodySizes().width;
        ctx.canvas.height = General.getBodySizes().height;

        // clear canvas
        ctx.clearRect(0, 0,
            General.getBodySizes().width, General.getBodySizes().height);

        // render bullets
        renderBullets(Units.bullets, Units.player.fire.face, ctx);

        // render player
        renderPlayer(Units.player, ctx);
    }

    function renderPlayer(unit, ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(unit.pos.x + unit.pos.width  / 2, unit.pos.y + unit.pos.height / 2);
        ctx.rotate(unit.pos.deg * Math.PI / 180);

        var img = unit.imgs.standard;
        if(fireWait) img = unit.imgs.fire;

        ctx.drawImage(img, -unit.pos.width / 2, -unit.pos.height / 2);
        ctx.restore();
    }

    function renderBullets(bullets, face, ctx) {
        for(var i = 0; i < bullets.length; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(bullets[i].x + face.width  / 2, bullets[i].y + face.height / 2 );
            ctx.rotate(bullets[i].deg * Math.PI / 180);
            ctx.fillStyle = 'rgb(' + face.color[0] + ',' + face.color[1] + ',' + face.color[2] + ')';
            ctx.fillRect(-face.width / 2, -face.height / 2, face.width, face.height);
            ctx.restore();
        }
    }

    function listeners(keys) {

        document.addEventListener('keydown', function(e) {
            if(e.keyCode == keys.left[0])  keys.left[1]  = true;
            if(e.keyCode == keys.right[0]) keys.right[1] = true;
            if(e.keyCode == keys.up[0])    keys.up[1]    = true;
            if(e.keyCode == keys.down[0])  keys.down[1]  = true;
            if(e.keyCode == keys.fire[0])  keys.fire[1]  = true;
        });

        document.addEventListener('keyup', function(e) {
            if(e.keyCode == keys.left[0])  keys.left[1]  = false;
            if(e.keyCode == keys.right[0]) keys.right[1] = false;
            if(e.keyCode == keys.up[0])    keys.up[1]    = false;
            if(e.keyCode == keys.down[0])  keys.down[1]  = false;
            if(e.keyCode == keys.fire[0])  keys.fire[1]  = false;
        });
    }

    return {
        update:    update,
        render:    render,
        listeners: listeners
    };

})();

// setup listeners
Main.listeners(General.keys);

// game loop
setInterval(function() {
    Main.update();
    Main.render(General.context);
}, General.speed);