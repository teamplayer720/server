var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var car_controller = require('../controllers/car');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/car', car_controller.car_create_post);
// DELETE request to delete Costume.
router.delete('/car/:id', car_controller.car_delete);
// PUT request to update Costume.
router.put('/car/:id', car_controller.car_update_put);
// GET request for one Costume.
router.get('/car/:id', car_controller.car_detail);
// GET request for list of all Costume items.
router.get('/car', car_controller.car_list);
module.exports = router;