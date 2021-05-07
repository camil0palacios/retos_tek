const { Router } = require('express');
const router = Router();
const controller = require('../controllers/index.js');

router.get('/contagios', controller.contagios);
router.get('/filtrar', controller.filtrar);

module.exports = router;