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

        itemID: 0,
        name: "",
        displayName: "",
        description: "",
        type: 0,
        itemType: null,
        owner: null,
        quantity: 1,
        minQuantity: 1,
        maxQuantity: 1,
        consumable: false,
        equippable: false,
        droppable: false,
        stackable: false,
        sellable: false,
        rarity: 0,
        icon: null,
        _animSheet: null,
        _eventUsed: null,

        init: function() {
            this._eventUsed = document.createEvent("Event");
            this._eventUsed.initEvent("itemUsed", false, false);
            this._eventUsed.item = this;
        },

        use: function() {
            document.dispatchEvent(this._eventUsed);

            var player = ig.game.player;
            if (!ig.game.menuTrade.display || ig.game.menuStats.display) {   // not in a trade
                if (this.equippable) {
                    var slot = ig.game.menuStats['_slot_' + this.itemType];
                    if (ig.game.menuStats.isItemValidForSlot(slot, this)) {
                        var tmp = player.equipments[this.itemType];
                        player.equipments[this.itemType] = player.inventory.removeItem(this);
                        player.updateEquipment();
                        player.inventory.addItem(tmp);
                    }
                    else
                        console.log('Cannot equip ' + this.type);
                }
                if (this.consumable) {
                    //this.takeEffect();
                }
            }
            else {
                this.owner.sell(this);
            }

        },

        drawTooltip: function(x, y) {
            var strName = this.displayName+(this.quantity>1?" ("+this.quantity+")":"");
            var nameWidth = ig.game.assets.font_default.widthForString(strName);
            ig.game.assets.font_default.draw(strName,x,y-1);
            return {x: Math.floor(nameWidth+5),y: ig.game.assets.font_default.height+2}
        }
    });

    Item.TYPE = {
        MAINHAND: 'mainHand',
        OFFHAND: 'offHand',
        HEAD: 'head',
        BODY: 'body',
        LEG: 'leg',
        FEET: 'feet',
        NECKLACE: 'necklace',
        RING: 'ring',
        POTION: 'potion'
    };

    Item.RARITY = {
        NORMAL: 'default',
        MAGIC: 'blue',
        RARE: 'gold',
        UNIQUE: 'darkOrange'
    };
});
