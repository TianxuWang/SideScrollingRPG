/**
 * Created by Tianxu on 14-3-30.
 */
ig.module(
    'game.effects.emitter'
)
.requires(
    'impact.entity'
)
.defines( function() {
    ParticleEmitter = ig.Class.extend({
        pos:{x:0,y:0},
        particleClass:null,
        emitAngleMin:0,
        emitAngleMax:0,
        emitStrengthMin:100,
        emitStrengthMax:100,
        emitterLife:0,
        lifeMin:2,
        lifeMax:2,
        velMin:{x:0,y:0},
        velMax:{x:200,y:0},
        accelMin:{x:0,y:0},
        accelMax:{x:0,y:0},
        posOffsetMin:{x:0,y:0},
        posOffsetMax:{x:0,y:0},
        allowInvert:false,
        invertDir:false,
        settings:{},
        owner:null,
        enabled:true,
        _spawnTimer:null,
        _emitterLifeTimer:null,
        _dead:false,

        init: function(owner) {
            this.owner=owner;
            this._spawnTimer=new ig.Timer();
        },

        emit: function(force) {
            if(!force&&(this._dead||!this.enabled))
                return;
            if(this.emitterLife>0) {
                if(this._emitterLifeTimer==null)
                    this._emitterLifeTimer=new ig.Timer(this.emitterLife);
                if(this._emitterLifeTimer.delta()>=0) {
                    this.die();
                    return;
                }
            }
            if(force||this._spawnTimer.delta()>=0) {
                this._spawn();
                this._spawnTimer.reset();
            }
        },

        setParticleData: function(data) {
            for(var i in data) {
                switch(i) {
                    case "class":
                        this.particleClass=data[i];
                        break;
                    case "spawnTime":
                        this._spawnTimer.set(data[i]);
                        break;
                    case "emitAngleMin":
                    case "emitAngleMax":
                        var value=Number(data[i]);
                        if(value<0)
                            value+=360;
                        if(value>360)
                            value-=360;
                        this[i]=value;
                    default:
                        this[i]=data[i];
                        break;
                }
            }
        },

        die: function() {
            this._dead=true;
        },

        revive: function(life) {
            if (life==undefined)
                life=0.0;
            this._dead=false;
            this._emitterLifeTimer=null;
            this.emitterLife=life;
        },

        _spawn: function() {
            if(this.particleClass==null)
                return;
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
    });
});