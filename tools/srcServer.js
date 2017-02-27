import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
var item = require('../src/models/itemModel');
var connection = require('../src/DB/connection');
var user = require('../src/models/userModel');
var complain = require('../src/models/complainModel');

var bodyParser = require('body-parser')


/* eslint-disable no-console */

const port = 3000;
const app = express();
connection.init();
const compiler = webpack(config);


// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
/*app.post('/login', urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400)
  // create user in req.body
})*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('/images'));

app.get('/', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

app.get('/getItems',function(req,res){
  let itn=[];
  item.get(res);
  //res.json(itn);
});

app.get('/getLimitedItems',function(req,res){
  let itn=[];
  item.getLimited(res);
  //res.json(itn);
});

app.get('/getItemById',function(req,res){
  console.log('>>>>>>>>>>>>>>>>>');
  let id = req.param("id");
  console.log("ID : "+id);
  item.getItemById(res,id);
});

app.get('/getItemsByType',function(req,res){
  let type = req.param("type");
  console.log("TYPE : "+type);
  item.getItemsByType(res,type);
});


app.get('/searchItems',function(req,res){
  let key = req.param("key");
  console.log("KEY : "+key);
  item.searchItems(res,key);
});

app.get('/saveItem',function(req,res){
  
});

app.get('/updateItem',function(req,res){
  
});

app.post('/buyItems',jsonParser,function(req,res){
  console.log('>>>>>>>>>>>>>>>>> BUY ITEMS');
  let checkout = req.body.checkout;
  console.log(checkout); 
  item.buyItem(res,checkout); 

  
});


app.post('/loadComplains',jsonParser, function(req,res){
  console.log("LOADING COMPLAINS");
  let user_id = req.body.user_id;
  console.log(user_id);
  console.log(res)
  complain.loadComplains(res, user_id);
})

app.post('/loadComplain', jsonParser ,function(req,res){
  console.log("LOADING ONE COMPLAIN");
  console.log(">>>>")
  console.log(req)
  console.log(req.body)
  let comp_id = req.body.comp_id;
  console.log(comp_id)
  complain.loadComplain(res,comp_id);
})

app.post('/loadComments', jsonParser ,function(req,res){
  console.log("LOADING ONE COMMENTS");
  let comp_id = req.body.comp_id;
  complain.loadComments(res,comp_id);
})

app.get('/loadPollutionTypes', function(req,res){
  console.log("LOADING POLLUTION TYPES")
  complain.loadPollutionTypes(res);
})

app.post('/checkEmailValidity', jsonParser, function(req,res){
  let credentials = req.body.credentials;
  user.checkEmailValidity(res,credentials); 
})

app.get('/loadExpectedActions', function(req,res){
  console.log("LOADING EXPECTED ACTIONS")
  complain.loadExpectedActions(res);
})

app.post('/login', jsonParser, function(req,res){
  let credentials = req.body.credentials;
  user.getUserByUsername(res,credentials); 

})

app.post('/loginAdmin', jsonParser, function(req,res){
  console.log("Login Admin...")
  let credentials = req.body.credentials;
  console.log(credentials)
  res.json({success:true});
})


app.post('/addComplain', jsonParser, function(req,res){
  console.log("ADDING COMPLAIN 1");
  console.log(JSON.stringify(req.body));
  let details = req.body.details;
  console.log(details)
  complain.addComplain(res,details); 

})

app.post('/register', jsonParser, function(req,res){
  console.log("REGISTERING");
  let details = req.body.credentials;
  user.register(res,details); 

})


app.post('/addComment', jsonParser, function(req,res){
  console.log("ADDING COMMENT");
  console.log(JSON.stringify(req.body));
  let details = req.body.details;
  console.log(details)
  complain.addComment(res,details); 

})



app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});