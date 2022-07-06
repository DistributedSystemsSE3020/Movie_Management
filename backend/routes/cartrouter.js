const router = require("express").Router();
const {additem, updateitem, deleteitem, viewCart, viewOneCart} = require('../controllers/cartcontroller.js')
const customerauth = require('../middleware/customerauth');

router.post('/add', additem);

router.put('/update/:id',customerauth, updateitem);

router.delete('/delete/:id',customerauth, deleteitem);

router.get('/:id&:type', viewCart);

router.get('/:id', viewOneCart);

module.exports = router;