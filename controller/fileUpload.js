const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

//localFileUpload -> handler function

exports.localFileUpload = async (req, res) => {
  try {
    //fetch file
    const file = req.files.file;
    console.log("file AAGYI JEE -> ", file);

    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("Path=>", path);
    file.mv(path, (err) => {
      console.log(err);
    });
    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.error("not able to upload the file");
    console.log(error);
  }
};
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFiletoCloudinary(file, folder, quality) {
  const options = { folder };
  console.log("tmep file path: ", file.tempFilePath);
  if(quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload ka handler
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.imageFile;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }
    //file format supported hai
    const response = await uploadFiletoCloudinary(file, "kashishNegi");
    console.log(response);
    //db me entry save krni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "image successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong while uploading image",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);
    const file = req.files.videoFile;
    console.log(file);

    //validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //add a upper limit for 5 mb for a video
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }
    //file format supported hai
    const response = await uploadFiletoCloudinary(file, "kashishNegi");
    console.log(response);
    //db me entry save krni hai
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "video successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong while uploading video",
    });
  }
};

//imageSizeReducer:









exports.imageSizeReducer = async (req,res) => {
  try{
      //data fetch
      const { name, tags, email} = req.body;
      console.log(name,tags,email);

      const file = req.files.imageFile;
      console.log(file);

      //Validation
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split('.')[1].toLowerCase();
      console.log("File Type:", fileType);

      //TODO: add a upper limit of 5MB for Video
      if(!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({
              success:false,
              message:'File format not supported',
          })
      }

      //file format supported hai
      console.log("Uploading to Codehelp");
      //TODO: height attribute-> COMPRESS
      const response = await uploadFileToCloudinary(file, "Codehelp", 90);
      console.log(response);

      //db me entry save krni h
      const fileData = await File.create({
          name,
          tags,
          email,
          imageUrl:response.secure_url,
      });

      res.json({
          success:true,
          imageUrl:response.secure_url,
          message:'Image Successfully Uploaded',
      })
  }
  catch(error) {
      console.error(error);
      res.status(400).json({
          success:false,
          message:'Something went wrong',
      })
  }
}