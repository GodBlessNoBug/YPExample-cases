
cc.Class({
    extends: cc.Component,

    properties: {
        textLab: cc.Label,
        sceneName: ''
    },

    initData(sceneName) {
        this.sceneName = sceneName ? sceneName : '';
        this.textLab.string = this.sceneName;
    },

    onBtnLoadScene() {
        if (this.sceneName === '' || typeof (this.sceneName) !== 'string') {
            console.log('场景不存在, sceneName: ', this.sceneName);
            return;
        }
        cc.director.loadScene(this.sceneName);
    },

    backStartScene() {
        cc.director.loadScene('Start');
    }

});
