import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


const CLOUDINARY_COULDNAME = "dw0ehvbnr"
const CLOUDINARY_APIKEY = 476157638249479
const CLOUDINARY_APISECRET = "uoZSCVUzhCihito7QKJxHsfUA0I"

cloudinary.config({
  cloud_name: CLOUDINARY_COULDNAME,
  api_key: CLOUDINARY_APIKEY,
  api_secret: CLOUDINARY_APISECRET
})

const uploadOnCloudinary = async (localFilePath, fileName) => {
  try{
    if(!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: 'auto',
      public_id: fileName
    });
    // file has been uploaded successfully 
    console.log('file is uploaded on cloudinary', response.url);
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error){
    fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload operation got faild
    return null;
  }
}


export {uploadOnCloudinary};