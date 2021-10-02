const express = require("express")
const magic  = require('./controllers/main')
const auth = require('./controllers/authentication')
const history = require('./controllers/history')
const app = express();
const ratelimiter = require('express-rate-limit')
const helmet = require("helmet"); // For setting Basic headers 
const errorDB = require('./controllers/errorDB')
const mongoSanitize = require('express-mongo-sanitize');
const xss = require("xss-clean");
// Currently API requests per 15 min is limited to 10
const limiter = ratelimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too Many Requests!"
});

const fourfour = (req,res,next) => {
    res.status(404).json({
        status: "404"
    })
    next();
}

// Middleware to filter out data that might contain arbitrary code execution 
// This is Just basic version will replace it later with improvements 
// Known Issue (might be)



const bad_data = (req,res,next) => {
    bad  = [';', ':', '!', "*","\"","\'"]
    data = req.body.data;
    let flag = 0;
    for (x in data){
        if(bad.includes(data[x])){
            flag = 1;
            break;
        }
    }
    if(flag != 0 || data.length > 100){
        res.status(400).json({
            status: "Failed",
            "message": "Failed to decode"
        })
    }else{
        next()
    }
}


// All Middleware/Routes
app.use(helmet());
app.use(express.json({limit: '10kb'}))
app.use(limiter);
app.use(xss());
app.use(mongoSanitize());
app.post('/api/v1/signup', auth.signup)
app.post('/api/v1/login', auth.login)
app.post('/api/v1',auth.protectedAccess, bad_data,magic.main)
app.post('/api/v2',auth.protectedAccess, bad_data, magic.newmain)
app.get('/api/v2/history',auth.protectedAccess,history.getallHistory)

//For all Other 404's   
app.all("*", fourfour)
app.use(errorDB);
module.exports = app;