/**
 * Created by Tianxu on 14-4-10.
 */
ig.module(
    'game.effects.textEmitter'
)
.requires(
    'game.effects.emitter',
    'game.effects.textParticle'
)
.defines( function() {
    TextEmitter = ParticleEmitter.extend({
        enabled:false,

        init:function(owner) {
            this.parent(owner);
            this.settings={
                text:"",
                color:"#FFFFFF",
                gravityFactor:0.25
            };
            this.setParticleData({
                class:EntityTextParticle,
                spawnTime:0,
                lifeMin:1.0,
                lifeMax:1.0,
                emitAngleMin:-100,
                emitAngleMax:-80,
                emitStrengthMin:50,
                emitStrengthMax:50,
                posOffsetMin:{x:0,y:-6},
                posOffsetMax:{x:0,y:-6},
                accelMin:{x:0,y:0},
                accelMax:{x:0,y:0}
            });
        },

        emit:function(particleData) {
            this.settings=particleData;
            this.pos.x=this.owner.pos.x;
            this.pos.y=this.owner.pos.y;
            this._spawn();
        }
    });
});
