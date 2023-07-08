const HtmlParser = require('fast-html-parser');
const request = require('postman-request');
const outputFile = require('./OutputFile.js');
const puppeteer = require('puppeteer');
const Time = require('./Time.js');
const Random = require('../utils/Random.js')
const readFile = require('./ReadFile');
const cheerio = require('cheerio');
const sleep = require('../utils/Sleep');

function getPicture() {
    return new Promise(function (resolve, reject) {
        request.get(
            {
                url: myurl,
            },
            function (error, response, body) {
                if (response.statusCode == 200) {
                    // console.log(body);
                    outputFile.produce('htmlfolder', 'my', 'html', body);
                    const imgs = HtmlParser.parse(body).querySelectorAll('img');
                    const imgsSize = imgs.length;
                    const willSendimg = Random.random(0,imgsSize);

                    console.log(`第${willSendimg}張: ${imgs[willSendimg].rawAttributes.src}`);
                    resolve(imgs[willSendimg].rawAttributes.src);
                } else {
                    console.log(response.statusCode);
                }

            }
        );
    });
}


function getPictureNew() {
    const willSendimg = Random.random(1,1477 );
    let url = `https://www.crazybless.com/good-morning/morning/image/%E6%97%A9%E5%AE%89%E5%9C%96%E4%B8%8B%E8%BC%89%20(${willSendimg}).jpg`;
    console.log(`第${willSendimg}張: ${url}`);

    return url;
}


function getData(sourceUrl ='' , getType ='') {

    try {
        return new Promise(function (resolve, reject) {

            const url = sourceUrl;

            console.log(Time.LogTime() + "touch start");
            console.log("=============================================================")
            console.log(`url: ${url}`);

            // 至少 幾張圖片
            const imageLowerlimit = 100;

            // 大於 0 = 該秒數後結束程式 無視其他規則
            const EndTime = 0;
            // let EndTime = Random.random(15,30);


            let imags = [];

            puppeteer.launch({
                // headless: true
                headless: false
            }).then(async browser => {

                const page = await browser.newPage();

                await page.goto(url);

                await page.setViewport({
                    width: 1200,
                    height: 800
                });

                page
                    .on('request', request => {
                        // let url = request.url();
                        // console.log(`request =>   ${url}`);
                    })
                    .on('response', response => {
                        let type = response.url();
                        let status = response.status();

                        if (status === 200) {
                            if (excludeType(type) === false ) {
                                if (getType === 'html'){
                                    // console.log(`response =>   ${type} ${status}`);
                                    imags.push(type);
                                    }else {
                                    // console.log(`response =>   ${type} ${status}`);
                                        if (acceptType(type)){
                                            // console.log(`response =>   ${type} ${status}`);
                                            imags.push(type);
                                    }
                                }
                            }
                        }
                    })
                    .on('console', message => {
                        // console.log(`console =>    ${message.type().substr(0, 3).toUpperCase()} ${message.text()}`);
                    })
                    .on('pageerror', pageerror => {
                        // console.log(`pageerror =>   pageerror`);
                    })
                    .on('requestfailed', requestfailed => {
                        // console.log(`requestfailed =>   ${requestfailed.failure().errorText} ${requestfailed.url()}`);
                    })


                await page.goto(url);

                let checkImages = [];

                let continueFlag = true


                let timer;

                if (EndTime > 0) {
                    timer = setTimeout(() => {
                        console.log(`${Time.LogTime()} 時間已到 over page`);
                        continueFlag = false;
                    }, EndTime * 1000);
                }

                // let resultWaitCount = 5;
                // let waitCount = 0;

                while (continueFlag) {

                    // console.log(`${Time.LogTime()} 當前img數量: ${checkImages[checkImages.length - 1]}  , 前一次img數量: ${checkImages[checkImages.length - 2]}`);

                    checkImages.push(imags.length);


                    if (checkImages.length > 2 && checkImages[checkImages.length - 1] === checkImages[checkImages.length - 2]) {

                        // console.log(waitCount)
                        // if (waitCount === resultWaitCount){
                            console.log(`${Time.LogTime()} 網頁已到底 over page`);
                            continueFlag = false;
    
                            if (timer !== undefined) {
                                clearTimeout(timer);
                            }

                    } else if (checkImages[checkImages.length - 1] > imageLowerlimit) {
                        console.log(`${Time.LogTime()} 數量足夠 over page`);
                        continueFlag = false;

                        if (timer !== undefined) {
                            clearTimeout(timer);
                        }

                    } else {
                        // 每次幾秒確認一次條件
                        everyTimeCheckSeconds = 5;
                        let res = await autoScroll(page, everyTimeCheckSeconds);
                        // console.log(res);
                    }

                }

                // console.log(`${Time.LogTime()} 最終img數量: [${checkImages[checkImages.length - 1]}]`)

                // console.log(`${Time.LogTime()} 歷史累加img數量: [${checkImages}]`)


                // 等待網頁導覽
                // await page.waitForNavigation();

               
                if (getType === 'html'){
                    // html內容
                    content = await page.content();
    
                    const folderName  = 'download';
                    const htmlFileName  = 'Htmlpage';
    
    
                    outputFile.produce(folderName, htmlFileName, 'html', content);
    
                    
                    let fbids = await getLocalHtml(`${__dirname + '/'}../utils/${folderName}/${htmlFileName}.html`)
    
                      const willSendimgfbid = Random.random(0,fbids.length);
    
                    //   console.log(willSendimgfbid);
                    //   console.log(fbids[willSendimgfbid]);
                    console.log(`htmlfile 第 ${willSendimgfbid}/${fbids.length} 張: ${fbids[willSendimgfbid]}`);
    
                    resolve(fbids[willSendimgfbid]);
    
                      await browser.close();
    
    
                    } else {
    
                    await browser.close();
    
                        // console.log(imags);
    
                        const willSendimg = Random.random(0,imags.length);
    
                        console.log(`第 ${willSendimg}/${imags.length} 張: ${imags[willSendimg]}`);
        
                        resolve(imags[willSendimg]);
                    }

                // const imgs = HtmlParser.parse(responseData).querySelectorAll('img');
                // const imgsSize = imgs.length;
                // const willSendimg = Random.random(0,imags.length);

                // console.log(`第 ${willSendimg}/${imags.length} 張: ${imags[willSendimg]}`);

                // resolve(imags[willSendimg]);

                console.log(`${Time.LogTime()} touch end`);
                console.log("=============================================================")
            });


        });
    } catch (e) {
        console.log(e);
    } finally {
        // if (browser !== undefined) {
        //     await browser.close();
        // }
        // console.log("touch end");
        // console.log("=============================================================")
    }
}


