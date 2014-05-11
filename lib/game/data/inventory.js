/**
 * Created by Tianxu on 14-4-30.
 */
ig.module(
    'game.data.inventory'
)
.requires(
    'impact.impact',
    'game.data.items.itemFactory'
)
.defines( function() {

    Inventory = ig.Class.extend({

        owner: null,
        gold: 0,
        _items: [],
        _maxItems: 20,
        _indexToNum: [],
        _totalItemNum: 80,
        _eventRemoved: null,
        _itemFactory: null,

        init: function(owner, maxItems) {
            this.owner = owner;
            this._itemFactory = new ItemFactory(this.owner);
            this._maxItems = maxItems ? maxItems : this._maxItems;
            for (var i = 0; i < this._maxItems; i++) {
                this._items[i] = null;
            }
            for (var j = 0; j< this._totalItemNum; j++) {
                this._indexToNum[j] = 0;
            }
            this._eventRemoved = document.createEvent("Event");
            this._eventRemoved.initEvent("inventoryItemRemoved", true, true);

            var self = this;
            document.addEventListener("itemUsed", function(e) {
                if(self.contains(e.item))
                    self.onItemUsed(e.item);
            }, false);
        },

        addItem: function(item, index) {
            if (!item)
                return false;

            var currItem;
            if(!index) {
                if (item.stackable) {
                    for(var i = 0;i < this._items.length;i++) {
                        currItem = this._items[i];
                        if(currItem && currItem.itemID == item.itemID && currItem.quantity < currItem.maxQuantity) {
                            index = i;
                            break;
                        }
                    }
                    if(!index)
                        index = this.getFirstEmptySlot();
                }
                else
                    index = this.getFirstEmptySlot();

                if(index == -1) // Inventory full
                    return false;
            }

            if(index < 0 || index >= this._maxItems)
                return false;

            currItem = this._items[index];
            if (currItem && currItem.stackable &&
                currItem.itemID == item.itemID && currItem.quantity < currItem.maxQuantity){
                currItem.quantity++;
                this._indexToNum[item.itemID]++;
            }
            else
                this._items[index] = item;

            this._items[index].owner = this.owner;
            return true;
        },

        contains: function(item) {
            for(var i = 0; i < this._items.length; i++) {
                if(this._items[i] == item)
                    return true;
            }

            return false;
        },

        getFirstEmptySlot: function() {
            for(var i = 0; i < this._items.length; i++) {
                if(this._items[i] == null)
                    return i;
            }
            return -1;  // Inventory full
        },

        getItemNum: function() {
            return this._items.length;
        },

        getItemByID: function(itemID) {
            if (!this.contains(itemID))
                return null;
            for (var i = 0; i < this._items.length; i++) {
                if (this._items[i].itemID == itemID)
                    return this._items[i];
            }
            return null;
        },

        getItemByIndex: function(index) {
            if (index < 0 || index >= this._items.length)
                return null;
            return this._items[index];
        },

        getItemIndex: function(item) {
            return this._items.indexOf(item);
        },

        removeItem: function(item) {
            var index = this.getItemIndex(item);
            if (index==-1)
                return null;
            return this.removeItemAt(index);
        },

        removeItemAt: function(index) {
            if(index < 0||index >= this._items.length)
                return null;
            var item = this._items[index];
            if (item != null)
                item.owner = null;
            this._items[index] = null;
            document.dispatchEvent(this._eventRemoved);
            return item;
        },

        onItemUsed:function(item) {
            if(item.quantity == 0 && item.consumeable) {
                this.removeItem(item);
                item.owner = null;
            }
        }
    });
});