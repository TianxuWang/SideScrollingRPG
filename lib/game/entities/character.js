ig.module (
    'game.entities.character'
)
.requires (
    'impact.entity',
    'impact.font',
    'impact.sound',
    'game.system.stateMachine',
    'game.effects.bloodEmitter',
    'game.effects.textEmitter',
    'game.effects.particle'
)
.defines ( function() {
    
    EntityCharacter = ig.Entity.extend ({

        State: {
            // common
            'INVINCIBLE': 'invincible',
            'IDLE': 'idle',
            'ATTACKGROUND': 'attackGround',
            'ATTACKAIR': 'attackAir',
            'BLOCK': 'block',
            'CHANNEL': 'channel',
            'CASTING': 'casting',
            'HURT': 'hurt',
            'DEAD': 'dead',

            // player
            'WALKING': 'walking',
            'RUNNING': 'running',
            'JUMPGROUND': 'jumpGround',
            'CROUCH': 'crouch',
            'FALLING': 'falling',

            // enemy or shadow clone
            'ALERT': 'alert',
            'SEARCHING': 'searching',
            'CHASING': 'chasing',
            'ATTACKING': 'attacking',
            'RESET': 'reset'
        },

        name: null,
        size: {x: 16, y: 16},
        state: null,
        stateMachine: null,
        bloodEmitter: null,
        textEmitter: null,
        invincibleTimer: null,
        visible: true,
        flip: false,

        walkSpeed: 50,
        runSpeed: 80,
        health: 10,
        maxHealth: 10,
        selfAttack: 0,
        attack: 0,
        selfDefence: 0,
        defence: 0,
        
        maxVel: {x: 50, y: 150},
        friction: {x: 600, y: 0},
        //accel: {x:0, y: 400},
        accelGround: 400,
        accelAir: 200,
        jumpSpeed: 400,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.center = {x: x+this.size.x/2, y: y+this.size.y/2};
            this.stateMachine = new StateMachine();
            this.invincibleTimer = new ig.Timer();
            this.state = this.State.IDLE;
            // attributes

            if (!ig.global.wm) {
                // add blood effect
                this.bloodEmitter = new BloodEmitter(this);
                this.bloodEmitter.enabled = false;
            }

        },
        
        update: function() {
            this.updateFlip();
            this.updateCenter();
            this.stateMachine.update();
            if (this.bloodEmitter != null)
                this.bloodEmitter.emit();

            this.parent();
        },
        
        updateFlip: function() {
            if (this.type == ig.Entity.TYPE.NONE
                && this.checkAgainst == ig.Entity.TYPE.NONE
                && this.currentAnim != null)
                this.currentAnim.flip.x = this.flip;
        },

        updateCenter: function() {
            this.center.x = this.pos.x + this.size.x/2;
            this.center.y = this.pos.y + this.size.y/2;
        },

        move: function() {
            this.accel.x = this.flip ? -this.accelGround : this.accelGround;
        },

        walkTo: function(direction) {
            if (direction == 'left')
                this.accel.x = -this.accelGround;
            else if (direction == 'right')
                this.accel.x = this.accelGround;
        },

        jump: function() {
            this.vel.y = -this.jumpSpeed;
        },
        
        attackGround: function() {
            
        },

        attackAir: function() {

        },
        
        stop: function() {
            this.accel.x = 0;
        },
        
        setName: function(name) {
            this.name = name;
        },
        
        setPosition: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
        },
        
        setVisible: function(value) {
            this.visible = value;    
        },
        
        toggleFlip: function() {
            this.flip = !this.flip;
        },

        toggleAlpha: function() {
            if (this.currentAnim != null) {
                if (this.currentAnim.alpha == 1)
                    this.currentAnim.alpha = 0.5;
                else
                    this.currentAnim.alpha = 1;
            }
        },

        toggleVisibility: function() {
            if (this.visible)
                this.setVisible(false);
            else
                this.setVisible(true);
        },

        isOnLeftOf: function(other) {
            if (this.center != null && other.center != null)
                return this.center.x - other.center.x < 0;
            else
                return false;
        },

        isNear: function(other, distanceX, distanceY) {
            var dx, dy, near = false;
            if (this.center != null && other.center != null) {
                dx = Math.abs(this.center.x - other.center.x);
                dy = Math.abs(this.center.y - other.center.y);

                if(dx <= distanceX && dy <= distanceY) {
                    near = true;
                }
            }
            return near;

        }
        
    });
});