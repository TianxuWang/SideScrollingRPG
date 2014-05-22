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
        _slots:[],
        _slotsNum: 24,
        _rowNum: 4,
        _columnNum: 6,

        init: function(title) {
            this.bgImg = ig.game.assets.img_inventory_menu_bg;
            this.coinIcon = ig.game.assets.img_gold_icon;
            this.parent(title);
            this.pos.x = ig.game.screen.x+ig.system.width/2;
            this.pos.y = ig.game.screen.y+(ig.system.height-this.bgImg.height)/2;

            var self = this;
            for (var i = 0; i < this._slotsNum; i++) {
                var slot = new ItemSlot();
                slot.drawBG = false;
                this._slots.push(slot);
                slot.onLeftMousePress = function(){
                    self.onSlotPress(this);
                };
                slot.onLeftMouseRelease = function(){
                    self.onSlotRelease(this);
                };
            }

            document.addEventListener("inventoryItemRemoved",function(){
                self.onItemChanged();
            },false);
            document.addEventListener("inventoryItemAdded",function(){
                self.onItemChanged();
            },false);
        },

        update: function() {
            var inv = ig.game.player.inventory;
            for (var i = 0,len = inv.getItemNum(); i < len; i++) {
                var slot = this._slots[i];
                if (slot)
                    slot.item = inv.getItemByIndex(i);
            }
        },

        draw: function() {
            this.parent();

            var col = 0, row = 0;
            var tx = this.pos.x+8, ty = this.pos.y+8;
            for(var i = 0; i < this._slotsNum; i++) {
                var slot = this._slots[i];
                slot.draw(tx, ty);
                if (++col >= this._columnNum) {
                    row++;
                    col = 0;
                    tx = this.pos.x+9;
                    ty += slot.height;
                }
                else {
                    tx += slot.width;
                }
            }

            // draw money
            var money = ig.game.player.inventory.gold;
            this.menuFont.draw(money, ig.system.width-20, ig.system.height-15, ig.Font.ALIGN.RIGHT);
            var moneyIconPosX = ig.system.width-28-this.menuFont.widthForString(money.toString());
            this.coinIcon.draw(moneyIconPosX, ig.system.height-15);
        },

        onSlotPress: function(slot) {
            var item = slot.item;
            if(item && !ig.game.cursorItem) {
                ig.game.player.inventory.removeItem(item);
                ig.game.cursorItem = item;
                slot.item = null;
            }
            ig.game.tooltip.hide();
        },

        onSlotRelease: function(slot) {
            if(!ig.game.cursorItem)
                return;
            var slotIndex = this._slots.indexOf(slot);
            var currItem = ig.game.player.inventory.getItemByIndex(slotIndex);
            if (currItem && currItem.stackable &&
                currItem.itemID == ig.game.cursorItem.itemID &&
                currItem.quantity < currItem.maxQuantity) {
                //var newQty = currItem.quantity + ig.game.cursorItem.quantity;
                //var remainder= newQty - currItem.maxQuantity;
                var toAdd = ig.game.cursorItem.quantity;
                var newQty = currItem.quantity + toAdd;
                if( newQty > currItem.maxQuantity) {
                    toAdd -= newQty-currItem.maxQuantity;
                    newQty = currItem.maxQuantity;
                }
                currItem.quantity = newQty;
                ig.game.player.inventory._indexToNum[currItem.itemID] = newQty;
                ig.game.cursorItem.quantity -= toAdd;
                if(ig.game.cursorItem.quantity <= 0)
                    ig.game.cursorItem = null;
            }
            else {
                ig.game.player.inventory.removeItemAt(slotIndex);
                ig.game.player.inventory.addItem(ig.game.cursorItem,slotIndex);
                slot.item = ig.game.cursorItem;
                ig.game.cursorItem = currItem;
            }
        },

        onItemChanged: function() {
            this.update();
        }
    });
});