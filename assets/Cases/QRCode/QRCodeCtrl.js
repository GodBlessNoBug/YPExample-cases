
cc.Class({
    extends: cc.Component,

    properties: {
        qrcodeNode: cc.Node,
        inputEditBox: cc.EditBox
    },

    onLoad() {
        this.qrcodeMaker = this.qrcodeNode.getComponent('QRCodeMaker');
        this.qrcodeMaker.qrcodeStr = 'www.baidu.com';
    },

    onTextChange(text) {
        this.qrcodeMaker.qrcodeStr = text;
        this.qrcodeMaker.initQrcode();
    }

});
