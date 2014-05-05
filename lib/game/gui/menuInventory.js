/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.menuInventory'
)
.requires(
    'game.gui.menu',
    'game.gui.itemSlot',
    'game.data.inventory',
    'game.data.items.item'
)
.defines( function() {

    MenuInventory = Menu.extend({

        title: 'Inventory',

        init: function(title) {
            this.parent(title);
            this.bgImg = ig.game.assets.img_inventory_menu_bg;
            this.pos.x = ig.game.screen.x+ig.system.width/2;
            this.pos.y = ig.game.screen.y+(ig.system.height-this.bgImg.height)/2;
        },

        draw: function() {
            this.parent();
        }
    });
});