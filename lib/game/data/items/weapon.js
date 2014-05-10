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
        itemType: Item.TYPE.MAINHAND,
        equippable: true,
        droppable: true,
        sellable: true,
        attributes: null,

        _indexOff: 0,
        _iconIndex: 0,

        _minDamage: 0,
        _maxDamage: 0,
        _attackSpeed: 0,
        specialEffect: null,
        price: 0,

        init: function() {
            this.parent();
            this.itemID = this._iconIndex + this._indexOff;
            this.entityName = 'Entity' + this.name;
            this._animSheet = ig.game.assets.animSheet_item_icon;
            this.icon = new ig.Animation(this._animSheet, 0.1, [this._iconIndex]);
        },

        drawTooltip: function(x, y) {
            var tx = x + 3;
            var ty = y + 3;
            var maxWidth;
            ig.game.assets.img_stats_menu_bg.draw(tx, ty, 63, 9, 16, 16);
            this.icon.draw(tx, ty);
            tx += 18;
            ty += 3;
            var typeWidth = ig.game.assets.font_default.widthForString(this.type);
            var nameWidth = ig.game.assets.font_default.widthForString(this.displayName);
            ig.game.assets.font_darkGrey.draw(this.type, tx, ty);
            ty += 8;
            ig.game.assets['font_'+this.rarity].draw(this.displayName,tx,ty);
            maxWidth = tx + Math.max(typeWidth, nameWidth) + 2;
            tx = x + 3;
            ty += 10;
            if(this._minDamage > 0 && this._maxDamage > 0) {
                var strDamage = this.getDamageString();
                var valWidth=ig.game.assets.font_default.widthForString(strDamage);
                ig.game.assets.font_default.draw(strDamage,tx,ty);
                tx += valWidth+3;
            }
            if(this.owner && this.owner.equipments.mainHand != this) {
                var currRating = this.owner.activeWeapon ? this.owner.getAverageDamage().value:0;
                var ratingDiff = (this.owner.getAverageDamage(this).value-currRating).round(1);
                var diffWidth = 0;
                if (ratingDiff > 0) {
                    diffWidth = ig.game.assets.font_default.widthForString('(+'+ratingDiff+')');
                    ig.game.assets.font_green.draw('(+'+ratingDiff+')',tx,ty);
                }
                else if (ratingDiff < 0) {
                    diffWidth = ig.game.assets.font_default.widthForString('('+ratingDiff+')');
                    ig.game.assets.font_red.draw('('+ratingDiff+')',tx,ty);
                }
                tx += diffWidth+3;
            }
            ig.game.assets.font_darkGrey.draw('Damage', tx, ty);
            tx = x + 3;
            ty += 8;
            var attackSpeedNumWidth = ig.game.assets.font_default.widthForString(this._attackSpeed.toString());
            ig.game.assets.font_default.draw(this._attackSpeed, tx, ty);
            tx += attackSpeedNumWidth+3;
            var attackSpeedStrWidth = ig.game.assets.font_default.widthForString('Attack per Second');
            ig.game.assets.font_darkGrey.draw('Attack per Second', tx, ty);
            tx += attackSpeedStrWidth;
            maxWidth = Math.max(maxWidth, tx);
            tx = x + 3;
            ty += 10;
            // Add attributes string
            if (this.attributes) {
                var attributeWidth = 0;
                for (var i = 0; i < this.attributes.length; i++) {
                    attributeWidth = ig.game.assets.font_brown.widthForString(this.attributes[i]);
                    ig.game.assets.font_brown.draw(this.attributes[i], tx, ty);
                    maxWidth = Math.max(maxWidth, tx+attributeWidth);
                    ty += 8;
                }
            }

            return {x:Math.floor(maxWidth-x+3),y:Math.floor(ty-y+3)};
        },

        getDamageString: function() {
            return this._minDamage + '-' + this._maxDamage;
        }
    });

    Weapon.TYPE = {
        KATANA: 'Katana',
        NINJATO: 'Ninjato',
        SWORD: 'Sword',
        SPEAR: 'Spear',
        DAGGER: 'Dagger',
        BOW: 'Bow',
        WAND: 'Wand'
    };

    Katana_0 = Weapon.extend({
        name: 'Katana_0',
        displayName: 'Isana',
        type: Weapon.TYPE.KATANA,
        _iconIndex: 0,
        _minDamage: 3,
        _maxDamage: 5,
        _attackSpeed: (1/(0.1*6)).round(2),
        rarity: Item.RARITY.MAGIC,
        price: 120
    });

    Katana_1 = Weapon.extend({
        name: 'Katana_1',
        displayName: 'Suo',
        attributes: [
            '# +20% life steal'
        ],
        type: Weapon.TYPE.KATANA,
        _iconIndex: 1,
        _minDamage: 2,
        _maxDamage: 4,
        _attackSpeed: (1/(0.05*6)).round(2),
        specialEffect: {
            poison: { chance: 0, value: 0, lastTime: 0 },
            freeze: { chance: 0, value: 0, lastTime: 0 },
            ignite: { chance: 0, value: 0, lastTime: 0 },
            lifeSteal: 0.2,
            manaSteal: 0
        },
        rarity: Item.RARITY.UNIQUE,
        price: 1200
    });

    Katana_2 = Weapon.extend({
        name: 'Katana_2',
        displayName: 'Oni-maru',
        type: Weapon.TYPE.KATANA,
        _iconIndex: 2,
        _minDamage: 6,
        _maxDamage: 10,
        _attackSpeed: (1/(0.1*6)).round(2),
        rarity: Item.RARITY.RARE,
        price: 1000
    });


});