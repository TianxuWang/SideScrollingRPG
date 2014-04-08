/**
 * Created by Tianxu on 14-3-30.
 */
ig.module(
    'game.effects.bloodemitter'
)
.requires(
    'game.effects.emitter',
    'game.effects.bloodparticle'
)
.defines( function() {
    BloodEmitter = ParticleEmitter.extend({
        target:null,

        init:function(owner) {
            this.parent(owner);
            this.setParticleData({
                class:EntityBloodParticle,
                spawnTime:0.1,
                lifeMin:0.25,
                lifeMax:0.25,
                emitAngleMin:-180,
                emitAngleMax:0,
                emitStrengthMin:50,
                emitStrengthMax:50,
                posOffsetMin:{x:0,y:0},
                posOffsetMax:{x:0,y:5},
                accelMin:{x:0,y:0},
                accelMax:{x:0,y:0}
            });
        },

        emit:function() {
            //this.pos.x=this.owner.pos.x;
            //this.pos.y=this.owner.pos.y;
            this.parent();
        },

        died:function() {
            if(this.target!=null) {
                var i=this.target.emitters.indexOf(this);
                if(i>=-1)
                    this.target.emitters.splice(i,1);
                this.target=null;
            }
            this.parent();
        },

        setPos: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
        }
    });
});