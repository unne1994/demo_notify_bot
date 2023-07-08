const Time = require('../utils/Time');



function Untilmidnight() {
    var Nowdate = new Date(Time.getTaipeiDate());

    // starttime
    var Nowyear = Nowdate.getFullYear(); // 年
    var Nowmonth = (Nowdate.getMonth() + 1 < 10 ? '0' : '') + (Nowdate.getMonth() + 1); // 月
    var Nowday = (Nowdate.getDate() < 10 ? '0' : '').toString() + Nowdate.getDate().toString(); // 日
    var NowHours = (Nowdate.getHours() < 10 ? '0' : '').toString() + Nowdate.getHours().toString(); // 時
    var NowMinutes = (Nowdate.getMinutes() < 10 ? '0' : '').toString() + Nowdate.getMinutes().toString(); // 分
    var NowSeconds = (Nowdate.getSeconds() < 10 ? '0' : '').toString() + Nowdate.getSeconds().toString(); // 秒

    var dateTime = new Date(Time.getTaipeiDate()).setDate(new Date(Time.getTaipeiDate()).getDate() + 1);
    var tomdate = new Date(dateTime);

    // endtime
    var tomyear = tomdate.getFullYear(); // 年
    var tommonth = (tomdate.getMonth() + 1 < 10 ? '0' : '') + (tomdate.getMonth() + 1); // 月
    var tomday = (tomdate.getDate() < 10 ? '0' : '').toString() + tomdate.getDate().toString(); // 日

    var tomorrowDate = new Date(tomyear + "-" + tommonth + "-" + tomday + "  " + "00" + ":" + "00" + ":" + "00");
    // console.log(tomyear + "-" + tommonth + "-" + tomday + "  " + "00" + ":" + "00" + ":" + "00");

    // console.log(Nowdate.getTime());
    // console.log(tomorrowDate.getTime());

    var reciprocal = Math.round((tomorrowDate.getTime() - (Nowdate.getTime())) / 1000);

    // 計算當天時間到明天的00:00:00 相差秒數
    console.log(
        Nowyear + "-" + Nowmonth + "-" + Nowday + "  " + NowHours + ":" + NowMinutes + ":" + NowSeconds +
        ' ~ ' +
        tomyear + "-" + tommonth + "-" + tomday + "  " + "00" + ":" + "00" + ":" + "00" +

        '\t 相差: ' + reciprocal + '秒');

}

function UntilSpecifyTime(yyyy, MM, dd, hh, mm, ss, type) {

    var Nowdate = new Date(Time.getTaipeiDate());


    // starttime
    var Nowyear = Nowdate.getFullYear(); // 年
    var Nowmonth = (Nowdate.getMonth() + 1 < 10 ? '0' : '') + (Nowdate.getMonth() + 1); // 月
    var Nowday = (Nowdate.getDate() < 10 ? '0' : '').toString() + Nowdate.getDate().toString(); // 日
    var NowHours = (Nowdate.getHours() < 10 ? '0' : '').toString() + Nowdate.getHours().toString(); // 時
    var NowMinutes = (Nowdate.getMinutes() < 10 ? '0' : '').toString() + Nowdate.getMinutes().toString(); // 分
    var NowSeconds = (Nowdate.getSeconds() < 10 ? '0' : '').toString() + Nowdate.getSeconds().toString(); // 秒

    var SpecifyTimeDateTime = new Date(yyyy + "-" + MM + "-" + dd + "  " + hh + ":" + mm + ":" + ss);
    var reciprocal = Math.round((SpecifyTimeDateTime.getTime() - (Nowdate.getTime())) / 1000);

    // 如果是負數 加時間
    if (reciprocal < 0) {

        // console.log(`指定時間:${yyyy}-${MM}-${dd}-${dd}  ${hh}:${mm}:${ss} 已超過目前時間 根據type:${type} 自動向後新增加時間`);

        var addtime = 0;
        if (type === "addday") {
            addtime = 60 * 60 * 24 * 1000;
        }
        if (type === "addhour") {
            addtime = 60 * 60 * 1000;
        }

        if (type === "addminute") {
            addtime = 1 * 60 * 1000;
        }

        if (type.indexOf("addminute_") > -1) {
            addtime = parseInt(type.split('_')[1]) * 60 * 1000;
        }

        let nextTime = (SpecifyTimeDateTime.getTime() + addtime);
        var nextDate = new Date(nextTime);

        var nextYear = nextDate.getFullYear(); // 年
        var nextMonth = (nextDate.getMonth() + 1 < 10 ? '0' : '') + (nextDate.getMonth() + 1); // 月
        var nextDay = (nextDate.getDate() < 10 ? '0' : '').toString() + nextDate.getDate().toString(); // 日
        var nextHours = (nextDate.getHours() < 10 ? '0' : '').toString() + nextDate.getHours().toString(); // 時
        var nextMinutes = (nextDate.getMinutes() < 10 ? '0' : '').toString() + nextDate.getMinutes().toString(); // 分
        var nextSeconds = (nextDate.getSeconds() < 10 ? '0' : '').toString() + nextDate.getSeconds().toString(); // 秒

        return UntilSpecifyTime(nextYear, nextMonth, nextDay, nextHours, nextMinutes, nextSeconds, type);

    } else {

        console.log(
            Nowyear + "-" + Nowmonth + "-" + Nowday + "  " + NowHours + ":" + NowMinutes + ":" + NowSeconds +
            ' ~ ' +
            yyyy + "-" + MM + "-" + dd + "  " + hh + ":" + mm + ":" + ss +

            '\t 相差: ' + reciprocal + '秒');

            return reciprocal;
    }
};



module.exports = {
    Untilmidnight,
    UntilSpecifyTime
};