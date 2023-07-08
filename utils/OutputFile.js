const Time = require('./Time.js');
const multer = require('multer');
const fs = require('fs');

function produce(fileFolerName, fileName, extensionName, str) {

    var folderName = fileFolerName; //資料夾 // *可更改為自定義

    var uploadpath = __dirname + '\\' + folderName; // 上傳後的目錄資料夾  ,無絕對路徑則產製當前目錄
    multer({ dest: uploadpath });

    // --------------------------------------------------------
    const htmlName = `${fileName}.${extensionName}`;
    // --------------------------------------------------------


    // console.log(str);
    console.log(Time.LogTime() + "產生:" + uploadpath + "\\" + htmlName);

    // enStr = iconv.decode(str,  'utf8');
    var options = { encoding: "utf8" };

    fs.writeFile(uploadpath + "/" + htmlName, "\ufeff" + str, options, (err, stats) => {

        if (err) {
            console.log(Time.LogTime() + 'produceHtmlName 失敗');
        } else {
            return stats;
        }
    });


}

module.exports = {
    produce
};