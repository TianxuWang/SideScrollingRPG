/**
 * Created by Tianxu on 14-5-8.
 */
ig.module(
    'game.gui.tooltip'
)
.requires(
    'impact.impact'
)
.defines( function(){

    Tooltip = ig.Class.extend({

        _rect: {x: 3, y: 3},
        _timer: null,
        _time: 0,
        _contentDrawFunc: null,
        width: 60,
        height: 20,
        visible: false,
        pos: {x: 0,y: 0},

        init: function() {
            this._timer = new ig.Timer();
        },

        show: function(contentDrawFunc, time) {
            this._contentDrawFunc = contentDrawFunc;
            this._time = time ? time : 0.25;
            this._timer.set(this._time);
            var size = this._contentDrawFunc(-99999,-99999);
            this.width = size.x;
            this.height = size.y;
        },

        hide: function() {
            this.visible = false;
            this._time = 0;
            this._timer.set(0);
        },

        update: function() {
            if (this._time > 0 && this._timer.delta() >= 0) {
                this.visible = true;
            }
        },

        draw: function() {
            if(!this.visible)
                return;

            this.pos.x=Math.floor(ig.input.mouse.x-this.width-2);
            this.pos.y=Math.floor(ig.input.mouse.y+2);
            var maxX=ig.system.width-this.width-10;
            var maxY=ig.system.height-this.height-10;
            if(this.pos.x>maxX)
                this.pos.x=Math.floor(ig.input.mouse.x-this.width-2);
            if(this.pos.y>maxY)
                this.pos.y=Math.floor(ig.input.mouse.y-this.height-2);
            if(this.pos.x<0)
                this.pos.x=0;
            if(this.pos.y<0)
                this.pos.y=0;

            ig.system.context.beginPath();
            ig.system.context.fillStyle = 'rgba(0, 0, 0, 0.8)';
            ig.system.context.rect((this.pos.x+this._rect.x)*ig.system.scale,(this.pos.y+this._rect.y)*ig.system.scale,this.width*ig.system.scale,this.height*ig.system.scale);
            ig.system.context.closePath();
            ig.system.context.fill();
            if(this._contentDrawFunc)
                this._contentDrawFunc(Math.floor(this.pos.x+this._rect.x),Math.floor(this.pos.y+this._rect.y));
        }
    });
});
