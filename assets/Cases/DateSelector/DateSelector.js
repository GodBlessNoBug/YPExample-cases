
cc.Class({
    extends: cc.Component,

    properties: {
        sv_year: cc.ScrollView,
        sv_month: cc.ScrollView,
        sv_day: cc.ScrollView,
        content_year: cc.Node,
        content_month: cc.Node,
        content_day: cc.Node,
        dateItem: cc.Prefab,

        dateLab: cc.Label,
    },

    onLoad() {
        this._fromYear = 1949;          //从哪年开始
        this._openSelectYear = 1999;    //打开默认选中哪年
        this._openSelectMonth = 9;      //打开默认选中哪月
        this._openSelectDay = 9;        //打开默认选中哪日
        this._itemHeight = 80;          //item高度

        this.selected_year = this._openSelectYear;      //已选中年
        this.selected_month = this._openSelectMonth;    //已选中月
        this.selected_day = this._openSelectDay;        //已选中日

        this.dateLab.string = this.getDateString();

        //年
        var year = new Date().getFullYear();
        for (let i = this._fromYear; i < year + 1; i++) {
            var item = cc.instantiate(this.dateItem);
            item.getComponent('DateSelectorItem').setLabel(i);
            item.parent = this.content_year;
        }
        //月
        for (let i = 1; i <= 12; i++) {
            var item = cc.instantiate(this.dateItem);
            item.getComponent('DateSelectorItem').setLabel(i);
            item.parent = this.content_month;
        }
        //日
        for (let i = 1; i <= 31; i++) {
            var item = cc.instantiate(this.dateItem);
            item.getComponent('DateSelectorItem').setLabel(i);
            item.parent = this.content_day;
        }

        this.scheduleOnce(() => {
            this.sv_year.scrollToOffset(cc.v2(0, (this._openSelectYear - this._fromYear) * this._itemHeight), 0.01);
        }, 0.05)
        this.scheduleOnce(() => {
            this.sv_month.scrollToOffset(cc.v2(0, (this._openSelectMonth - 1) * this._itemHeight), 0.01);
        }, 0.10)
        this.scheduleOnce(() => {
            this.sv_day.scrollToOffset(cc.v2(0, (this._openSelectDay - 1) * this._itemHeight), 0.01);
        }, 0.15)
    },

    onScrollEvents_yaer(scrollView, event) {
        this.scrollChange(this.sv_year, this.content_year, 1, event);
    },

    onScrollEvents_month(scrollView, event) {
        this.scrollChange(this.sv_month, this.content_month, 2, event);
    },

    onScrollEvents_day(scrollView, event) {
        this.scrollChange(this.sv_day, this.content_day, 3, event);
    },

    scrollChange(scrollView, content, type, event) {
        var offset = scrollView.getScrollOffset().y;
        var index = parseInt(offset / this._itemHeight);
        if (offset % this._itemHeight > this._itemHeight / 2) {
            index += 1;
        }
        index = index < 0 ? 0 : index;
        index = index >= content.childrenCount ? (content.childrenCount - 1) : index;
        for (let i = 0; i < content.childrenCount; i++) {
            var item = content.children[i];
            item.getComponent('DateSelectorItem').label.fontSize = 40;
            var fontSizeScale = 1.0;
            if (i <= index) {
                fontSizeScale = 1.25 - (index - i) * 0.33;
            } else {
                fontSizeScale = 1.25 - (i - index) * 0.33;
            }
            fontSizeScale = fontSizeScale < 0.33 ? 0.33 : fontSizeScale;
            item.getComponent('DateSelectorItem').label.fontSize *= fontSizeScale;
        }

        if (event === cc.ScrollView.EventType.SCROLL_ENDED) {
            scrollView.scrollToOffset(cc.v2(0, index * this._itemHeight));
            var item = content.children[index];
            var selectStr = item.getComponent('DateSelectorItem').label.string;
            switch (type) {
                case 1:
                    this.selected_year = selectStr;
                    this.handleLeapYear();
                    //cc.log('年***' + this.selected_year);
                    break;
                case 2:
                    this.selected_month = selectStr;
                    this.handleMonths();
                    this.handleLeapYear();
                    //cc.log('月***' + this.selected_month);
                    break;
                case 3:
                    this.selected_day = selectStr;
                    //cc.log('日***' + this.selected_day);
                    break;
                default:
                    break;
            }
        }
    },

    //闰年平年2月，四年一闰，百年不闰，四百年又闰
    handleLeapYear() {
        if (this.selected_month == 2 && (this.selected_year % 4 != 0 || (this.selected_year % 100 == 0 && this.selected_year % 400 != 0))) {
            //平年
            this.content_day.children[28].active = false;
            if (this.selected_day == 29) {
                //29变28
                var offset = this.sv_day.getScrollOffset().y;
                this.sv_day.scrollToOffset(cc.v2(0, offset), 0.1);
            }
        } else {
            //闰年
            this.content_day.children[28].active = true;
        }
    },

    //大小月、2月
    handleMonths() {
        //大小月
        if ([1, 3, 5, 7, 8, 10, 12].includes(Number(this.selected_month))) {
            this.content_day.children[30].active = true;
        } else {
            this.content_day.children[30].active = false;
            if (this.selected_day == 31) {
                //31变30
                var offset = this.sv_day.getScrollOffset().y;
                this.sv_day.scrollToOffset(cc.v2(0, offset), 0.1);
            }
        }
        this.content_day.children[29].active = true;
        //2月
        if (this.selected_month == 2) {
            this.content_day.children[30].active = false;
            this.content_day.children[29].active = false;
            if (this.selected_day == 31 || this.selected_day == 30) {
                //31、30变29、28
                var offset = this.sv_day.getScrollOffset().y;
                this.sv_day.scrollToOffset(cc.v2(0, offset), 0.1);
            }
        }
    },

    getDateString() {
        var month = this.selected_month.length == 1 ? '0' + this.selected_month : this.selected_month;
        var day = this.selected_day.length == 1 ? '0' + this.selected_day : this.selected_day;
        var dateStr = this.selected_year + '-' + month + '-' + day;
        return dateStr;
    },

    onBtnConfirm() {
        if (!this.dateLab) return;
        this.dateLab.string = this.getDateString();
    },
});
