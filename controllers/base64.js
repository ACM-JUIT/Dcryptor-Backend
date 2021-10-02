const {Base64} = require('js-base64');

function isASCII(str) {
    return /^\w+$/i.test(str);
}

exports.decodeB64 = (data) => {
    let str
    if(Base64.isValid(data)){
        str= [];
        while(Base64.isValid(data)){
            data = Base64.decode(data)
            if(isASCII(data)){
                str.push(data)
            }else{
                break;
            }
        }
    }else{
        str = "Error CNC"
    }
    
    return str
}