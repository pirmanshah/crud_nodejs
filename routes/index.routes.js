const router = require('express').Router();
const {index, create, getById, update, destroy} = require('../controllers/user.controllers');

router.get('/', index);
router.post('/', create);
router.get('/update/:id', getById);
router.post('/update/:id', update);
router.get('/delete/:id', destroy);

module.exports = router;