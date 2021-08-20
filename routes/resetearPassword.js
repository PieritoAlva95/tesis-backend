const { Router } = require('express');

const { resetearPassword } = require('../controllers/resetearPassword');

const router = Router();

router.put('/', resetearPassword);

module.exports = router;
