/**
 * Created by Tianxu on 14-5-6.
 */
ig.module(
    'game.data.items.weapon'
)
.requires(
    'game.data.items.item'
)
.defines(function(){

    Weapon = Item.extend({

        name: 'Weapon',
        itemType: Item.TYPE.WEAPON,
        equippable: true,
        droppable: true,
        sellable: true,

        _indexOff: 0,

        minDamage: 0,
        maxDamage: 0,
        attackSpeed: 0,
        specialEffect: null,
        price: 0,

        init: function() {
            this.parent();
            this.itemID = this.type + this._indexOff;
            this.entityName = 'Entity' + this.name;
            this._animSheet = ig.game.assets.animSheet_item_icon;
            this.icon = new ig.Animation(this._animSheet, 0.1, [this.type]);
        }
    });

    Weapon.TYPE = {
        KATANA_0: 0,
        KATANA_1: 1,
        KATANA_2: 2,
        KATANA_3: 3,
        KATANA_4: 4,
        KATANA_5: 5,
        SWORD_0: 6,
        SWORD_1: 7,
        SWORD_2: 8,
        SWORD_3: 9,
        SWORD_4: 10,
        SWORD_5: 11
    };

    Katana_0 = Weapon.extend({
        name: 'Katana_0',
        minDamage: 3,
        maxDamage: 5,
        attackSpeed: 0.1,
        price: 120,
        type: Weapon.TYPE.KATANA_0
    });

    Katana_1 = Weapon.extend({
        name: 'Katana_1',
        minDamage: 2,
        maxDamage: 4,
        attackSpeed: 0.05,
        specialEffect: 'Add 20% life steal',
        price: 1200,
        type: Weapon.TYPE.KATANA_1
    });

    Katana_2 = Weapon.extend({
        name: 'Katana_2',
        minDamage: 6,
        maxDamage: 10,
        attackSpeed: 0.1,
        price: 1000,
        type: Weapon.TYPE.KATANA_2
    });


});