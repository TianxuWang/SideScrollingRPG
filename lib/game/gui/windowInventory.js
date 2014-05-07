/**
 * Created by Tianxu on 14-5-6.
 */
ig.module(
    'game.gui.window-inventory'
)
.requires(
    'game.data.spells.spell',
    'impact.impact'
)
.defines(function(){

    InventoryWindow = ig.Class.extend({

        _numCarrySlots:28,
        _numCarryCols:7,
        _carrySlots:[],

        init:function() {
            var self=this;
            for(var i=0;i<this._numCarrySlots;i++) {
                var slot=new ItemSlot();
                slot.drawBG=false;
                this._carrySlots.push(slot);
                slot.onLeftMousePress=function(){
                    self.onSlotPress(this);
                };
                slot.onLeftMouseRelease=function(){
                    self.onSlotRelease(this);
                };
            }
            var self=this;
            document.addEventListener("inventoryItemRemoved",function(){
                self.onItemChanged();
            },false);
            document.addEventListener("inventoryItemAdded",function(){
                self.onItemChanged();
            },false);
        },

        update:function() {
            var inv=ig.game.player.inventory;
            for(var i=0,len=inv.getNumItems();i<len;i++) {
                var slot=this._carrySlots[i];
                if(slot==null)
                    continue;
                slot.item=inv.getItem(i);
            }
        },

        draw:function(x,y) {
            ig.game.assets.img_win_inventory.draw(x,y);
            ig.game.assets.font_medGrey.draw(ig.game.player.inventory.gold.addCommas(),x+116,68,ig.Font.ALIGN.RIGHT);
            var col=0,row=0;
            var tx=x+13,ty=y+3;
            for(var i=0;i<this._numCarrySlots;i++) {
                var slot=this._carrySlots[i];
                slot.draw(tx,ty);
                if(++col>=this._numCarryCols) {
                    row++;
                    col=0;
                    tx=x+13;
                    ty+=slot._image.height;
                }
                else {
                    tx+=slot._image.width;
                }
            }
        },

        onSlotPress:function(slot) {
            var slotIndex=this._carrySlots.indexOf(slot);
            var item=slot.item;
            if(item!=null&&ig.game.cursorItem==null) {
                ig.game.player.inventory.removeItem(item);
                ig.game.cursorItem=item;
                slot.item=null;
            }
            ig.game.tooltip.hide();
        }

        ,onSlotRelease:function(slot) {
            if(ig.game.cursorItem==null)
                return;
            if(!this.isItemValidForSlot(slot,ig.game.cursorItem))
                return;
            if(ig.game.cursorItem.itemType=="gold") {
                ig.game.player.inventory.gold+=ig.game.cursorItem.quantity;
                ig.game.cursorItem=null;
                return;
            }
            var slotIndex=this._carrySlots.indexOf(slot);
            var currItem=ig.game.player.inventory.getItem(slotIndex);
            if (currItem!=null &&
                currItem.itemType==ig.game.cursorItem.itemType &&
                currItem.quantity<currItem.maxQuantity) {
                var newQty=currItem.quantity+ig.game.cursorItem.quantity;
                var remainder=newQty-currItem.maxQuantity;
                var toAdd=ig.game.cursorItem.quantity;
                var newQty=currItem.quantity+toAdd;
                if(newQty>currItem.maxQuantity) {
                    toAdd-=newQty-currItem.maxQuantity;
                    newQty=currItem.maxQuantity;
                }
                currItem.quantity=newQty;
                ig.game.cursorItem.quantity-=toAdd;
                if(ig.game.cursorItem.quantity<=0)
                    ig.game.cursorItem=null;
            }
            else {
                ig.game.player.inventory.removeItemAt(slotIndex);
                ig.game.player.inventory.addItem(ig.game.cursorItem,slotIndex);
                slot.item=ig.game.cursorItem;
                if(ig.game.player.inventory.isInQuickSlot(currItem))
                    currItem=null;
                ig.game.cursorItem=currItem;
            }
        },

        onItemChanged:function() {
            this.update();
        },

        isItemValidForSlot:function(slot,item) {
            if(item instanceof Spell)
                return false;
            return true;
        }
    });
});