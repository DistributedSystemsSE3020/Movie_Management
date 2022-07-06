const router = require ("express").Router();
const {addCardPayment} = require ('../controllers/creditcardcontroller.js');

const {fetchAll, fetchOne } = require ('../controllers/creditcardcontroller.js');

router.post('/addCardPayment', addCardPayment);


module.exports = router;