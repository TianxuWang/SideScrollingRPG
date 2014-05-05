/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.menuStats'
)
.requires(
    'game.gui.menu',
    'game.gui.itemSlot',
    'game.data.inventory',
    'game.data.items.item'
)
.defines( function() {

    MenuStats = Menu.extend({

        title: 'Stats/Equipment',

        init: function(title) {
            this.parent(title);
            this.menuFont = ig.game.assets.font_black;
            this.nameFont = ig.game.assets.font_black_border_grayishOrange;
            this.bgImg = ig.game.assets.img_stats_menu_bg;
            this.pos.x = ig.game.screen.x+ig.system.width/2-this.bgImg.width;
            this.pos.y = ig.game.screen.y+(ig.system.height-this.bgImg.height)/2;
        },

        draw: function() {
            this.parent();

            var player = ig.game.player;
            var atkObj = player.getAverageDamage();
            switch (atkObj.type) {
                case EntityWeapon.EFFECT_TYPE.POISON:
                    this.atkFont = ig.game.assets.font_green;
                    break;
                case EntityWeapon.EFFECT_TYPE.FREEZE:
                    this.atkFont = ig.game.assets.font_blue;
                    break;
                case EntityWeapon.EFFECT_TYPE.IGNITE:
                    this.atkFont = ig.game.assets.font_red;
                    break;
                default:
                    this.atkFont = this.menuFont;
                    break;
            }

            this.nameFont.draw(player.name, this.pos.x+35, this.pos.y+15, ig.Font.ALIGN.CENTER);
            this.menuFont.draw(Math.floor(player.health)+'/'+player.maxHealth, this.pos.x+57, this.pos.y+28, ig.Font.ALIGN.RIGHT);
            this.menuFont.draw(Math.floor(player.mana)+'/'+player.maxMana, this.pos.x+57, this.pos.y+38, ig.Font.ALIGN.RIGHT);
            this.menuFont.draw(player.curExp+'/'+player.expToNextLvl, this.pos.x+57, this.pos.y+48, ig.Font.ALIGN.RIGHT);
            this.atkFont.draw(atkObj.value, this.pos.x+57, this.pos.y+58, ig.Font.ALIGN.RIGHT);
            this.menuFont.draw(player._defence, this.pos.x+57, this.pos.y+68, ig.Font.ALIGN.RIGHT);
        }
    });
});