/**
 * Created by Tianxu on 14-4-29.
 */
ig.module(
    'game.effects.sparkEmitter'
)
.requires(
    'game.effects.emitter',
    'game.effects.sparkParticle'
)
.defines( function() {

    SparkEmitter = ParticleEmitter.extend({

        target:null,

        init:function(owner) {
            this.parent(owner);
            this.setParticleData({
                class:EntitySparkParticle,
                spawnTime:0.1,
                lifeMin:0.25,
                lifeMax:0.5,
                emitAngleMin:-180,
                emitAngleMax:0,
                emitStrengthMin:50,
                emitStrengthMax:100,
                posOffsetMin:{x:0,y:0},
                posOffsetMax:{x:0,y:5},
                accelMin:{x:0,y:0},
                accelMax:{x:0,y:0}
            });
        },

        die:function() {
            if(this.target!=null) {
                var i=this.target.emitters.indexOf(this);
                if(i>=-1)
                    this.target.emitters.splice(i,1);
                this.target=null;
            }
            this.parent();
        },

        _spawn: function() {
            if(this.particleClass==null)
                return;

            for (var j = 0; j< 5; j++) {
                var angleRad=Number(this.emitAngleMin+(this.emitAngleMax-this.emitAngleMin)*Math.random()).toRad();
                if(this.allowInvert&&this.invertDir)
                    angleRad-=3.14159265;
                var dir=this.invertDir?-1:1;
                var cos=Math.cos(angleRad);
                var sin=Math.sin(angleRad);
                var settings={
                    emitter:this,
                    life:this.lifeMin+(this.lifeMax-this.lifeMin)*Math.random(),
                    pos:{x:this.pos.x+(this.posOffsetMin.x+(this.posOffsetMax.x-this.posOffsetMin.x)*Math.random())*dir,y:this.pos.y+(this.posOffsetMin.y+(this.posOffsetMax.y-this.posOffsetMin.y)*Math.random())*dir},
                    vel:{x:cos*(this.emitStrengthMin+(this.emitStrengthMax-this.emitStrengthMin)*Math.random()),y:sin*(this.emitStrengthMax+(this.emitStrengthMax-this.emitStrengthMin)*Math.random())},
                    accel:{x:(this.accelMin.x+(this.accelMax.x-this.accelMin.x)*Math.random())*dir,y:(this.accelMin.y+(this.accelMax.y-this.accelMin.y)*Math.random())*dir}};
                for(var i in this.settings) {
                    settings[i]=this.settings[i];
                }

                ig.game.spawnEntity(this.particleClass,settings.pos.x,settings.pos.y,settings);
            }
        },

        setPos: function(x, y) {
            this.pos.x = x;
            this.pos.y = y;
        }
    });
});