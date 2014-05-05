/**
 * Created by Tianxu on 14-5-4.
 */
ig.module(
    'game.gui.windowEquipment'
)
.requires(
    'impact.impact',
    //'game.data.items.apparel',
    //'game.data.items.weapons',
    'game.gui.itemSlot'
    //'game.gui.tooltiparea'
)
.defines( function() {

    EquipmentWindow = ig.Class.extend({

        _slots:[],
        _slot_weapon:null,
        _slot_head:null,
        _slot_body:null,
        _slot_jewelry1:null,
        _slot_jewelry2:null,
        //_tooltip_health:null,
        //_tooltip_magic:null,
        //_tooltip_strength:null,

        init:function() {
            this._slot_head=new ItemSlot();
            this._slot_body=new ItemSlot();
            this._slot_jewelry1=new ItemSlot();
            this._slot_jewelry2=new ItemSlot();
            this._slot_weapon=new ItemSlot();
            this._slots=[
                this._slot_head,
                this._slot_body,
                this._slot_jewelry1,
                this._slot_jewelry2,
                this._slot_weapon
            ];
            var self=this;
            for(var i=0;i<this._slots.length;i++) {
                var slot=this._slots[i];
                slot.drawBG=false;
                slot.onLeftMousePress=function(){
                    self.onEquipmentSlotPress(this);
                };
                slot.onLeftMouseRelease=function(){
                    self.onEquipmentSlotRelease(this);
                };
            }
            //this._tooltip_health=new TooltipArea(2,15,34,8,"Health");
            //this._tooltip_magic=new TooltipArea(2,25,34,8,"Mana");
            //this._tooltip_strength=new TooltipArea(2,33,34,8,"Strength");
        },

        update:function() {
            this._slot_weapon.item=ig.game.player.weapon;
            //this._slot_spell.item=ig.game.player.spellCaster.getSpell();
            this._slot_head.item=ig.game.player.getApparelByType(Apparel.TYPE.HEAD);
            this._slot_body.item=ig.game.player.getApparelByType(Apparel.TYPE.BODY);
            this._slot_jewelry1.item=ig.game.player.getApparelByType(Apparel.TYPE.JEWELRY_1);
            this._slot_jewelry2.item=ig.game.player.getApparelByType(Apparel.TYPE.JEWELRY_2);
        },

        draw:function(x,y) {
            var player=ig.game.player;
            var bg=ig.game.assets.img_win_equipment;
            bg.draw(x,y);
            var fLG=ig.game.assets.font_lightGrey;
            var fMG=ig.game.assets.font_medGrey;
            fLG.draw(player.displayName,Math.round(bg.width*0.5),4,ig.Font.ALIGN.CENTER);
            var tx=35;
            fMG.draw(player.attributes.healthMax.addCommas(),tx,17,ig.Font.ALIGN.RIGHT);
            fMG.draw(player.attributes.manaMax.addCommas(),tx,25,ig.Font.ALIGN.RIGHT);
            fMG.draw(player.attributes.strength.addCommas(),tx,33,ig.Font.ALIGN.RIGHT);
            tx=81;
            fMG.draw(player.attributes.level,tx,17,ig.Font.ALIGN.RIGHT);
            fMG.draw(player.attributes.XP.addCommas(),tx,25,ig.Font.ALIGN.RIGHT);
            fMG.draw(player.attributes.getXPToNextLevel().addCommas(),tx,33,ig.Font.ALIGN.RIGHT);
            tx=80;
            fMG.draw(player.getArmorRating(),tx,49,ig.Font.ALIGN.RIGHT);
            fMG.draw(player.getDamageRating(),tx,65,ig.Font.ALIGN.RIGHT);
            this._slot_head.draw(3,45);
            if(this._slot_head.item==null)
                ig.game.assets.img_equipIcons.drawTile(5,47,0,12);
            this._slot_body.draw(3,61);
            if(this._slot_body.item==null)
                ig.game.assets.img_equipIcons.drawTile(5,63,1,12);
            this._slot_jewelry1.draw(19,45);
            if(this._slot_jewelry1.item==null)
                ig.game.assets.img_equipIcons.drawTile(21,47,2,12);
            this._slot_jewelry2.draw(19,61);
            if(this._slot_jewelry2.item==null)
                ig.game.assets.img_equipIcons.drawTile(21,63,2,12);
            this._slot_weapon.draw(35,45);
            if(this._slot_weapon.item==null)
                ig.game.assets.img_equipIcons.drawTile(37,47,3,12);
            this._slot_spell.draw(35,61);
            if(this._slot_spell.item==null)
                ig.game.assets.img_equipIcons.drawTile(37,63,4,12);
            this._tooltip_health.update();
            this._tooltip_magic.update();
            this._tooltip_strength.update();
        },

        onEquipmentSlotPress:function(slot) {
            var item=slot.item;
            if(item!=null&&ig.game.cursorItem==null) {
                slot.item=null;
                ig.game.cursorItem=item;
                switch(slot) {
                    case this._slot_spell:
                        ig.game.player.spellCaster.setSpell(null);
                        break;
                    case this._slot_weapon:
                        ig.game.player.equipWeapon(null);
                        break;
                    default:
                        if(item instanceof Apparel)
                            ig.game.player.removeApparel(item.type);
                        break;
                }
            }
            ig.game.tooltip.hide();
        },

        onEquipmentSlotRelease:function(slot) {
            if(ig.game.cursorItem==null)
                return;
            if(!this.isItemValidForSlot(slot,ig.game.cursorItem))
                return;
            var currItem=slot.item;
            if (currItem != null &&
                currItem.itemType == ig.game.cursorItem.itemType &&
                currItem.quantity < currItem.maxQuantity) {
                currItem.quantity++;
                ig.game.cursorItem=null;
            }
            else {
                slot.item = ig.game.cursorItem;
                ig.game.cursorItem=null;
                if (!ig.game.player.inventory.isInQuickSlot(currItem) &&
                    !(slot.item instanceof Spell)) {
                    ig.game.cursorItem=currItem;
                }
            }
            if(slot.item!=null) {
                switch(slot) {
                    case this._slot_spell:
                        ig.game.player.spellCaster.setSpell(slot.item);
                        break;
                    case this._slot_weapon:
                        ig.game.player.equipWeapon(slot.item);
                        break;
                    default:
                        if(slot.item instanceof Apparel)
                            ig.game.player.addApparel(slot.item);
                        break;
                }
            }
        },

        isItemValidForSlot:function(slot,item) {
            switch(slot) {
                case this._slot_head:
                    return(item instanceof Apparel&&item.type==Apparel.TYPE.HEAD);
                case this._slot_body:
                    return(item instanceof Apparel&&item.type==Apparel.TYPE.BODY);
                case this._slot_jewelry1:
                case this._slot_jewelry2:
                    return(item instanceof Apparel&&item.type==Apparel.TYPE.JEWELRY);
                case this._slot_weapon:
                    return(item instanceof Weapon);
                case this._slot_spell:
                    return(item instanceof Spell);
            }
            return false;
        }
    });
});