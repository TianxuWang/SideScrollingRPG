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

        _rect: {
            x: 3,
            y: 3,
            width: 55,
            height: 14
        },
        _timer: null,
        _time: 0,
        _contentDrawFunc: null,
        width: 61,
        height: 20,
        visible: false,
        pos: {x: 0,y: 0},

        init: function() {
            this._timer = new ig.Timer();
        },

        show: function(contentDrawFunc, pos, time) {
            this._contentDrawFunc = contentDrawFunc;
            this._time = !time ? 0.25 : time;
            this._timer.set(this._time);
            var size = this._contentDrawFunc(-99999,-99999);
            this.width = size.x;
            this.height = size.y;
            if(!pos) {
                this.pos.x = Math.floor(ig.input.mouse.x+2);
                this.pos.y = Math.floor(ig.input.mouse.y+2);
                var maxX = ig.system.width-this.width-20;
                var maxY = ig.system.height-this.height-20;
                if(this.pos.x>maxX)
                    this.pos.x=Math.floor(ig.input.mouse.x-this.width-2);
                if(this.pos.y>maxY)
                    this.pos.y=Math.floor(ig.input.mouse.y-this.height-2);
                if(this.pos.x<0)
                    this.pos.x=0;
                if(this.pos.y<0)
                    this.pos.y=0;
            }
            else {
                this.pos.x=Math.floor(pos.x);
                this.pos.y=Math.floor(pos.y);
            }
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

            this.pos.x=Math.floor(ig.input.mouse.x+2);
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

//            var img=ig.game.assets.img_tooltip;
//            var imgWidth=img.width;
//            var imgHeight=img.height;
//            var centerWidth=this.width-(imgWidth-this._rect.width);
//            var centerHeight=this.height-(imgHeight-this._rect.height);
//            img.draw(this.pos.x,this.pos.y,0,0,this._rect.x,this._rect.y);
//            var tx=Math.floor(this.pos.x+this._rect.x+centerWidth);
//            var sx=Math.floor(imgWidth-this._rect.width-this._rect.x);
//            img.draw(tx,this.pos.y,imgWidth-sx,0,sx,this._rect.y);
//            var tx=Math.floor(this.pos.x+this._rect.x);
//            var w=0;
//            while(w<centerWidth) {
//                var tw=Math.min(this._rect.width,centerWidth-w);
//                img.draw(tx,this.pos.y,this._rect.x,0,tw,this._rect.y);
//                w+=tw;
//                tx+=tw;
//            }
//            var ty=this.pos.y+this._rect.y;
//            var h=0;
//            while(h<centerHeight) {
//                var th=Math.min(this._rect.height,centerHeight-h);
//                img.draw(this.pos.x,ty,0,this._rect.y,this._rect.x,th);
//                h+=th;
//                ty+=th;
//            }
//            var ty=Math.floor(this.pos.y+this._rect.y+centerHeight);
//            var sy=Math.floor(this._rect.y+this._rect.height);
//            img.draw(this.pos.x,ty,0,sy,this._rect.x,Math.floor(imgHeight-this._rect.height-this._rect.y));
//            var tx=Math.floor(this.pos.x+this._rect.x+centerWidth);
//            var sx=Math.floor(this._rect.x+this._rect.width);
//            img.draw(tx,ty,sx,sy,Math.floor(imgWidth-this._rect.width-this._rect.x),Math.floor(imgHeight-this._rect.height-this._rect.y));
//            var ty=this.pos.y+this._rect.y;
//            var h=0;
//            while(h<centerHeight) {
//                var th=Math.min(this._rect.height,centerHeight-h);
//                img.draw(tx,ty,sx,this._rect.y,Math.floor(imgWidth-this._rect.width-this._rect.x),th);
//                h+=th;
//                ty+=th;
//            }
//            var tx=Math.floor(this.pos.x+this._rect.x);
//            var w=0;
//            while(w<centerWidth) {
//                var tw=Math.min(this._rect.width,centerWidth-w);
//                img.draw(tx,ty,this._rect.x,sy,tw,this._rect.y);
//                w+=tw;
//                tx+=tw;
//            }
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
