const express =require("express");
const router =express.Router();
const {getBlogs,createBlogs,updateBlog,deleteBlog,updateBlogtext}=require("../controller/blogsController.js")
const {protect}=require("../middleware/authMiddleware");
const {upload}=require("../middleware/multer")
// const fileStorageEngine=multer.diskStorage({
//     destination:(req,file,callback)=>{
//         callback(null,'front-end')
//     },
//     filename:(req,file,callback)=>{
//         callback(null,Date.now()+'--'+file.originalname)
//     }
// })


router.route('/').get( getBlogs);
router.route('/').post(protect,upload.single('imgFile'),createBlogs);

router.route('/:id').put(protect,upload.single('imgFile'), updateBlog).delete(protect, deleteBlog).patch(protect,updateBlogtext);



module.exports=router;