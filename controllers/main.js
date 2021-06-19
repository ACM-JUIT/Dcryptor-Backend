const {spawn} = require('child_process');
const { once } = require('events');
const base64 = require('./base64');

//Function to Run decodify Script using NodeJS built-In Module Child-process (https://nodejs.org/api/child_process.html)
const decodify = async (data) => {
    const command = spawn(`python`, [`-u`,`${__dirname}/decodify.py`,data]);
    let decoded_data = '';
    command.stdout.on('data', (data) => {
        decoded_data+=data
    })
    await once(command, 'close')
    return decoded_data
}

// Replace Escape sequences in incoming data
const cleanData = (data) => {
    return data.replace(/\n/g, "").replace(/\r/g, "");
}

const trimData = (data) => {
    return data.trim().split("|").filter(Boolean)
}

//for removing any space 
const forhex = (data) => {
    return data.replace(/ /g, "")
}

exports.main = async (req,res) => {
    let data  = req.body.data
    let decoded, status = "Failed"
    if(data){
        data = forhex(data)
        let decoded_data = await decodify(data)
        decoded_data = cleanData(decoded_data)
        if(!decoded_data.startsWith('404')){
            decoded_data = trimData(decoded_data)
            status = "successful"
        }
        res.status(200).json({
            "Status": status,
            decoded_data,
            data
        })
    }else{
        status = "Data field Cannot be Empty!"
        res.status(400).json({
            "Status": status,
        })
    }


    
}

// In progress for particularly Ciphers
exports.magic = async (req,res) => {
    const method  = req.body.method;
    const data = req.body.data;
    // BASE64
    let decoded_data;
    if(method == "base64"){
        decoded_data = base64.decodeB64(data);
    }
    res.status(200).json({
        "Status": "successful",
        decoded_data
    })
}