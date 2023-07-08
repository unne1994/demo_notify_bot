const Time = require('./Time.js');
const fs = require('fs');



function read(path) {

    const textFilePath = path;

    return new Promise(resolve => {
        fs.readFile(textFilePath, 'utf8', (err, data) => {
            if (err) throw err;
            // console.log(data);
            resolve(data);
        });      
    });

}

module.exports = {
    read
};