/**
 * Created by Tianxu on 14-4-30.
 */
ig.module(
    'game.data.items.item'
)
.requires(
    'impact.impact'
)
.defines( function() {

    Item = ig.Class.extend({

        id: 0,
        name: "",
        description: "",
        itemType: "",
        owner: null,
        quantity: 1,
        minQuantity: 1,
        maxQuantity: 1,
        consumable: false,
        equippable: false,
        droppable: false,
        stackable: false,
        rarity: 0,
        icon: null,
        _eventUsed: null,

        init: function() {
            this._eventUsed = document.createEvent("Event");
            this._eventUsed.initEvent("itemUsed", false, false);
            this._eventUsed.item = this;
        },

        use: function() {
            document.dispatchEvent(this._eventUsed);
        },

        drawTooltip: function(x, y) {
            var strName = this.name+(this.quantity>1?" ("+this.quantity.addCommas()+")":"");
            var nameWidth = ig.game.assets.font_default.widthForString(strName);
            ig.game.assets.font_default.draw(strName,x,y-1);
            return {x: Math.floor(nameWidth+5),y: ig.game.assets.font_default.height+2}
        }
    });

    Gold = Item.extend({

        id: 0,
        name: "Gold",
        description: "You will need this even as a ninja",
        itemType: "gold",
        maxQuantity: 999999,
        droppable: true,
        rarity: 1,

        init:function(quantity) {
            this.parent();
            this.quantity = quantity;
            //this.icon = new ig.Animation(ig.game.assets.animSheet_otherIcons,0.1,[0]);
        }
    });
});
