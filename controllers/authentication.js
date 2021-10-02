const User = require('./../models/userModal');
const jwt = require('jsonwebtoken');
const validator = require('validator')
const { promisify } = require('util');

// Function To Sign/Generate Token
const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.secretKey, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
// Sign-Up Function
exports.signup = async (req,res,next) => {
    
    if(validator.isEmail(req.body.email) && req.body.password == req.body.confirmPassword){
        let newUser
        try{
            newUser = await User.create({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
            });
        }catch(err){
            return next(err)
        }
        
        const token = signToken(newUser.id);

        res.status(200).json({
            "Status" : true,
            token,
        })
    }else{
        return res.status(400).json({
            "Error" : "Something is wrong!"
        })
    }
  
}

// Log-In Function

exports.login = async (req, res, next) => {
    
    const { email, password } = req.body;
  
    // check if email exist
    if (!email && !password) {
        return res.status(400).json({
            "Error" : "Please Specify Email and Password!"
        })
    }
    //check if user exist and password is correct
    let user;
    try{
        user = await User.findOne({ email }).select('+password');
    }catch(err){
        return next(err)
    }
    
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(400).json({
            "Error" : "Incorrect Email or Password!!"
        })
    }
    // if everthying ok, send jwt
    const token = signToken(user._id);
    res.status(200).json({
      status: true,
      token,
    });
  };

  // FOR PROTECTING API'S AND SENDING USER DATA 
  exports.protectedAccess = async (req, res, next) => {
    let token;
    // Get Token and checking if exist
  
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next()
    }
    // Validate Token
    let decoded
    try{
        decoded = await promisify(jwt.verify)(token, process.env.secretKey);
    }catch(err){
        return next(err)
    }
    
  
    //check if user still exist
    let freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next()
    }

    req.user = freshUser;
    next();
  };
  