const router = require ("express").Router();
const {addMobilePayment} = require ('../controllers/mobilebillcontroller.js');

const {fetchAll, fetchOne } = require ('../controllers/mobilebillcontroller.js');

router.post('/addmobile', addMobilePayment);


module.exports = router;