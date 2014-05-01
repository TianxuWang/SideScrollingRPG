/**
 * Created by Tianxu on 14-4-30.
 */
ig.module(
    'game.data.inventory'
)
.requires(
    'impact.impact'
)
.defines( function() {

    Inventory = ig.Class.extend({

        owner: null,
        gold: 0,
        _quickSlots: [],
        _numQuickSlots: 10,
        _items: [],
        _maxItems: 20,
        _eventRemoved: null,
        _eventQuickSlotChanged: null,

        init: function(owner,maxItems,numQuickSlots) {
            this.owner = owner;
            this._maxItems = maxItems;
            this._numQuickSlots = numQuickSlots;
            for(var i = 0;i < this._maxItems;i++) {
                this._items[i] = null;
            }
            this._eventRemoved = document.createEvent("Event");
            this._eventRemoved.initEvent("inventoryItemRemoved", true, true);
            this._eventQuickSlotChanged = document.createEvent("Event");
            this._eventQuickSlotChanged.initEvent("inventoryQuickSlotChanged", true, true);

            var self = this;
            document.addEventListener("itemUsed", function(e) {
                if(self.contains(e.item))
                    self.onItemUsed(e.item);
            },false);
        },

        addItem: function(item,index) {
            var currItem;
            if(index == undefined) {
                for(var i = 0;i < this._items.length;i++) {
                    currItem = this._items[i];
                    if(currItem != null && currItem.itemType == item.itemType && currItem.quantity < currItem.maxQuantity) {
                        index = i;
                        break;
                    }
                }
                if(index == undefined)
                    index = this.getFirstEmptySlot();

                if(index == -1) // Inventory full
                    return;
            }

            if(this.isInQuickSlot(item))
                this.removeFromQuickSlot(item);

            if(index < 0 || index >= this._maxItems)
                return;

            if(this._items.indexOf(item) > -1)
                return;

            currItem = this._items[index];
            if (currItem != null && currItem.itemType == item.itemType)
                currItem.quantity++;
            else
                this._items[index] = item;

            item.owner = this.owner;
        },

        contains: function(item) {
            for(var i = 0; i < this._items.length; i++) {
                if(this._items[i] == item)
                    return true;
            }
            for(var j = 0; i < this._quickSlots.length; i++) {
                if(this._quickSlots[j] == item)
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

        getNumItems: function() {
            return this._items.length;
        },

        getItem: function(index) {
            if(index < 0 || index >= this._items.length)
                return null;
            return this._items[index];
        },

        getItemIndex: function(item) {
            for(var i = 0; i < this._items.length; i++) {
                if(this._items[i] == item)
                    return i;
            }
            return -1;
        },

        removeItem: function(item) {
            var index=this.getItemIndex(item);
            if(index==-1)
                return null;
            return this.removeItemAt(index);
        },

        removeItemAt: function(index) {
            if(index<0||index>=this._items.length)
                return null;
            var item = this._items[index];
            if (item != null)
                item.owner = null;
            this._items[index] = null;
            document.dispatchEvent(this._eventRemoved);
            return item;
        },

        isInQuickSlot: function(item) {
            for(var i=0, len = this._quickSlots.length; i < len; i++) {
                if(this._quickSlots[i] == item)
                    return true;
            }
            return false;
        },

        getQuickSlot: function(index) {
            if(index < 0 || index >= this._numQuickSlots)
                return null;
            return this._quickSlots[index];
        },

        setQuickSlot: function(index,item) {
            if(index < 0 || index >= this._numQuickSlots)
                return;
            this._quickSlots[index] = item;
            if(item != null)
                item.owner = this.owner;
            this._eventQuickSlotChanged.owner = this.owner;
            this._eventQuickSlotChanged.slotIndex = index;
            this._eventQuickSlotChanged.item = item;
            document.dispatchEvent(this._eventQuickSlotChanged);
        },

        removeFromQuickSlot: function(item) {
            //var changed = false;
            for (var i = 0; i < this._quickSlots.length; i++) {
                if (this._quickSlots[i] == item) {
                    var currItem = this._quickSlots[i];
                    this._quickSlots[i] = null;
                    if (currItem != null && currItem.quantity > 0)
                        this.addItem(currItem);

                    this._eventQuickSlotChanged.owner = this.owner;
                    this._eventQuickSlotChanged.slotIndex = i;
                    this._eventQuickSlotChanged.item = null;
                    document.dispatchEvent(this._eventQuickSlotChanged);
                }
            }
        },

        onItemUsed:function(item) {
            if(item.quantity == 0 && item.consumeable) {
                this.removeItem(item);
                this.removeFromQuickSlot(item);
                item.owner = null;
            }
        }
    });
});