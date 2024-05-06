const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {  
    const path = req.session.pathImgConvSess;
    console.log('le di al boton y me trajo this '+ path);

    res.download(path);
});
module.exports = router;