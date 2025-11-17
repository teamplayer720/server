var express = require('express');
const car_controllers = require('../controllers/car');
var router = express.Router();

router.get('/', car_controllers.car_view_all_Page); 

/* GET detail costume page */
router.get('/detail', car_controllers.car_view_one_Page); 

/* GET create costume page */
router.get('/create', car_controllers.car_create_Page);

module.exports = router;