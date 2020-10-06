
var ScrollEventTypes = cc.Enum({
    'bounce-bottom': -1,
    'scroll-to-bottom': -1,
    'scroll-to-right': -1,
    'scroll-to-top': -1,
    'scroll-to-left': -1,
    'scroll-ended': -1,
    'scrolling': -1,
});

var ScrollEventTypeNames = [
    'bounce-bottom',
    'scroll-to-bottom',
    'scroll-to-right',
    'scroll-to-top',
    'scroll-to-left',
    'scroll-ended',
    'scrolling',
]

cc.Class({
    extends: cc.Component,

    properties: {
        scrollEventCallFunc: {
            default: null,
            type: cc.Component.EventHandler,
            tooltip: '滚动回调事件'
        },

        scrollEventType: {
            default: 0,
            type: ScrollEventTypes,
            tooltip: '滚动事件类型'
        },

        itemOpacity: {
            default: 255,
            type: cc.Integer,
        },

        //_customEventData: null, //编辑器传参，未用到
    },

    onLoad() {
        // if (this.scrollEventCallFunc && this.scrollEventCallFunc.customEventData) {
        //     this._customEventData = this.scrollEventCallFunc.customEventData;
        // }
    },

    onEnable() {
        if (!this.node.getComponent(cc.ScrollView)) return

        this.content = this.node.getComponent(cc.ScrollView).content;
        this.node.on(ScrollEventTypeNames[this.scrollEventType], this.onScrollEvent, this);

        //this.svBoxRect = this.node.getBoundingBoxToWorld(); //不精确XXOO
        this.svBoxRect = new cc.rect(
            0,
            0,
            cc.winSize.width,
            cc.winSize.height
        )

    },

    onDisable() {
        this.node.off(ScrollEventTypeNames[this.scrollEventType], this.onScrollEvent, this);
    },

    checkIntersects() {
        if (!this.content || this.content.childrenCount == 0) {
            return;
        }
        for (let i = 0; i < this.content.childrenCount; i++) {
            var childNode = this.content.children[i];
            if (childNode.getBoundingBoxToWorld().intersects(this.svBoxRect)) {
                if (childNode.opacity != this.itemOpacity) {
                    childNode.opacity = this.itemOpacity;
                }
            } else {
                if (childNode.opacity != 0) {
                    childNode.opacity = 0;
                }
            }
        }
    },

    update(dt) {
        this.checkIntersects();
    },

    onScrollEvent() {
        if (this.scrollEventCallFunc) {
            this.scrollEventCallFunc.customEventData = null;
            this.scrollEventCallFunc.emit();
        }
    }
});
