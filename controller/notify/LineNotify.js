const request = require('postman-request');
const Time = require('../../utils/Time.js');

function sendNotify(mytoken, myform) {

    const host = 'https://notify-api.line.me/api/notify';

    const token = mytoken;

    const form = myform;

    let formData = new URLSearchParams(form).toString();

    request({
        headers: {
            'Content-Length': formData.length,
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Bearer " + token
        },
        uri: host,
        body: formData,
        method: 'POST'
    }, function (err, res, body) {

        console.log(`${Time.LogTime() } status:${res.body}`);

        const resData = JSON.parse(JSON.stringify((res.caseless).dict));

        console.log(`每小時 API 呼叫的限制: ${resData['x-ratelimit-limit']}`);
        console.log(`每小時剩餘API 呼叫數量:${resData['x-ratelimit-remaining']}`);
        console.log(`每小時上傳圖像的限制:${resData['x-ratelimit-imagelimit']}`);
        console.log(`每小時剩餘上傳圖像的數量:${resData['x-ratelimit-imageremaining']}`);
        console.log(`重置限制的時間:${Time.timeConverter(resData['x-ratelimit-reset'])}`);

    });
}

module.exports = {
    sendNotify
};