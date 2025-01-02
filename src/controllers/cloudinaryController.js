const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');

const upload = require("../middleware/upload");


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Multer Error:', err);
      return res.status(500).json({ message: 'Error processing file', error: err.message });
    }

    const folderType = req.body.folderType; 
   

    if (!folderType || !['category', 'product', 'offer'].includes(folderType)) {
      return res.status(400).json({ message: 'Invalid folder type' });
    }

    if (!req.files || !req.files.image || !req.files.image[0].buffer) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const folderPath = `TechTune/${folderType}`;
    const fileBuffer = req.files.image[0].buffer;

    cloudinary.uploader.upload_stream(
      { folder: folderPath },
      (cloudinaryError, result) => {
        if (cloudinaryError) {
          console.error('Cloudinary Error:', cloudinaryError);
          return res.status(500).json({ message: 'Error uploading to Cloudinary', error: cloudinaryError.message });
        }

        return res.status(200).json({
          message: 'Image uploaded successfully',
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    ).end(fileBuffer);
  });
};