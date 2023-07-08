// 程式用
function YYYMMDD() {
    var Nowdate = new Date(getTaipeiDate());


    var year = Nowdate.getFullYear();  // 年
    var month = (Nowdate.getMonth() + 1 < 10 ? '0' : '') + (Nowdate.getMonth() + 1);  // 月
    var day = (Nowdate.getDate() + 1 < 10 ? '0' : '') + Nowdate.getDate();    // 日
    return (year + '-' + month + '-' + day);
}

function ArrayYYYMMDD() {
    var Nowdate = new Date(getTaipeiDate());


    var year = Nowdate.getFullYear();  // 年
    var month = (Nowdate.getMonth() + 1 < 10 ? '0' : '') + (Nowdate.getMonth() + 1);  // 月
    var day = (Nowdate.getDate() + 1 < 10 ? '0' : '') + Nowdate.getDate();    // 日
    return [year, month, day];
}

function ArrayYYYMMDDHHMMSS() {
    console.log(`QQ: ${ convertTo12HourFormat(getTaipeiDate())}`)
    console.log(`QQ111111111: ${ new Date(convertTo12HourFormat(getTaipeiDate()))}`)

    var Nowdate = new Date(getTaipeiDate());


    var year = Nowdate.getFullYear();  // 年
    var month = (Nowdate.getMonth() + 1 < 10 ? '0' : '') + (Nowdate.getMonth() + 1);  // 月
    var day = (Nowdate.getDate() + 1 < 10 ? '0' : '') + Nowdate.getDate();    // 日
    var hour = (Nowdate.getHours() < 10 ? '0' : '') + Nowdate.getHours(); // 時
    var minute = (Nowdate.getMinutes() < 10 ? '0' : '') + Nowdate.getMinutes(); // 分
    var second = (Nowdate.getSeconds() < 10 ? '0' : '') + Nowdate.getSeconds(); // 秒
    return [year, month, day, hour, minute, second];
}

// log 用
function LogTime() {
    var Nowdate = new Date(getTaipeiDate());
   
    var year = Nowdate.getFullYear(); // 年
    var month = (Nowdate.getMonth() + 1 < 10 ? '0' : '') + (Nowdate.getMonth() + 1); // 月
    var day = (Nowdate.getDate() + 1 < 10 ? '0' : '') + Nowdate.getDate(); // 日
    var hour = (Nowdate.getHours() < 10 ? '0' : '') + Nowdate.getHours(); // 時
    var minute = (Nowdate.getMinutes() < 10 ? '0' : '') + Nowdate.getMinutes(); // 分
    var second = (Nowdate.getSeconds() < 10 ? '0' : '') + Nowdate.getSeconds(); // 秒
    return '[' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ']  ';

}

// 2016-08-9T10:01:54.123Z 
function ConverUTC(UTCTime) {

    var datetime = new Date(UTCTime);

    var year = datetime.getFullYear(); // 年
    var month = (datetime.getMonth() + 1 < 10 ? '0' : '') + (datetime.getMonth() + 1); // 月
    var day = (datetime.getDate() + 1 < 10 ? '0' : '') + datetime.getDate(); // 日
    var hour = (datetime.getHours() < 10 ? '0' : '') + datetime.getHours(); // 時
    var minute = (datetime.getMinutes() < 10 ? '0' : '') + datetime.getMinutes(); // 分
    var second = (datetime.getSeconds() < 10 ? '0' : '') + datetime.getSeconds(); // 秒

    return '[' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ']  ';
}


// 時間轉換
function timeConverter(UNIX_timestamp) {
    var unixTime = new Date(UNIX_timestamp * 1000);

    var year = unixTime.getFullYear();
    var month = (unixTime.getMonth() + 1 < 10 ? '0' : '') + (unixTime.getMonth() + 1); // 月
    var day = (unixTime.getDate() + 1 < 10 ? '0' : '') + unixTime.getDate(); // 日
    var hour = (unixTime.getHours() < 10 ? '0' : '') + unixTime.getHours(); // 時
    var minute = (unixTime.getMinutes() < 10 ? '0' : '') + unixTime.getMinutes(); // 分
    var second = (unixTime.getSeconds() < 10 ? '0' : '') + unixTime.getSeconds(); // 秒

    return '[' + year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ']  ';
}

// 因部屬機器會有時間差 所以 需要指定 台灣地區時間
function getTaipeiDate() {
    // Option          Values          Sample output
    // ----------------------------------------------------
    // weekday         'narrow'        'M'
    //                 'short'         'Mon'
    //                 'long'          'Monday'

    // year            '2-digit'       '01'
    //                 'numeric'       '2001'

    // month           '2-digit'       '01'
    //                 'numeric'       '1'
    //                 'narrow'        'J'
    //                 'short'         'Jan'
    //                 'long'          'January'

    // day             '2-digit'       '01'
    //                 'numeric'       '1'

    // hour            '2-digit'       '12 AM'
    //                 'numeric'       '12 AM'

    // minute          '2-digit'       '0'
    //                 'numeric'       '0'

    // second          '2-digit'       '0'
    //                 'numeric'       '0'

    // timeZoneName    'short'         '1/1/2001 GMT+00:00'
    //                 'long'          '1/1/2001 GMT+00:00'

    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,    // 24 小時制
        timeZone: 'Asia/Taipei',
    };

    const taipei = new Date().toLocaleString('en-US', options);
    // console.log(`taipei : ${taipei}`)
    return taipei;
}



function convertTo12HourFormat(timeString) {
    let time = timeString.split(":");
    let hours = parseInt(time[0]);
    let minutes = time[1];
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + minutes + " " + ampm;
  }

module.exports = {
    YYYMMDD,
    LogTime,
    ConverUTC,
    ArrayYYYMMDD,
    ArrayYYYMMDDHHMMSS,
    timeConverter,
    getTaipeiDate
};