
cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    onLoad() {

    },

    setLabel(str) {
        this.label.string = str;
    },
});
