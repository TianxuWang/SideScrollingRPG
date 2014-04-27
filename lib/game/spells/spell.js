/**
 * Created by Tianxu on 14-4-16.
 */
ig.module(
    'game.spells.spell'
)
.requires (
    'impact.entity',
    'impact.font',
    'impact.sound',
    'impact.timer'
)
.defines( function() {

    var count = 0;

    Spell = ig.Class.extend({

        TYPE: {
            DAMAGE: 0,
            HEAL: 1,
            BUFF: 2,
            DEBUFF: 3,
            SPECIAL: 4
        },

        id: count++,
        type: null,
        movable: false,
        needChannel: false,
        castDelay: 0,
        costActivate: 0,
        costChannel: 0,
        cooldownDelay: 0,
        cooldownTimer: null,
        lastDelay: 0,
        lastTimer: null,
        canTargetSelf: false,
        rangeX: 0,
        rangeY: 0,
        activated: false,
        paused: false,
        completed: false,

        damage: 0,
        heal: 0,
        curLevel: 1,
        maxLevel: 1,
        points: 0,
        preReqSpell: null,
        owner: null,
        name: '',
        icon: null,
        particleData: null,
        entityGroup: [],

        _justActivated: false,

        init: function(entity, settings) {
            this.id = count++;
            this.owner = entity;

            this.initProperties();
        },

        update: function() {
            this.updateLastTime();
            this.updateEntityGroup();
        },

        updateLastTime: function() {
            if (this.activated &&
                this.type == this.TYPE.BUFF &&
                this.lastTimer.delta() >= this.lastDelay)
                this.deactivate();
        },

        updateEntityGroup: function() {

        },

        initProperties: function() {
            this.cooldownTimer = new ig.Timer();
        },

        activate: function() {
            if (this.costActivate != 0)
                this.owner._manaCostAccum += this.costActivate;         // extract cost
            if (this.cooldownDelay > 0)
                this.cooldownTimer.set(this.cooldownDelay);             // reset cd

            this.activated = true;
            this._justActivated = true;
        },

        deactivate: function() {
            this.entityGroup = [];
            this.activated = false;
        },

        startCasting: function() {

        },

        endCasting: function() {
            this._justActivated = false;
        },

        pause: function() {
            this.paused = true;

            this.castTimer.pause();
            this.cooldownTimer.pause();
        },

        unpause: function() {
            this.paused = false;

            this.castTimer.unpause();
            this.cooldownTimer.unpause();
        },

        cooledDown: function() {
            return this.cooldownDelay <= 0 || this.cooldownTimer.delta() >= 0;
        }
    });
});