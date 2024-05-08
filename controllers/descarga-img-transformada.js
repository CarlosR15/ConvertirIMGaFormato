const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {  
    const path = req.session.pathImgConvSess;
    res.download(path);
});
module.exports = router;