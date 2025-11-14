var Car = require('../models/car');
// List of all Costumes
exports.car_list = async function(req, res) {
    try{
        theCars = await Car.find();
        res.send(theCars);
    }
        catch(err)
        {
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
exports.car_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await Car.findById( req.params.id)
// Do updates of properties
if(req.body.model)
    toUpdate.model = req.body.model;
if(req.body.cost) 
    toUpdate.cost = req.body.cost;
if(req.body.make) 
    toUpdate.make = req.body.make;
let result = await toUpdate.save();
console.log("Success " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};  

// VIEWS
// Handle a show all view
exports.car_view_all_Page = async function(req, res) {
try{
theCars = await Car.find();
res.render('car', { title: 'Car Search Results', results: theCars });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};
/* EXTRA CODE
var express = require('express');
const car_controllers= require('../controllers/car');
var router = express.Router();*/
/* GET costumes 
router.get('/', car_controllers.car_view_all_Page );
module.exports = router;*/

// Handle Costume create on POST.
exports.car_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Car();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.make = req.body.make;
    document.model = req.body.model;
    document.cost = req.body.cost;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Costume.
exports.car_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await Car.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};



