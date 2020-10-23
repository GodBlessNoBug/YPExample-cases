
cc.Class({
    extends: cc.Component,

    properties: {
        progressBars: [cc.ProgressBar],
        progressLab: cc.Label,
    },

    onLoad() {
        this.progress = 0;
        this.stepLength = 0.01;
        this.schedule(function () {
            let percentNum = this.progress >= 1 ? 1 : this.progress;
            this.progressLab.string = parseFloat(percentNum * 100).toFixed(2) + '%';

            for (let i = 0; i < this.progressBars.length; i++) {
                let pb = this.progressBars[i];
                pb.progress = this.progress;
            }

            this.progress += this.stepLength;
            this.progress = this.progress >= (1 + this.stepLength) ? 0 : this.progress;
        }, 0.1);
    },

});
