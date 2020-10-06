
var DateController = require('DateController');

cc.Class({
    extends: cc.Component,

    properties: {
        todayLab: cc.Label, //今天
        yesterdayLab: cc.Label, //昨天
        threedayAgoLab: cc.Label,  //三天前
        oneWeekAgoLab: cc.Label,  //一周前
        thisWeekStartLab: cc.Label, //本周的开始日期
        thisWeekEndLab: cc.Label,   //本周的结束日期
        lastWeekStartLab: cc.Label, //上周的开始日期
        lastWeekEndLab: cc.Label,   //上周的结束日期
        thisMonthStartLab: cc.Label,    //本月的开始日期
        thisMonthEndLab: cc.Label,  //本月的结束日期
        lastMonthStartLab: cc.Label,    //上月开始时间
        lastMonthEndLab: cc.Label,  //上月结束时间
        threeMonAgothLab: cc.Label,    //三个月前
        halfYearAgoLab: cc.Label,  //半年前
        oneYearAgoLab: cc.Label,   //一年前

    },

    onLoad() {
        DateController.initDate();
    },

    start() {
        this.todayLab.string = '今天：' + DateController.getCurrentDate;
        this.yesterdayLab.string = '昨天：' + DateController.getYesterdayDate;
        this.threedayAgoLab.string = '三天前：' + DateController.getThreedayDate;
        this.oneWeekAgoLab.string = '一周前：' + DateController.getOneWeekDate;
        this.thisWeekStartLab.string = '本周开始：' + DateController.getWeekStartDate;
        this.thisWeekEndLab.string = '本周结束：' + DateController.getWeekEndDate;
        this.lastWeekStartLab.string = '上周开始：' + DateController.getUpWeekStartDate;
        this.lastWeekEndLab.string = '上周结束：' + DateController.getUpWeekEndDate;
        this.thisMonthStartLab.string = '本月的开始：' + DateController.getMonthStartDate;
        this.thisMonthEndLab.string = '本月的结束：' + DateController.getMonthEndDate;
        this.lastMonthStartLab.string = '上月开始：' + DateController.getLastMonthStartDate;
        this.lastMonthEndLab.string = '上月结束：' + DateController.getLastMonthEndDate;
        this.threeMonAgothLab.string = '三个月前：' + DateController.getThreeMonthAgoDate;
        this.halfYearAgoLab.string = '半年前：' + DateController.getHalfYearAgoDate;
        this.oneYearAgoLab.string = '一年前：' + DateController.getOneYearAgoDate;
    },

});
