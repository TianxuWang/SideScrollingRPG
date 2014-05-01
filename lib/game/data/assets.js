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

        // sprites
        animSheet_ninja: new ig.AnimationSheet('media/classes/ninja.png', 24, 23),
        animSheet_ninja_shadowClone: new ig.AnimationSheet('media/classes/ninja_shadowclone.png', 24, 23),
        animSheet_treant: new ig.AnimationSheet('media/enemies/treant.png', 32, 32),
        animSheet_katana: new ig.AnimationSheet('media/items/weapons/katana.png', 40, 40),
        animSheet_katana_shadowClone: new ig.AnimationSheet('media/items/weapons/katana_shadowclone.png', 40, 40),
        animSheet_katana_poison: new ig.AnimationSheet('media/items/weapons/katana_poison.png', 40, 40),
        animSheet_shuriken: new ig.AnimationSheet('media/items/bullets/shuriken_grey.png', 8, 8),
        animSheet_fruits: new ig.AnimationSheet('media/items/fruits.png', 8, 8),

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

        // sfx

        // music

        Item_Data: {

        },

        init: function() {

        }
    });
});