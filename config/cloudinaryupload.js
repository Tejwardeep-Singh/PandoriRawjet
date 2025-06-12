// config/cloudinaryUpload.js

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
// Multer + Cloudinary storage setup
const storageHead = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "headImages", // Optional folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});
const storageTeachers = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "teacherImages", // Optional folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});
const storageStudents = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "studentImages", // Optional folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"]
    }
});
const uploadHead = multer({ storage: storageHead });
const uploadTeacher = multer({ storage: storageTeachers });
const uploadStudent = multer({ storage: storageStudents })

module.exports = {
    uploadHead,
    uploadTeacher,
    uploadStudent
};
