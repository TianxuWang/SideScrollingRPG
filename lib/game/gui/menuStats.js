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
        _slots: [],
        _slot_head: null,
        _slot_body: null,
        _slot_leg: null,
        _slot_feet: null,
        _slot_mainHand: null,
        _slot_offHand: null,
        _slot_necklace: null,
        _slot_ring1: null,
        _slot_ring2: null,

        init: function(title) {
            this.parent(title);
            this.menuFont = ig.game.assets.font_black;
            this.nameFont = ig.game.assets.font_black_border_grayishOrange;
            this.bgImg = ig.game.assets.img_stats_menu_bg;
            this.pos.x = ig.game.screen.x+ig.system.width/2-this.bgImg.width;
            this.pos.y = ig.game.screen.y+(ig.system.height-this.bgImg.height)/2;

            this._slot_head = new ItemSlot();
            this._slot_body = new ItemSlot();
            this._slot_leg = new ItemSlot();
            this._slot_feet = new ItemSlot();
            this._slot_mainHand = new ItemSlot();
            this._slot_offHand = new ItemSlot();
            this._slot_necklace = new ItemSlot();
            this._slot_ring1 = new ItemSlot();
            this._slot_ring2 = new ItemSlot();
            this._slots = [
                this._slot_head,
                this._slot_body,
                this._slot_leg,
                this._slot_feet,
                this._slot_mainHand,
                this._slot_offHand,
                this._slot_necklace,
                this._slot_ring1,
                this._slot_ring2
            ];

            var self = this;
            for(var i = 0; i < this._slots.length; i++) {
                var slot = this._slots[i];
                slot.drawBG = false;
                slot.onLeftMousePress=function(){
                    self.onEquipmentSlotPress(this);
                };
                slot.onLeftMouseRelease=function(){
                    self.onEquipmentSlotRelease(this);
                };
            }
        },

        update: function() {
            this._slot_head.item = ig.game.player.equipments.head;
            this._slot_body.item = ig.game.player.equipments.body;
            this._slot_leg.item = ig.game.player.equipments.leg;
            this._slot_feet.item = ig.game.player.equipments.feet;
            this._slot_mainHand.item = ig.game.player.equipments.mainHand;
            this._slot_offHand.item = ig.game.player.equipments.offHand;
            this._slot_necklace.item = ig.game.player.equipments.necklace;
            this._slot_ring1.item = ig.game.player.equipments.ring1;
            this._slot_ring2.item = ig.game.player.equipments.ring2;
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

            this._slot_head.draw(this.pos.x+80, this.pos.y+8);
            if (!this._slot_head.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+81, this.pos.y+9, 0, 16);
            this._slot_body.draw(this.pos.x+80, this.pos.y+26);
            if (!this._slot_body.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+81, this.pos.y+27, 2, 16);
            this._slot_leg.draw(this.pos.x+80, this.pos.y+44);
            if (!this._slot_leg.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+81, this.pos.y+45, 5, 16);
            this._slot_feet.draw(this.pos.x+80, this.pos.y+62);
            if (!this._slot_feet.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+81, this.pos.y+63, 7, 16);
            this._slot_mainHand.draw(this.pos.x+62, this.pos.y+44);
            if (!this._slot_mainHand.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+63, this.pos.y+45, 4, 16);
            this._slot_offHand.draw(this.pos.x+98, this.pos.y+44);
            if (!this._slot_offHand.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+99, this.pos.y+45, 6, 16);
            this._slot_necklace.draw(this.pos.x+98, this.pos.y+8);
            if (!this._slot_necklace.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+99, this.pos.y+9, 1, 16);
            this._slot_ring1.draw(this.pos.x+62, this.pos.y+26);
            if (!this._slot_ring1.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+63, this.pos.y+27, 3, 16);
            this._slot_ring2.draw(this.pos.x+98, this.pos.y+26);
            if (!this._slot_ring2.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+99, this.pos.y+27, 3, 16);
        },

        onEquipmentSlotPress: function(slot) {
            var item = slot.item;
            var player = ig.game.player;
            if(item && !ig.game.cursorItem) {
                slot.item = null;
                ig.game.cursorItem = item;
                switch(slot) {
                    case this._slot_mainHand:
                        player.equipments.mainHand = null;
                        break;
                    case this._slot_offHand:
                        player.equipments._slot_offHand = null;
                        break;
                    case this._slot_ring1:
                        player.equipments._slot_ring1 = null;
                        break;
                    case this._slot_ring2:
                        player.equipments.ring2 = null;
                        break;
                    default:
                        player.equipments[item.itemType] = null;
                        break;
                }
            }
        },

        onEquipmentSlotRelease: function(slot) {
            if(!ig.game.cursorItem)
                return;
            if(!this.isItemValidForSlot(slot,ig.game.cursorItem))
                return;

            if (!slot.item) {
                slot.item = ig.game.cursorItem;
                ig.game.cursorItem = null;
            }
            else {
                var tmp = slot.item;
                slot.item = ig.game.cursorItem;
                ig.game.cursorItem = tmp;
            }
            var player = ig.game.player;
            if(slot.item) {
                switch(slot) {
                    case this._slot_mainHand:
                        player.equipments.mainHand = slot.item;
                        break;
                    case this._slot_offHand:
                        player.equipments.offHand = slot.item;
                        break;
                    case this._slot_ring1:
                        player.equipments.ring1 = slot.item;
                        break;
                    case this._slot_ring2:
                        player.equipments.ring2 = slot.item;
                        break;
                    default:
                        player.equipments[slot.item.itemType] = slot.item;
                        break;
                }
                player.updateEquipment();
            }
        },

        isItemValidForSlot: function(slot, item) {
            switch(slot) {
                case this._slot_head:
                    return item.itemType == Item.TYPE.HEAD;
                case this._slot_body:
                    return item.itemType == Item.TYPE.BODY;
                case this._slot_leg:
                    return item.itemType == Item.TYPE.LEG;
                case this._slot_feet:
                    return item.itemType == Item.TYPE.FEET;
                case this._slot_mainHand:
                    return item.itemType == Item.TYPE.WEAPON;
                case this._slot_offHand:
                    return item.itemType == Item.TYPE.WEAPON;
                case this._slot_necklace:
                    return item.itemType == Item.TYPE.NECKLACE;
                default:
                    return item.itemType == Item.TYPE.RING;
            }
        }
    });
});