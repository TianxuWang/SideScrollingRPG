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

        _image:null,
        _imageSelected:null,
        _pos:null,
        item:null,
        selected:false,
        quantity:1,
        drawBG:true,

        init:function() {
            this.parent();
            this._pos={x:0,y:0};
            this._image=ig.game.assets.img_itemSlot;
            this._imageSelected=ig.game.assets.img_itemSlotSelected;
            this.pos={x:0,y:0};
            this.width=this._image.width;
            this.height=this._image.height;
        },

        draw:function(x,y) {
            this.update(x,y);
            this._pos.x=x;
            this._pos.y=y;
            if(this.drawBG) {
                if(this.selected&&this.item!=null)
                    this._imageSelected.draw(x,y);
                else
                    this._image.draw(x,y);
            }
            if(this.item!=null) {
                this.item.icon.draw(x+2,y+2);
                if(this.item.quantity>1&&this.item.itemType!="gold") {
                    var font=ig.game.assets.font_lightGrey;
                    font.draw(
                        this.item.quantity,
                        x+this.width-1,
                        y+this.height-font.height+1,
                        ig.Font.ALIGN.RIGHT);
                }
            }
        },

        onMouseOver:function() {
            if(this.item==null||this.mouse.leftDown)
                return;
            var self=this;
            ig.game.tooltip.show(function(x,y){
                return self.tooltipDraw(x,y);
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
            if(ig.game.cursorItem!=null||this.item==null||this.item instanceof Spell)
                return;
            this.item.use();
            if(this.item!=null&&this.item.quantity==0&&this.item.consumeable)
                this.item=null;
        },

        tooltipDraw:function(x,y) {
            if(isNaN(x))
                x=0;
            if(isNaN(y))
                y=0;
            return this.item.drawTooltip(x,y);
        }
    });
});