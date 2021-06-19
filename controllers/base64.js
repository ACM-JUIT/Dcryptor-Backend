const {Base64} = require('js-base64');

exports.decodeB64 = (data) => {
    let str = [];
    while(Base64.isValid(data)){
        data = Base64.decode(data)
        str.push(data)
        console.log(data)
    }
    return str
}