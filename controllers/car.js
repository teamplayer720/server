var Costume = require('../models/car');
// List of all Costumes
exports.car_list = async function(req, res) {
    try{
        theCars = await Car.find();
        res.send(theCars);
    }
        catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Costume.
exports.car_detail = function(req, res) {
res.send('NOT IMPLEMENTED: car detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.car_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: car create POST');
};
// Handle Costume delete from on DELETE.
exports.car_delete = function(req, res) {
res.send('NOT IMPLEMENTED: car delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.car_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: car update PUT' + req.params.id);
}; 