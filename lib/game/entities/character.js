ig.module (
    'game.entities.character'
)
.requires (
    'impact.entity',
    'impact.font',
    'impact.sound',
    'game.system.stateMachine'

)
.defines ( function() {
    
    EntityCharacter = ig.Entity.extend ({

        State: {
            // common
            'IDLE': 'idle',
            'ATTACKGROUND': 'attackGround',
            'ATTACKAIR': 'attackAir',
            'CHANNEL': 'channel',
            'HURT': 'hurt',
            'DEAD': 'dead',
            'ATTACKING': 'attacking',

            // player
            'WALKING': 'walking',
            'RUNNING': 'running',
            'JUMPGROUND': 'jumpGround',
            'CROUCH': 'crouch',

            // enemy
            'ALERT': 'alert',
            'SEARCHING': 'searching',
            'CHASING': 'chasing',
            'RESET': 'reset'
        },

        name: null,
        state: null,
        stateMachine: null,
        visible: true,
        flip: false,

        walkSpeed: 50,
        runSpeed: 80,
        curHealth: 10,
        maxHealth: 10,
        selfAttack: 0,
        attack: 0,
        selfDefence: 0,
        defence: 0,
        
        maxVel: {x: 50, y: 150},
        friction: {x: 600, y: 0},
        accel: {x:0, y: 400},
        accelGround: 400,
        accelAir: 200,
        jumpSpeed: 400,
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.stateMachine = new StateMachine();
            this.state = this.State.IDLE;
            // attributes
        },
        
        update: function() {
            this.updateFlip();
            this.stateMachine.update();
            
            this.parent();
        },
        
        updateFlip: function() {
            if (this.currentAnim != null)
                this.currentAnim.flip.x = this.flip;
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
        
        isVisible: function() {
            return this.visible;
        },

        toggleFlip: function() {
            this.flip = !this.flip;
        },

        toggleVisibility: function() {
            if (this.visible) {
                this.setVisible(false);
            }
            else {
                this.setVisible(true);
            }
        },

        isNear: function(character, distanceX, distanceY) {
            var dx, dy, near = false;
        
            dx = Math.abs(this.pos.x - character.pos.x);
            dy = Math.abs(this.pos.y - character.pos.y);
        
            if(dx <= distanceX && dy <= distanceY) {
                near = true;
            }
            return near;
        }
        
    });
});