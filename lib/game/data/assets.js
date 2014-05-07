/**
 * Created by Tianxu on 14-4-19.
 */
ig.module(
    'game.data.assets'
)
.requires(
    'impact.impact',
    'impact.animation',
    'impact.sound',
    'impact.font'
)
.defines( function(){

    Assets = ig.Class.extend({

        // fonts
        font_default: new ig.Font('media/fonts/04b03.font.png'),
        font_black: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#000000'}),
        font_black_border_grayishOrange: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#000000', borderColor: '#C8B0A1', letterSpacing: 0.5}),
        font_darkMagenta: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#2C132F'}),
        font_red: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#FF0000'}),
        font_green: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#00FF00'}),
        font_blue: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#0000FF'}),

        // sprites
        animSheet_ninja: new ig.AnimationSheet('media/classes/ninja.png', 24, 23),
        animSheet_ninja_shadowClone: new ig.AnimationSheet('media/classes/ninja_shadowclone.png', 24, 23),
        animSheet_treant: new ig.AnimationSheet('media/enemies/treant.png', 32, 32),


        // items
        animSheet_item_icon: new ig.AnimationSheet('media/items/item_icon.png', 16, 16),
        animSheet_katana_0: new ig.AnimationSheet('media/items/weapons/katana_0.png', 40, 40),
        animSheet_katana_1: new ig.AnimationSheet('media/items/weapons/katana_1.png', 40, 40),
        animSheet_katana_2: new ig.AnimationSheet('media/items/weapons/katana_2.png', 40, 40),
        animSheet_katana_shadowClone: new ig.AnimationSheet('media/items/weapons/katana_shadowclone.png', 40, 40),
        animSheet_katana_poison: new ig.AnimationSheet('media/items/weapons/katana_poison.png', 40, 40),
        animSheet_shuriken: new ig.AnimationSheet('media/items/bullets/shuriken_grey.png', 8, 8),
        animSheet_fruits: new ig.AnimationSheet('media/items/fruits_10bit.png', 10, 10),

        // effects
        animSheet_bloodParticle: new ig.AnimationSheet('media/effects/bloodsplatter2.png', 16, 16),
        animSheet_emotionParticle: new ig.AnimationSheet('media/effects/emotions.png', 16, 17),
        animSheet_sparkParticle: new ig.AnimationSheet('media/effects/spark.png', 1, 1),

        // gui
        img_player_hud: new ig.Image('media/gui/player_hud.png'),
        img_player_healthBar: new ig.Image('media/gui/healthbar2.png'),
        img_player_manaBar: new ig.Image('media/gui/manabar2.png'),
        img_enemy_healthBar: new ig.Image('media/gui/healthbar.png'),
        img_enemy_trackBar: new ig.Image('media/gui/emptybar.png'),
        img_inventory_menu_bg: new ig.Image('media/gui/inventory_menu_bg.png'),
        img_stats_menu_bg: new ig.Image('media/gui/stats_menu_bg.png'),
        img_equipment_bg_icon: new ig.Image('media/gui/equipment_bg_icon.png'),

        // sfx

        // music

        Item_Data: {

        },

        init: function() {

        }
    });
});