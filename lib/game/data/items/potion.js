/**
 * Created by Tianxu on 14-5-5.
 */
ig.module (
    'game.data.items.potion'
)
.requires (
    'game.data.items.item'
)
.defines ( function() {

    Potion = Item.extend({

        name: 'Potion',
        itemType: Item.TYPE.POTION,
        maxQuantity: 20,
        consumable: true,
        droppable: true,
        sellable: true,
        stackable: true,
        _indexOff: 72,

        recoverAmount: 0,
        price: 0,

        init: function() {
            this.parent();
            this.itemID = this.type + this._indexOff;
            this._animSheet = ig.game.assets.animSheet_item_icon;
            this.icon = new ig.Animation(this._animSheet, 1, [this.type], true);
        }
    });

    Potion.TYPE = {
        SMALL_HEALTH: 0,
        SMALL_MANA: 1,
        MEDIUM_HEALTH: 2,
        MEDIUM_MANA: 3,
        LARGE_HEALTH: 4,
        LARGE_MANA: 5,
        SUPER_HEALTH: 6,
        SUPER_MANA: 7
    };

    S_HP_Potion = Potion.extend({
        name: 'Potion_0',
        displayName: 'Small Health Potion',
        recoverAmount: 20,
        price: 10,
        type: Potion.TYPE.SMALL_HEALTH
    });

    S_MP_Potion = Potion.extend({
        name: 'Potion_1',
        displayName: 'Small Mana Potion',
        recoverAmount: 10,
        price: 10,
        type: Potion.TYPE.SMALL_MANA
    });

    M_HP_Potion = Potion.extend({
        name: 'Potion_2',
        displayName: 'Medium Health Potion',
        recoverAmount: 50,
        price: 20,
        type: Potion.MEDIUM_HEALTH
    });

    M_MP_Potion = Potion.extend({
        name: 'Potion_3',
        displayName: 'Medium Mana Potion',
        recoverAmount: 30,
        price: 20,
        type: Potion.MEDIUM_MANA
    });

    L_HP_Potion = Potion.extend({
        name: 'Potion_4',
        displayName: 'Large Health Potion',
        recoverAmount: 100,
        price: 50,
        type: Potion.LARGE_HEALTH
    });

    L_MP_Potion = Potion.extend({
        name: 'Potion_5',
        displayName: 'Large Mana Potion',
        recoverAmount: 60,
        price: 50,
        type: Potion.LARGE_MANA
    });

    XL_HP_Potion = Potion.extend({
        name: 'Potion_6',
        displayName: 'Super Health Potion',
        recoverAmount: 180,
        price: 80,
        type: Potion.SUPER_HEALTH
    });

    XL_MP_Potion = Potion.extend({
        name: 'Potion_7',
        displayName: 'Super Mana Potion',
        recoverAmount: 100,
        price: 80,
        type: Potion.SUPER_MANA
    });
});