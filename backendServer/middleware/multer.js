const multer=require("multer");
const path=require('path');

const storage	=multer.diskStorage({
    destination:(req, file, callback)=> {
      callback(null,"./build/images");
    },
    filename:(req, file, callback)=> { console.log(req.body.title)
      callback(null, file.fieldname + '_' + Date.now() 
      + path.extname(file.originalname))
    }
  });
const upload=multer({ storage: storage })

module.exports={
    upload
}