const express = require('express')
const {getAllBlog, createBlog , getBlogById  , searchBlog}  = require('../controller/blogController')


const blogRouter = express.Router()



blogRouter.get('/' ,getAllBlog )
blogRouter.get('/:id', getBlogById)
blogRouter.get('/search' , searchBlog)
blogRouter.post("/create" , createBlog)



module.exports = blogRouter