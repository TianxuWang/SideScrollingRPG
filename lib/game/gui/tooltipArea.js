/**
 * Created by Tianxu on 14-5-8.
 */
ig.module(
    'game.gui.tooltipArea'
)
.requires(
    'game.gui.mouseInteractive'
)
.defines( function() {

    TooltipArea = MouseInteractive.extend({

        _pos:null,
        _text:"",

        init: function(x,y,width,height,text) {
            this._pos = {x:x,y:y};
            this.width=width;
            this.height=height;
            this._text=text;
            this.parent();
        },

        onMouseOver:function() {
            var self=this;
            ig.game.tooltip.show(function(x,y){
                return self.drawTooltip(x,y);
            });
        },

        onMouseOut:function() {
            ig.game.tooltip.hide();
        },

        onLeftMousePress:function() {
            ig.game.tooltip.hide();
        },

        onRightMousePress:function() {
            ig.game.tooltip.hide();
        },

        update:function() {
            this.parent(this._pos.x,this._pos.y);
        },

        drawTooltip:function(x,y) {
            var font=ig.game.assets.font_darkGrey;
            var textWidth=font.widthForString(this._text);
            font.draw(this._text,x,y-1);
            return {x:Math.floor(textWidth+5),y:font.height+2}
        }
    });
});
