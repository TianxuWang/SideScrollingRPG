/**
 * Created by Tianxu on 14-5-5.
 */
ig.module(
    'game.data.items.itemFactory'
)
.requires(
    'impact.impact',
    'game.data.items.weapon',
    'game.data.items.potion'
)
.defines(function() {

    ItemFactory = ig.Class.extend({

        owner: null,

        init: function(owner) {
            this.owner = owner;
        },

        generateItem: function(itemID) {
            if (itemID >= 0 && itemID < 36) {
                return this.generateWeapon(itemID);
            }
            else if (itemID >= 36 && itemID < 72) {
                return this.generateApparel(itemID);
            }
            else if (itemID >= 72 && itemID < 80) {
                return this.generatePotion(itemID);
            }
            return null;
        },

        generateWeapon: function(itemID) {
            switch (itemID) {
                case 0:
                    return new Katana_0();
                case 1:
                    return new Katana_1();
                case 2:
                    return new Katana_2();
                default:
                    return null
            }
        },

        generateApparel: function(itemID) {

        },

        generatePotion: function(itemID) {

        }
    });
});