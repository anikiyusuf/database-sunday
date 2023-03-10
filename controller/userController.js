const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET



// this function is used to create token using user id
const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '1h',
  });
};




const register = async (req, res, next) => {
  try {
    const {firstName,lastName, email, password } = req.body;

     const user = await UserModel.create({ firstName,lastName,email, password });
     console.log(user)

   res.redirect("/enter")
    
  } catch (err) {
    console.log(err);
    res.status(500)
     res.json({ err, created: false });
  }
};


//   LOGIN USER CONTROLLER
const login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await UserModel.findOne({ email:email });
     
    
    
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
  }
  const validate = await user.isValidPassword(password);
  if (!validate) {
    return res.status(400).send({ message: 'Wrong password' });
}
    
    const token = createToken(user._id);
    console.log(token)
    res.status(200)
       .cookie('jwt', token,{maxAge:3600000, path:'/posts/new' })
       .render('createPost')
  } catch (err) {
    res.status(500)
    res.json({ err, status: false });
  }
};

// async function logOut(req, res, next) {
//   try {
//     res.cookie("jwt", "", { maxAge: 1 });

//     res.render("/index", { error: undefined });
//   } catch (error) {
//     next(error);
//   }
// }


module.exports = {register , login }   //I am to add the logout function to check if it will work.