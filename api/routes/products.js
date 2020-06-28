const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

const productController = require('../controllers/product');


router.get('/', auth, productController.index);
router.get('/:productId', auth, productController.show);
router.post('/', auth, upload.single('productImage'), productController.store);
router.put('/:productId', auth, productController.update);
router.delete('/:productId', auth, productController.destroy);

module.exports = router;