const express = require('express');
const router = express.Router();

//multer para subir imagenes
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  res.json(req.file);
});

module.exports = router;