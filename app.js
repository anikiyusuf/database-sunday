const express = require("express")
require('dotenv').config()

const { connectionMongoDB } = require('./db')

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')

const { checkUser } = require("./middleware/authMiddleware");
const userRouter = require('./routes/userRoute')
const blogRouter = require('./routes/blogRoute')






const PORT = 3000
const app = express()



app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
connectionMongoDB()




app.use('/user', userRouter)

app.use('/blog', blogRouter)

// views 
app.set('view engine', 'ejs')
app.set('view engine')



// View Pages
app.get('/', (req, res) => {
  res.render('index');
});
app.get("/register", (req, res) => {
    res.render("register");
  });

  app.get("/enter", (req, res) => {
    res.render("enter");
  });

  app.get("/posts/new", checkUser, (req, res) => {
    res.render("createPost");
  });
  
  app.get("/search", (req, res) => {
    res.render("searchBlog");
  });
   
  app.get("/post", (req, res) => {
    res.render("post");
  });
  
  app.get("/error", (req, res) => {
    res.render("error");
  });  
// app.get("/" , (req,res)=>{
//     res.send("Hello World ")
//     res.end()
// })
app.use((err, req, res, next) => {
    console.log(err);
    res.status(400);
    res.redirect("/error")
  });

app.listen(PORT , () =>{
    console.log(`Server running on port localhost:${PORT}`)
})