// autoScroll()方法的实现。
// totalHeight用来记录页面的当前高度，初始值为0。
// distance用来表示每次向下滚动的距离，这里为100像素。
// 接着使用了一个定时器，每隔100毫秒向下滚动distance设定的距离，然后累加到totalHeight，直到它大于等于页面的实际高度document.body.scrollHeight之后，才会清除定时器，并将Promise对象的状态置为resolve()。
function autoScroll(page, _time) {
    return page.evaluate((_time) => {
        return new Promise((resolve, reject) => {
            const totalHeight = 0;
            const distance = 100;
            let timer2;
            let timer = setInterval(() => {
                let scrollHeight = document.body.scrollHeight;

                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);

                    if (timer2 !== undefined) {
                        clearTimeout(timer2);
                    }

                    resolve("OKK Interval");
                }
            }, 200);


            if (_time !== undefined) {
                timer2 = setTimeout(() => {
                    clearInterval(timer);
                    clearTimeout(timer2);
                    resolve("OKK Timeout");
                }, _time * 1000);
            }
        });

    }, _time);

}


function acceptType(data) {

    let result = false;

    const types = [
        'png',
        'jpg',
        'images'
    ];

    types.forEach(element => {
        if (data.indexOf(element) > -1) {
            result = true;
        };
    });

    return result;

}


function excludeType(data) {
    let result = false;

    const types = [
        '75x75',
        'memes',
        'googlesyndication',
        'favicon',
        'data:image',
        'creative.360yield',
        '72x72',
        // 'ftpe8-2',
        '.xx',
        'scontent.ftpe8-1',
        'jpg_',
        'png_'
    ];

    types.forEach(element => {
        if (data.indexOf(element) > -1) {
            result = true;
        };
    });

    return result;
}



async function getLocalHtml(path) {
    let fileText =  await readFile.read(path);

    var $ = cheerio.load(fileText);

    let links =[];
    const imgs = $('a');

    imgs.each((i, elem) => {

      let href = $(elem).attr('href')
        if (href !== undefined){
            if (href.indexOf('fbid')　> -1){
                links.push(`https://www.facebook.com/photo.php?fbid=${href.split('fbid=')[1]}`)
            }
        }


    })
    console.log(`total links size = ${links.length}`)

   return links;

}


module.exports = {
    getPicture,
    getPictureNew,
    getData,
    getLocalHtml
};