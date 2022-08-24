const bodyParser = require("body-parser");
const path=require('path');
const express =require("express");
const colors=require("colors")
const connectDB =require("./config/db.js")
const dotenv =require("dotenv").config();
const {errorHandler}=require("./middleware/errorsMiddleware");
const { dirname } = require("path");
var cors = require('cors')
const port=process.env.PORT || 8000;

connectDB();

const app=express();



app.use(cors())
// middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({extended:true}))


app.use("/api/blogs",require("./routes/blogsRoutes"))
app.use("/api/users",require("./routes/userRoutes"))
// Server frontend
if(process.env.Node_ENV==='production'){
    console.log((path.join(__dirname, '../build')),"hell")
    app.use(express.static(path.join(__dirname, '../build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname, "../build","index.html")))
}else{
    app.get('/',(req,res)=>res.send("this is not production mode "))
}

// app.use((req,res,next)=>{
//     res.status(404)
//     throw new Error("wrong api adddress was hitted")
//     next();
// })

app.use(errorHandler)

app.listen(port,()=>console.log(`server started at ${port}`))