/**
 * Created by Tianxu on 14-5-2.
 */
ig.module(
    'plugins.camera'
)
.requires(
    'impact.game',
    'impact.image'
)
.defines(function (){

    Camera = ig.Class.extend({
        trap:{
            pos:{x:0, y:0},
            size:{x:16, y:16}
        },
        min:{x:0, y:0},
        max:{x:0, y:0},
        offset:{x:0, y:0},
        pos:{x:0, y:0},
        damping:5,
        lookAhead:{x:0, y:0},
        lightOffset:{x:0, y:0},
        currentLookAhead:{x:0, y:100},
        debug:false,
        lightMask:null,
        duration:1,
        strength:3,
        init:function (offsetX, offsetY, damping, lightMask)
        {
            this.offset.x = offsetX;
            this.offset.y = offsetY;
            this.damping = damping;
            this.quakeTimer = new ig.Timer();
            this.lightMask = lightMask;
        },
        set:function (entity)
        {
            this.entity = entity;

            this.pos.x = this.entity.pos.x - this.offset.x;
            this.pos.y = this.entity.pos.y - this.offset.y;

            //TODO took this out because it was causing an issue with the camera not being correct when the player was too close to the bottom
            /*this.trap.pos.x = this.entity.pos.x - this.trap.size.x / 2;
             this.trap.pos.y = this.entity.pos.y - this.trap.size.y;*/
            ig.game.screen.x = this.pos.x;
            ig.game.screen.y = this.pos.y;
        },
        update:function ()
        {
            if(this.entity)
            {
                this.pos.x = this.move('x', this.entity.pos.x, this.entity.size.x);
                this.pos.y = this.move('y', this.entity.pos.y, this.entity.size.y);
                ig.game.screen.x = this.pos.x;
                ig.game.screen.y = this.pos.y;
            }

            // Handle screen shake
            var delta = this.quakeTimer.delta();
            if (delta < -0.1)
            {
                this.quakeRunning = true;
                var s = this.strength * Math.pow(-delta / this.duration, 2);
                if (s > 0.5)
                {
                    ig.game.screen.x += Math.random().map(0, 1, -s, s);
                    ig.game.screen.y += Math.random().map(0, 1, -s, s);
                }
            }
            else
            {
                this.quakeRunning = false;
            }

            if (this.lightMask)
            {
                this.lightOffset.x = (this.entity.pos.x - this.pos.x) - this.lightMask.width * .5;
                this.lightOffset.y = (this.entity.pos.y - this.pos.y) - this.lightMask.height * .5;
            }
        },
        move:function (axis, pos, size)
        {
            if (pos < this.trap.pos[axis])      // if target move out of left/up bound of trap
            {
                this.offset.x = this.entity.flip ? (ig.system.width)/2-this.trap.size.x : (ig.system.width)/2;
                this.trap.pos[axis] = pos;      // move trap left/up
                this.currentLookAhead[axis] = this.lookAhead[axis];
            }
            else if (pos + size > this.trap.pos[axis] + this.trap.size[axis])   // if target move out of right/down bound of trap
            {
                this.offset.x = this.entity.flip ? (ig.system.width)/2-this.trap.size.x : (ig.system.width)/2;
                this.trap.pos[axis] = pos + size - this.trap.size[axis];        // move trap right/down
                this.currentLookAhead[axis] = -this.lookAhead[axis];
            }
            return(this.pos[axis] - (this.pos[axis] - this.trap.pos[axis] + this.offset[axis]
                + this.currentLookAhead[axis]) * ig.system.tick * this.damping).limit(this.min[axis], this.max[axis]);
        },
        draw:function ()
        {
            if (this.debug)
            {
                ig.system.context.fillStyle = 'rgba(255,0,255,0.3)';
                ig.system.context.fillRect((this.trap.pos.x - this.pos.x) * ig.system.scale, (this.trap.pos.y - this.pos.y) * ig.system.scale, this.trap.size.x * ig.system.scale, this.trap.size.y * ig.system.scale);
            }
            if (this.lightMask)
                this.lightMask.draw(this.lightOffset.x, this.lightOffset.y);

        },
        shake:function (duration, strength, ignoreShakeLock)
        {
            this.duration = duration ? duration : 1;
            this.strength = strength ? strength : 3;

            if (!ignoreShakeLock && this.quakeRunning)
            {
                return;
            }

            this.quakeTimer.set(this.duration);
        }

    });

    ig.Game.inject({
        camera: new Camera(120, 60, 5),
        loadLevel: function(data)
        {
            this.parent(data);

            // Attempt to automatically find the player by name
            var playerInstance = ig.game.player;

            // If player instance exists, set it as the camera's target
            if(playerInstance)
            {
                //TODO need to trigger this in the configureCamera
                this.camera.set(playerInstance);
                this.configureCamera();
            }
            else
                console.log("Error: Couldn't find player for camera.")



        },
        configureCamera: function()
        {
            //TODO need to explain this better
            // This sets the camera's max x to the width of the screen
            this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
            this.camera.min.y = 0;
            this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

        },
        //TODO should I add in duration & strength arguments?
        shakeScreen:function (duration, strength, ignoreShakeLock)
        {
            if (this.camera)
                this.camera.shake(duration, strength, ignoreShakeLock);
        },
        updateEntities:function ()
        {
            this.parent();

            // If the pause plugin is loaded, don't update the camera when paused
            if (this.camera && !this.paused)
                this.camera.update();
        },
        drawEntities:function ()
        {
            this.parent();
            if (this.camera)
                this.camera.draw();
        }
    });
});