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
        _slot_ring: null,

        init: function(title) {
            this.bgImg = ig.game.assets.img_stats_menu_bg;
            this.parent(title);
            this.menuFont = ig.game.assets.font_black;
            this.nameFont = ig.game.assets.font_black_border_grayishOrange;
            this.pos.x = ig.game.screen.x+ig.system.width/2-this.bgImg.width;
            this.pos.y = ig.game.screen.y+(ig.system.height-this.bgImg.height)/2;

            this._slot_head = new ItemSlot(Item.TYPE.HEAD);
            this._slot_body = new ItemSlot(Item.TYPE.BODY);
            this._slot_leg = new ItemSlot(Item.TYPE.LEG);
            this._slot_feet = new ItemSlot(Item.TYPE.FEET);
            this._slot_mainHand = new ItemSlot(Item.TYPE.MAINHAND, [Weapon.TYPE.KATANA, Weapon.TYPE.NINJATO]);
            this._slot_offHand = new ItemSlot(Item.TYPE.OFFHAND);
            this._slot_necklace = new ItemSlot(Item.TYPE.NECKLACE);
            this._slot_ring = new ItemSlot(Item.TYPE.POTION);
            this._slots = [
                this._slot_head,
                this._slot_body,
                this._slot_leg,
                this._slot_feet,
                this._slot_mainHand,
                this._slot_offHand,
                this._slot_necklace,
                this._slot_ring
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
            this._slot_ring.item = ig.game.player.equipments.ring;
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
            this.menuFont.draw(Math.floor(player.health)+'/'+player.healthMax, this.pos.x+57, this.pos.y+28, ig.Font.ALIGN.RIGHT);
            this.menuFont.draw(Math.floor(player.mana)+'/'+player.manaMax, this.pos.x+57, this.pos.y+38, ig.Font.ALIGN.RIGHT);
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
            this._slot_ring.draw(this.pos.x+62, this.pos.y+26);
            if (!this._slot_ring.item)
                ig.game.assets.img_equipment_bg_icon.drawTile(this.pos.x+63, this.pos.y+27, 3, 16);
        },

        onEquipmentSlotPress: function(slot) {
            var item = slot.item;
            var player = ig.game.player;
            if(item && !ig.game.cursorItem) {
                slot.item = null;
                ig.game.cursorItem = item;
                player.equipments[item.itemType] = null;
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
            if(slot.item) {
                ig.game.player.equipments[slot.item.itemType] = slot.item;
            }
            ig.game.player.updateEquipment();
        },

        isItemValidForSlot: function(slot, item) {
            return slot._itemType == item.itemType && slot._types.indexOf(item.type) != -1;
        }
    });
});