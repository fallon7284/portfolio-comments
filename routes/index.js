const express = require('express');
const router = express.Router();
const cors = require('cors')



router.use(cors())
/* GET home page. */

router.use('/', require('./comments'))
// router.use('/comments', comments);


module.exports = router;