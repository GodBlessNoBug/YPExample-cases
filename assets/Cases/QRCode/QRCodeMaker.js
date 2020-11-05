
cc.Class({
    extends: cc.Component,

    properties: {
        backgroundColor: {
            default: cc.Color.WHITE,
            tooltip: '二维码背景颜色'
        },
        fillColor: {
            default: cc.Color.BLACK,
            tooltip: '二维码图案颜色'
        },

        margin: 0, //距离边界宽度
        qrcodeStr: '', //二维码字符串内容
    },

    onLoad() {
        this.graphics = this.node.getComponent(cc.Graphics);
        if (this.qrcodeStr && this.graphics) {
            this.initQrcode();
            this.node.x = this.node.x - this.node.width / 2;
            this.node.y = this.node.y - this.node.height / 2;
        }
    },

    initQrcode() {
        if (typeof (this.qrcodeStr) !== 'string') {
            console.log('qrcodeStr is not string', this.qrcodeStr);
            return;
        }

        this.graphics.clear();
        this.graphics.fillColor = this.backgroundColor;
        let width = this.node.width;
        this.graphics.fillRect(0, 0, width, width);
        this.graphics.close();
        let qrcode = new QRCode(-1, 2);
        qrcode.addData(this.qrcodeStr);
        qrcode.make();
        this.graphics.fillColor = this.fillColor;
        let size = width - this.margin * 2;
        let num = qrcode.getModuleCount();
        let tileW = size / num;
        let tileH = size / num;
        let w = Math.ceil(tileW);
        let h = Math.ceil(tileH);
        for (let row = 0; row < num; row++) {
            for (let col = 0; col < num; col++) {
                if (qrcode.isDark(row, col)) {
                    this.graphics.fillRect(this.margin + col * tileW, size - tileH - Math.round(row * tileH) + this.margin, w, h);
                }
            }
        }
    },

});
