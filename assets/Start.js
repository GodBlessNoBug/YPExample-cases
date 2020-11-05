
cc.Class({
    extends: cc.Component,

    properties: {
        sceneBtnPfb: cc.Prefab,
        svContent: cc.Node
    },

    onLoad() {
        this.initSceneBtn();
    },

    initSceneBtn() {
        for (let i = 0; i < Object.keys(Constants.sceneName).length; i++) {
            let item = cc.instantiate(this.sceneBtnPfb);
            let sceneName = Constants.sceneName[i];
            item.getComponent('SceneBtn').initData(sceneName);
            item.parent = this.svContent;
        }
    }

});
