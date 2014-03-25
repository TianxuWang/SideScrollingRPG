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
    
    var Status = {
        'IDLE': 0,
        'WALK': 1,
        'RUN': 2,
        'JUMP': 3,
        'CROUCH': 4,
        'ATTACK': 5,
        'CHANNEL': 6,
        'HURT': 7,
        'DEAD': 8,
        'ATTACKING': 9
    }
    
    EntityCharacter = ig.Entity.extend ({
        
        name: null,
        status: Status.IDLE,
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
            // attributes
        },
        
        update: function() {
            this.updateFlip();
            this.stateMachine.update();
            
            //this.updateStatus();
            //this.updateMovements();
            //this.updateAnimations();
            
            this.parent();
        },
        
        updateFlip: function() {
            if (ig.input.state('right'))
                this.flip = false;
            else if (ig.input.state('left'))
                this.flip = true;
                
            if (this.currentAnim != null)
                this.currentAnim.flip.x = this.flip;
        },
        
        //updateStatus: function() {
        //    
        //    if (this.currentAnim == this.anims.attack && this.currentAnim.loopCount) {
        //        this.status = Status.IDLE;
        //    }
        //    
        //    if (ig.input.pressed('attack') && this.status != Status.ATTACKING) {
        //        this.status = Status.ATTACK;
        //    }
        //    else if (this.standing && ig.input.pressed('jump')) {
        //        this.status = Status.JUMP;
        //    }
        //    else if (this.status != Status.ATTACKING) {
        //        
        //        if( ig.input.state('right') ) {
        //            this.flip = false;
        //            this.status = Status.WALK;
        //        }
        //        else if(ig.input.state('left') ) {
        //            this.flip = true;
        //            this.status = Status.WALK;
        //        }
        //        else {
        //            this.status = Status.IDLE;
        //        }
        //    }
        //},
        //
        //updateMovements: function() {
        //    //var _accel = this.standing ? this.accelGround : this.accelAir;
        //    this.stop();
        //    
        //    switch (this.status) {
        //        case Status.JUMP:
        //            this.jumpGround();
        //            break;
        //        case Status.WALK:
        //            this.move();
        //            break;
        //        default:
        //            break;
        //    }
        //},
        //
        //updateAnimations: function() {
        //    
        //    switch (this.status) {
        //        case Status.ATTACK:
        //            this.currentAnim = this.anims.attack.rewind();
        //            this.status = Status.ATTACKING;
        //            break;
        //        case Status.WALK:
        //            this.currentAnim = this.anims.walk;
        //            break;
        //        case Status.IDLE:
        //            this.currentAnim = this.anims.idle;
        //            break;
        //        default:
        //            break;
        //    }
        //    
        //    this.currentAnim.flip.x = this.flip;
        //},
        
        move: function() {
            this.accel.x = this.flip ? -this.accelGround : this.accelGround;
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