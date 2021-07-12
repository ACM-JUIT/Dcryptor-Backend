const history = require('./../models/historyModal');


exports.getallHistory = async (req,res,next)=>{
    if(req.user){
        let filter = {}
        filter = {user:req.user.id}
         
        const decodedHistory = await history.find(filter)
    
        console.log(decodedHistory.length)
        res.status(200).json({
            status: 'success',
            totalDecode: decodedHistory.length,
            decodedHistory
          });
    }else{
        res.status(200).json({
            status: 'Please Login To View History!!',
        });
    }
    
}