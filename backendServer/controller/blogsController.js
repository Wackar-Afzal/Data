const asyncHandler=require("express-async-handler");
const Blog=require("../models/blogsModel.js");
const {User}=require("../models/userModel");
const path=require('path');


// @des getGoals
// @route GET /api/blogs
// @acess public
const getBlogs=asyncHandler(async(req,res)=>{
    const blogs=await Blog.find({}).populate("user")
    if(!blogs){
        res.status(400)
        throw new Error("No blogs created yet")
    }else{
        res.status(200).json({data:blogs,message:"blogs loaded sucessfully"});  
    }
   
})
  
// @des create blog
// @route POST /api/blogs
// @acess private




const createBlogs=asyncHandler(async(req,res)=>{
    // console.log(req.file)
    if(!req.body.text || !req.body.title || !req.file.fieldname){
    res.status(400)
    throw new Error("Please add all feilds")
    }else{
        // const img=req.file?req.file.fieldname:null;
        // if(!img){    res.status(400)
        //     throw new Error("img file not found"+""+req.body.title)}
        if(req.user.person==="admin"){
        const blog=await Blog.create({
            text:req.body.text,
            user:req.body.id,
            title:req.body.title,
            image:req.file.filename,
            user:req.user.id
        })
        console.log("created")
        res.status(200).send(blog)

    }else{
    res.status(400)
    throw new Error("you cannot create blog post")
    }

    }
        
})

// @des updatetGoals 
// @route PUT /api/goal/:id
// @acess private
const updateBlog=asyncHandler(async(req,res)=>{

    const blog=await Blog.findById(req.params.id);
    const user=await User.findOne(req.user._id);

    if(!blog){
        res.status(400) 
        throw new Error("blog not found while updating")
    }

    // Check for user
    if(!req.user || !user){
        res.status(401)
        throw new Error("user or blog not found or try again")
    }

    // making sure the looged in user is admin
    if( user.person!=="admin"){
        res.status(401)
        throw new Error("user not authorized...Or try again")
    }
    console.log(blog)
    const updatedblog= await Blog.findByIdAndUpdate(req.params.id,{            text:req.body.text,
        user:req.body.id,
        title:req.body.title,
        image:req.file.filename,
        user:req.user.id},{new:true})
    console.log(updatedblog)
    res.status(200).json(updatedblog)
})
// @des updateBlogtext 
// @route Patch /api/goal/:id
// @acess private
const updateBlogtext=asyncHandler(async(req,res)=>{
    console.log("parAMS",req.params)
        const blog=await Blog.findById(req.params.id)
        console.log(blog)
        if(!blog){
            res.status(400) 
            throw new Error("blog info not found while updating try again")
        }
        console.log(blog._id.toString())
    
        // Check for user
        if(!req.user){
            res.status(401)
            throw new Error("user or blog not found...... while updating goal")
        }
        // making sure the looged in user is updating specific
        if(blog._id.toString() !==req.params.id){
            res.status(401)
            throw new Error("something went wrong plz try again")
        }
        const updatedblog= await Blog.findByIdAndUpdate(req.params.id,{"text":req.body.text},{new:true})
        console.log(updatedblog)
        res.status(200).json({data:updatedblog,message:`${updatedblog.title} deccription updated sucessfully`})
    })
    
// @des deleteGoals
// @route POST /api/goal/:id
// @acess private
const deleteBlog=asyncHandler(async(req,res)=>{
    const blog=await Blog.findById(req.params.id)
    if(!blog){
        res.status(400) 
        throw new Error("Blog not found")
    }
    // Check for user
    if(!req.user){
        res.status(401)
        throw new Error("user not found...... while updating blog")
    }

    // making sure the looged in user is admin and deleting own blog

    if(req.user.person!=="admin"){
        console.log(req.user.person)
        console.log(req.user.name)
        res.status(401)
        throw new Error("user not authorized...you are not allowed to delete this blog")
    }
    await Blog.findByIdAndDelete(req.params.id,{confirm:true})
    res.status(200).json(blog._id)
})




module.exports={getBlogs,createBlogs,updateBlog,deleteBlog,updateBlogtext};
