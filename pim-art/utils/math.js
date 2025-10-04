function getRandomInt(start, end) {
    return Math.round(start + Math.random() * (end - start));
}


function getRandomDec(start, end) {
    return start + Math.random() * (end - start);
}


export {getRandomInt, getRandomDec}