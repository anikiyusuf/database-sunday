const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

function checkUser(req,res){
    const tokenData = req.cookies.myToken;

    if(!tokenData){
        return res.status(403)
                  .redirect("/enter")
    }
    let payload
    try{
        payload = jwt.verify(tokenData, JWT_SECRET)
    }catch(e){
        if(e instanceof jwt.JsonWebTokenError){
            res.status(401).send({message:'Invalid token'})
        }
        return res.status(400).send({message:'Invalid token, please validate token'})
    }
     res.render('createPost')
}


module.exports = {checkUser}