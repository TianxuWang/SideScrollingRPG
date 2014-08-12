/**
 * Created by Tianxu on 14-8-11.
 */
ig.module(
    'game.gui.textMoney'
)
.requires(
    'game.gui.text'
)
.defines( function() {

    TextMoney = Text.extend({

        coinIcon: null,
        _lastDelay: 5,

        init: function() {
            this.parent(
                0,
                ig.system.width-20,
                ig.system.height-15,
                ig.Font.ALIGN.RIGHT
            );
            this.coinIcon = ig.game.assets.img_gold_icon;
        },

        update: function() {
            this.content = ig.game.player.inventory.gold;
            this.parent();
        },

        draw: function() {
            this.parent();
            var moneyIconPosX = ig.system.width-28-this.font.widthForString(this.content.toString());
            this.coinIcon.draw(moneyIconPosX, ig.system.height-15);
        },

        showAndFade: function() {
            this.show(this._lastDelay);
        },

        showAndStay: function() {
            this.show(0)
        }

    });
});
