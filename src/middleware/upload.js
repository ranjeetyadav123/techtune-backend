const multer = require('multer');

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'folderType', maxCount: 1 },
]);
module.exports = upload;