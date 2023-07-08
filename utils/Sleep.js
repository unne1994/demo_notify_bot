const Time = require('../utils/Time');



function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
 
async function delay() {
    const seconds = 5;
    console.log(Time.LogTime() + `Sleeping… ${seconds} seconds`);
    await sleep(seconds * 1000);
    console.log(Time.LogTime() + 'Awake…');
}


module.exports = {
    delay
};