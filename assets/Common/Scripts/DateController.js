
module.exports = {
    getCurrentDate: null, //今天
    getYesterdayDate: null, //昨天
    getThreedayDate: null, //三天
    getOneWeekDate: null, //一周
    getWeekStartDate: null, //获得本周的开始日期
    getWeekEndDate: null, //获得本周的结束日期
    getUpWeekStartDate: null, //获得上周的开始日期
    getUpWeekEndDate: null, //获得上周的结束日期
    getMonthStartDate: null, //获得本月的开始日期
    getMonthEndDate: null, //获得本月的结束日期
    getLastMonthStartDate: null, //获得上月开始时间
    getLastMonthEndDate: null, //获得上月结束时间
    getThreeMonthAgoDate: null, //获取三个月前
    getHalfYearAgoDate: null, //获取半年前
    getOneYearAgoDate: null, //获取一年前

    initDate() {
        var now = new Date();                    //当前日期
        var nowDayOfWeek = now.getDay();         //今天本周的第几天
        nowDayOfWeek = nowDayOfWeek == 0 ? 7 : nowDayOfWeek;
        var nowDay = now.getDate();              //当前日
        var nowMonth = now.getMonth();           //当前月
        var nowYear = now.getYear();             //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;  //

        var lastMonthDate = new Date();  //上月日期
        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        var lastYear = lastMonthDate.getYear();
        var lastMonth = lastMonthDate.getMonth();

        //月 和日  时  分前面加0
        function padding(num, length) {
            return (Array(length).join("0") + num).slice(-length);
        }

        //格式化日期：yyyy-MM-dd
        function formatDate(date) {
            var myyear = date.getFullYear();
            var mymonth = date.getMonth() + 1;
            var myweekday = date.getDate();

            return myyear + "-" + padding(mymonth, 2) + "-" + padding(myweekday, 2);
        }

        //获得某月的天数
        function getMonthDays(myMonth) {
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        }

        //获得本季度的开始月份
        function getQuarterStartMonth() {
            var quarterStartMonth = 0;
            if (nowMonth < 3) {
                quarterStartMonth = 0;
            }
            if (2 < 6) {
                quarterStartMonth = 3;
            }
            if (5 < 9) {
                quarterStartMonth = 6;
            }
            if (nowMonth > 8) {
                quarterStartMonth = 9;
            }
            return quarterStartMonth;
        }

        //按照月来获取日期 三个月前， 一年前， 半年前
        function getDataAtMonth(_month) {
            var date = new Date();
            var monthAgo = null
            //计算年
            let year = date.getFullYear();
            //计算月
            let mon = date.getMonth() + 1;
            let day = date.getDate();
            if (mon < _month) {
                mon += (12 - _month)
                year--;
            } else if (mon == _month) {
                mon = 12
                year--;
            } else {
                mon -= _month;
            }

            //可能会超上限 31  30  28 29
            var maxDay = getMonthDays(mon)
            if (day > maxDay) day = maxDay

            monthAgo = year + "-" + padding(mon, 2) + "-" + padding(day, 2);

            return monthAgo;
        }

        //今天
        var getCurrentDate = new Date(nowYear, nowMonth, nowDay);
        this.getCurrentDate = formatDate(getCurrentDate)

        //昨天
        var getYesterdayDate = new Date(nowYear, nowMonth, nowDay - 1);
        this.getYesterdayDate = formatDate(getYesterdayDate);

        //三天
        var getThreedayDate = new Date(nowYear, nowMonth, nowDay - 3);
        this.getThreedayDate = formatDate(getThreedayDate);

        //一周
        var getOneWeekDate = new Date(nowYear, nowMonth, nowDay - 7);
        this.getOneWeekDate = formatDate(getOneWeekDate);

        //获得本周的开始日期
        var getWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
        this.getWeekStartDate = formatDate(getWeekStartDate);

        //获得本周的结束日期
        var getWeekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
        this.getWeekEndDate = formatDate(getWeekEndDate);

        //获得上周的开始日期
        var getUpWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
        this.getUpWeekStartDate = formatDate(getUpWeekStartDate);

        //获得上周的结束日期
        var getUpWeekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek - 6));
        this.getUpWeekEndDate = formatDate(getUpWeekEndDate);

        //获得本月的开始日期
        var getMonthStartDate = new Date(nowYear, nowMonth, 1);
        this.getMonthStartDate = formatDate(getMonthStartDate);

        //获得本月的结束日期
        var getMonthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
        this.getMonthEndDate = formatDate(getMonthEndDate);

        //获得上月开始时间
        var getLastMonthStartDate = new Date(nowYear, lastMonth, 1);
        this.getLastMonthStartDate = formatDate(getLastMonthStartDate);

        //获得上月结束时间
        var getLastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
        this.getLastMonthEndDate = formatDate(getLastMonthEndDate);

        //获取三个月前的今天
        var getThreeMonthAgoDate = getDataAtMonth(3)
        this.getThreeMonthAgoDate = getThreeMonthAgoDate

        //获取半年前的今天
        var getHalfYearAgoDate = getDataAtMonth(6)
        this.getHalfYearAgoDate = getHalfYearAgoDate

        //获取一年前的今天
        var getOneYearAgoDate = getDataAtMonth(12)
        this.getOneYearAgoDate = getOneYearAgoDate

    },


};
