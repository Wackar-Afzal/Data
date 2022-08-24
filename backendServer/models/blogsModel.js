const mongoose=require("mongoose")

const blogsSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type:String,
        required:[true,"Please add a description for blog"]
    },
    title:{
        type:String,
        required:[true,"Please add a heading for blog"]
    },
    image:{
        type:String,
        required:[true,"please add a image for blog"]
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Blog",blogsSchema)