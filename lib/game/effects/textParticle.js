/**
 * Created by Tianxu on 14-4-11.
 */
ig.module(
    'game.effects.textParticle'
)
.requires(
    'game.effects.particle'
)
.defines( function() {
    EntityTextParticle = EntityParticle.extend({

        _canvas:null,
        _textWidth:0,
        gravityFactor:0.25,
        fontSize:12,

        init: function(x,y,settings) {
            this.parent(x,y,settings);
            this._drawText();
        },

        update:function() {
            this.parent();
        },

        _drawText:function() {
            if(this.text==null||this.text.length<=0)
                return;
            this._canvas=ig.$new("canvas");
            var context=this._canvas.getContext("2d");
            this._textWidth=context.measureText(this.text).width+this.fontSize;
            this._canvas.width=this._textWidth;
            this._canvas.height=20;
            with(context) {
                clearRect(0,0,this._canvas.width,this._canvas.height);
                //strokeStyle="#000000";
                fillStyle=this.color;
                font="bold "+this.fontSize+"px Arial";
                textBaseline="top";
                lineWidth=3;
                //strokeText(this.text,0,0);
                fillText(this.text,0,0);
            }
        },

        kill:function() {
            this._canvas=null;
            this.parent();
        },

        draw:function() {
            if(this._canvas!=null) {
                var px=ig.system.getDrawPos(this.pos.x-ig.game.screen.x)-((this._textWidth*0.5)/ig.system.scale);
                var py=ig.system.getDrawPos(this.pos.y-ig.game.screen.y);
                ig.system.context.globalAlpha=1-(this._age/this.life);
                ig.system.context.drawImage(this._canvas,px,py);
                ig.system.context.globalAlpha=1.0;
                this.parent();
            }
        }
    });
});

