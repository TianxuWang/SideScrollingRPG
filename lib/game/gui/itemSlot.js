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

        _pos: {x: 0, y: 0},
        _itemType: null,
        _types: null,
        item:null,
        selected:false,
        quantity:1,
        drawBG:true,

        init: function(itemType, types) {
            this.parent();
            this.pos = {x: 0, y: 0};
            this.width = 18;
            this.height = 18;

            if (itemType)
                this._itemType = itemType;
            if (types)
                this._types = types;
        },

        draw: function(x, y) {
            this.update(x, y);
            this._pos.x = x;
            this._pos.y = y;
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

            ig.gui.cursor.loot = true;

            var self = this;
            ig.game.tooltip.show(function(x,y){
                return self.tooltipDraw(x,y);
            });
        },

        onMouseOut: function() {
            ig.gui.cursor.loot = false;
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
            if(this.item && this.item.quantity == 0 && this.item.consumable)
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