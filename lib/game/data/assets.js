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
        font_lightGrey: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#b5b5b5'}),
        font_darkGrey: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#8f8f8f'}),
        font_darkOrange: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#ce5205'}),
        font_gold: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#ffd700'}),
        font_black: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#000000'}),
        font_brown: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#c8b0a1'}),
        font_black_border_grayishOrange: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#000000', borderColor: '#C8B0A1', letterSpacing: 0.5}),
        font_darkMagenta: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#2C132F'}),
        font_red: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#ce051d'}),
        font_green: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#05ce52'}),
        font_blue: new ig.Font('media/fonts/04b03.font.png', {fontColor: '#0581ce'}),

        // sprites
        animSheet_ninja: new ig.AnimationSheet('media/classes/ninja.png', 24, 23),
        animSheet_ninja_shadowClone: new ig.AnimationSheet('media/classes/ninja_shadowclone.png', 24, 23),
        animSheet_treant: new ig.AnimationSheet('media/enemies/treant.png', 32, 32),
        animSheet_dog: new ig.AnimationSheet('media/npcs/dog.png', 21, 17),
        animSheet_villager_female: new ig.AnimationSheet('media/npcs/villager_female.png', 18, 26),
        animSheet_villager_male: new ig.AnimationSheet('media/npcs/villager_male.png', 18, 26),

        // items
        animSheet_chest_0: new ig.AnimationSheet('media/items/chest_0.png', 24, 24),
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
        animSheet_smokeParticle: new ig.AnimationSheet('media/effects/run.png', 13, 13),

        // gui
        img_dialogue_bg: new ig.Image('media/gui/dialogue_bg.png'),
        img_player_hud: new ig.Image('media/gui/player_hud.png'),
        img_player_healthBar: new ig.Image('media/gui/healthbar2.png'),
        img_player_manaBar: new ig.Image('media/gui/manabar2.png'),
        img_enemy_healthBar: new ig.Image('media/gui/bar_yellow.png'),
        img_enemy_trackBar: new ig.Image('media/gui/bar_track.png'),
        img_inventory_menu_bg: new ig.Image('media/gui/inventory_menu_bg.png'),
        img_stats_menu_bg: new ig.Image('media/gui/stats_menu_bg.png'),
        img_equipment_bg_icon: new ig.Image('media/gui/equipment_bg_icon.png'),
        img_cursor_hand: new ig.Image('media/gui/hand.png'),
        img_cursor_loot: new ig.Image('media/gui/loot.png'),

        // sfx

        // music
        bgMusic_town: new ig.Sound('media/musics/Track_3.*'),
        bgMusic_forest: new ig.Sound('media/musics/Track_10.*'),

        init: function() { }
    });
});