module.exports = (err, req, res, next) => {
    
    if(err.code == 11000){
        res.status(403).send('EmailID/Username Already Exist!');
    }
    if(err.name == "JsonWebTokenError"){
        res.status(403).send('Token Malformed! Please Log-In Again!!');
    }else{
        res.status(500).json({
            "Errr": err
        })
    }
}   