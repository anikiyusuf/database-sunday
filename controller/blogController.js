const blogModel = require("../model/blogModel")




async function getAllBlog(req,res){
    try{
        const pageNumber = parseInt(req.query.pageNumber) || 0;
        const limit = parseInt(req.query.limit)||20;
        const result = {};
        const totalPosts = await blogModel.countDocuments().exec();
        let startIndex = pageNumber * limit;
        const endIndex = (pageNumber + 1) * limit;
        result.totalPosts = totalPosts;
        if(startIndex > 0 ){
            result.previous = {
                pageNumber:pageNumber -1,
                limit:limit,
            };
        }
    if(endIndex < (await blogModel.countDocuments().exec())){
        result.next = {
        pageNumber: pageNumber + 1,
        limit,
     }
}
    result.data = await blogModel.find({})
        .sort("-_id")
        .skip(startIndex)
        .limit(limit)
        .exec();
        result.rowsPerPage = limit;
        return res.render('index', {
            result: result.data
        })

    }catch(error){
        console.log(error)
    }
}




// Creation Blog 
async function createBlog(req,res,){
    const blog = req.body
    blog.createAt = new Date()
    blogModel.create(blog , (error, data) =>{
        if(error){
            return res.render('createPost')
        }
    })
    res.redirect('/')
    res.end()
    
   
}
async function getBlogById(req,res , next){
       try{
        const id = req.params.id
        const blog = await blogModel.findById(id)
        if(blog.read_count == null){
            console.log(blog.read_count = parseInt(1))
            blog.save()
            return
        }
        blog.read_count ++;
        blog.save()
        res.status(200)
        res.render('post', {
            blog
        })
       }catch(error){
        console.log(error)
        res.redirect('/error')
       }
}


async function searchBlog(req,res){
    try{
        blogModel.find(
            {
                $or:[
                    {title:{$regex:req.query.dsearch,$options:'i'}},
                    {author:{$regex:req.query.dsearch, $option:'i'}}
                ],

            },
            (err,result)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(result)
                    res.render('index',{result})

                }
            }
        );
    }catch(error){
        console.log(error)
    }
}

module.exports = { getAllBlog, createBlog, getBlogById , searchBlog}