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

        _minDamage: 0,
        _maxDamage: 0,
        _attackSpeed: 0,
        specialEffect: {
            poison: { chance: 0, value: 0, lastTime: 0 },
            freeze: { chance: 0, value: 0, lastTime: 0 },
            ignite: { chance: 0, value: 0, lastTime: 0 },
            lifeSteal: 0,
            manaSteal: 0
        },
        price: 0,

        init: function() {
            this.parent();
            this.itemID = this.type + this._indexOff;
            this.entityName = 'Entity' + this.name;
            this._animSheet = ig.game.assets.animSheet_item_icon;
            this.icon = new ig.Animation(this._animSheet, 0.1, [this.type]);
        },

        drawTooltip: function(x, y) {
            var tx = x;
            var ty = y-1;
            var maxWidth = 0;
            var nameWidth = ig.game.assets.font_default.widthForString(this.displayName);
            ig.game.assets.font_default.draw(this.displayName,tx,ty);
            //tx += nameWidth;
            //var strLvlLabelWidth=ig.game.assets.font_brown.widthForString("LVL");
            //var strLvlWidth=ig.game.assets.font_medGrey.widthForString(this.level.toString());
            //var spacing=2;
            //ig.game.assets.font_brown.draw("LVL",tx+spacing+2,ty);
            //ig.game.assets.font_medGrey.draw(this.level,tx+strLvlLabelWidth+spacing*2+2,ty);
            //tx+=strLvlLabelWidth+strLvlWidth+spacing*3;
            maxWidth=tx+2;
            tx=x+3;
            ty+=7;
            if(this._minDamage > 0 && this._maxDamage > 0) {
                var strDamage = this.getDamageString();
                var valWidth=ig.game.assets.font_default.widthForString(strDamage);
                //ig.game.assets.img_iconsSkills.drawTile(tx,ty-3,2,12);
                ig.game.assets.font_default.draw(strDamage,tx+11,ty);
                tx += valWidth+13;
            }
            if(this.owner && this.owner.equipments.mainHand != this) {
                tx -= 2;
                var currRating = this.owner.activeWeapon ? this.owner.getAverageDamage().value:0;
                var ratingDiff = (this.owner.getAverageDamage(this).value-currRating).round(1);
                if (ratingDiff > 0) {
                    ig.game.assets.font_green.draw("(+"+ratingDiff+")",tx+4,ty);
                }
                else if (ratingDiff < 0) {
                    ig.game.assets.font_red.draw("("+ratingDiff+")",tx+4,ty);
                }
            }
            if(tx > maxWidth)
                maxWidth = tx;
            return {x:Math.floor(maxWidth-x+3),y:Math.floor(ty+12-y)};
        },

        getDamageString: function() {
            return this._minDamage + '-' + this._maxDamage;
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
        displayName: 'Isana',
        _minDamage: 3,
        _maxDamage: 5,
        _attackSpeed: 0.1,
        price: 120,
        type: Weapon.TYPE.KATANA_0
    });

    Katana_1 = Weapon.extend({
        name: 'Katana_1',
        displayName: 'Suo',
        description: 'Add 20% life steal',
        _minDamage: 2,
        _maxDamage: 4,
        _attackSpeed: 0.05,
        specialEffect: {
            poison: { chance: 0, value: 0, lastTime: 0 },
            freeze: { chance: 0, value: 0, lastTime: 0 },
            ignite: { chance: 0, value: 0, lastTime: 0 },
            lifeSteal: 0.2,
            manaSteal: 0
        },
        price: 1200,
        type: Weapon.TYPE.KATANA_1
    });

    Katana_2 = Weapon.extend({
        name: 'Katana_2',
        displayName: 'Oni-maru',
        _minDamage: 6,
        _maxDamage: 10,
        _attackSpeed: 0.1,
        price: 1000,
        type: Weapon.TYPE.KATANA_2
    });


});