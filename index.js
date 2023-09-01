//app create
const express= require("express");
const app = express();

//PORT find krna hai
require("dotenv").config();
const PORT= process.env.PORT;

//middleware adding
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//db se connect krna hai..
const db = require("./config/database");
db.connect();

//cloud se connect krna hia..
const cloudinary= require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api routes mount
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload",upload);

//activate server
app.listen(PORT , ()=>{
    console.log(`app is listening at ${PORT}`);
})