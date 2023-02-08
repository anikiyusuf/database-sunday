const mongoose  = require('mongoose')
const Schema = mongoose.Schema


const blogModel = new Schema({
    title:{
        type:String,
        require:true,

    },
    description:{
        type:String,
        require:true
    },
    body:  {
        type: String,
        required: true
    },
    read_count:{
        type:Number,
        default:0,
    },
    state: {
        type: String,
        default: "draft",
        enum: ["draft", "published"],
      },
    tag:{
   type:String,
    },
    createAt : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    }
})

 module.exports = mongoose.model('Blog' , blogModel)