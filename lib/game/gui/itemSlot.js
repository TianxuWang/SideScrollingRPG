/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.itemSlot'
)
.requires(
    'game.gui.mouseInteractive'
)
.defines( function() {

    ItemSlot = MouseInteractive.extend({

        //_image:null,
        //_imageSelected:null,
        _pos: {x: 0, y: 0},
        item:null,
        selected:false,
        quantity:1,
        drawBG:true,

        init: function() {
            this.parent();
            //this._image=ig.game.assets.img_itemSlot;
            //this._imageSelected=ig.game.assets.img_itemSlotSelected;
            this.pos = {x: 0, y: 0};
            //this.width=this._image.width;
            //this.height=this._image.height;
            this.width = 18;
            this.height = 18;
        },

        draw: function(x, y) {
            this.update(x, y);
            this._pos.x = x;
            this._pos.y = y;
//            if (this.drawBG) {
//                if(this.selected&&this.item!=null)
//                    this._imageSelected.draw(x,y);
//                else
//                    this._image.draw(x,y);
//            }
            if (this.item) {
                this.item.icon.draw(x+1,y+1);
                if (this.item.quantity > 1) {
                    var font = ig.game.assets.font_default;
                    font.draw(
                        this.item.quantity,
                        x+this.width-1,
                        y+this.height-font.height+1,
                        ig.Font.ALIGN.RIGHT);
                }
            }
        },

        onMouseHover: function() {
            if (!this.item || this.mouse.leftDown)
                return;
            var self = this;
            ig.game.tooltip.show(function(x,y){
                return self.tooltipDraw(x,y);
            });
        },

        onMouseOut: function() {
            ig.game.tooltip.hide();
        },

        onLeftMousePress: function() {
            ig.game.tooltip.hide();
        },

        onRightMousePress: function() {
            ig.game.tooltip.hide();
            if(ig.game.cursorItem || !this.item|| this.item instanceof Spell)
                return;
            this.item.use();
            if(this.item && this.item.quantity == 0 && this.item.consumeable)
                this.item = null;
        },

        tooltipDraw: function(x,y) {
            if(!x)
                x=0;
            if(!y)
                y=0;
            return this.item.drawTooltip(x,y);
        }
    });
});