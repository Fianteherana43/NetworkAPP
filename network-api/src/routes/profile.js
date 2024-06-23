const express = require('express');
const multer = require('multer');
const path = require('path'); 
const profileController = require('../controllers/profile');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.get('/profile/:userId', profileController.getProfileDetails);
router.post('/upload/:userId', upload.single('profile'), profileController.upload);

module.exports = router;
