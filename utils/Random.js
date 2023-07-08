
function random(startIndex, length) {
    let result = Math.floor(Math.random() * length) + startIndex;
    // console.log(`random: ${result}`)
    return result;
}



module.exports = {
    random
};