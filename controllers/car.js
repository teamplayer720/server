var car = require('../models/car');
// List of all Costumes
exports.car_list = async function(req, res) {
    try{
        thecars = await car.find();
        res.send(thecars);
    }
        catch(err)
        {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// for a specific Costume.
exports.car_detail = async function(req, res) {
res.send('NOT IMPLEMENTED: car detail: ' + req.params.id);
};
// Handle Costume create on POST.
exports.car_create_post = async function(req, res) {
res.send('NOT IMPLEMENTED: car create POST');
};
// Handle Costume delete from on DELETE.
exports.car_delete = async function(req, res) {
res.send('NOT IMPLEMENTED: car delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.car_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await car.findById( req.params.id)
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
thecars = await car.find();
res.render('car', { title: 'Car Search Results', results: thecars });
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
    let document = new car();
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
result = await car.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};

// Handle Costume delete on DELETE.
exports.car_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {

    result = await car.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)

} 
catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
};


// Handle a show one view with id specified by query
exports.car_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
        result = await car.findById( req.query.id)
        res.render('car_detail',
            { title: 'Car Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
}; 

//Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.car_create_Page = async function(req, res) {
    console.log("create view")
    try{
        res.render('car_create', { title: 'car Create'});
    }
catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a costume.
// query provides the id
exports.car_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await car.findById(req.query.id)
        res.render('car_update', { title: 'Car Update', toShow: result });
    }
catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
};


// Handle a delete one view with id from query
exports.car_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
        result = await car.findById(req.query.id)
        res.render('car_delete', { title: 'Car Delete', toShow:
        result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};






