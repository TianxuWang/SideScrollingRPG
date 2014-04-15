/**
 * Created by Tianxu on 14-4-14.
 */
ig.module (
    'game.entities.weapons.katana'
)
.requires (
    'impact.sound',
    'game.entities.weapons.weapon'
)
.defines( function() {

    EntityKatana = EntityWeapon.extend({

        name: 'Katana',
        size:{x: 40, y: 40},
        normalSheet: new ig.AnimationSheet('media/katana.png', 40, 40),
        shadowCloneSheet: new ig.AnimationSheet('media/katana_shadowclone.png', 40, 40),

        _attack: 10,
        _attackSpeed: 0.1,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            if (settings.animSheet) {
                this.animSheet = settings.animSheet;
            }

            // animations
            this.addAnim('idle', 0.3, [0, 1, 2, 1]);
            this.addAnim('attackGroundRight', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackGroundLeft', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
            this.addAnim('attackAirRight', this.attackSpeed, [6, 7, 8, 9, 10, 11], true);
            this.addAnim('attackAirLeft', this.attackSpeed, [12, 13, 14, 15, 16, 17], true);
        },

        check: function(other) {
            if (other.state != other.State.BLOCK &&
                other.state != other.State.INVINCIBLE &&
                (this.currentAnim.frame == 3 || this.currentAnim.frame == 4)) {
                other.state = other.State.HURT;
                other.receiveDamage((this.owner.attack - other.defence)/10);
                other.flip = this.owner.isOnLeftOf(other);
                other.bloodEmitter.setPos(this.pos.x + (this.flip ? -12 : 36), this.pos.y + 12);
            }
        },

        offsetIdlePos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 2 : 18);
            this.pos.y = this.owner.pos.y - 9;
        },

        offsetAttackPos: function() {
            this.pos.x = this.owner.pos.x - (this.owner.flip ? 12 : 8);
            this.pos.y = this.owner.pos.y - 18;
        }
    });
});