import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
var item = require('../src/models/itemModel');
var connection = require('../src/DB/connection');
var user = require('../src/models/userModel');
var complain = require('../src/models/complainModel');
var species = require('../src/models/speciesModel');
var advModel = require('../src/models/advModel');
var events = require('../src/models/eventModel');


var bodyParser = require('body-parser');
var fs = require('fs');
var busboy = require('connect-busboy');
var passport = require('passport');


/* eslint-disable no-console */

const port = 3000;
const app = express();
connection.init();
const compiler = webpack(config);


// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb'})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})
/*app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));*/


app.use(busboy());
/*app.use(passport.initialize());

//const localSignupStrategy = require('./local-signup');
const localLoginStrategy = require('./local-login');
//passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./auth');
const apiRoutes = require('./api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);*/


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
app.use(express.static(path.join(__dirname, 'files')));

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

  complain.loadComplains(res, user_id);
})

app.post('/loadComplainsChunk',jsonParser, function(req,res){
  console.log("LOADING COMPLAINS CHUNK");
  let user_id = req.body.user_id;
  let start = req.body.start;
  let end = req.body.end;

  complain.loadComplainsChunk(res, user_id, start, end);
})

app.post('/loadFavoritesChunk',jsonParser, function(req,res){
  console.log("LOADING FAVORITE CHUNK");
  let user_id = req.body.user_id;
  let start = req.body.start;
  let end = req.body.end;

  complain.loadFavoriteChunk(res, user_id, start, end);
})


app.post('/loadSpecies',jsonParser, function(req,res){
  console.log("LOADING Species");
  let user_id = req.body.user_id;

  species.loadSpecies(res, user_id);
})

app.post('/loadSpeciesChunk',jsonParser, function(req,res){
  console.log("LOADING SPECIES CHUNK");
  let user_id = req.body.user_id;
  let start = req.body.start;
  let end = req.body.end;
  let term = req.body.term;

  species.loadSpeciesChunk(res, user_id, start, end, term);
})

app.post('/loadFavoriteSpeciesChunk',jsonParser, function(req,res){
  console.log("LOADING FAVORITE SPEICES CHUNK");
  let user_id = req.body.user_id;
  let start = req.body.start;
  let end = req.body.end;
  let term = req.body.term;


  species.loadFavoriteSpeciesChunk(res, user_id, start, end, term);
})


app.post('/loadFilteredSpeciesChunk',jsonParser, function(req,res){
  console.log("LOADING FILTERED SPEICES CHUNK");
  let user_id = req.body.user_id;
  let term = req.body.term;
  let start = req.body.start;
  let end = req.body.end;

  species.loadFilteredSpeciesChunk(res,user_id, term, start, end);
})


app.post('/loadComplain', jsonParser ,function(req,res){

  let comp_id = req.body.comp_id;
  let userId = req.body.userId;
  console.log(comp_id)
  complain.loadComplain(res,comp_id,userId);
})


app.post('/loadSpecie', jsonParser ,function(req,res){

  let spec_id = req.body.spec_id;
  let userId = req.body.userId;
  console.log(spec_id)
  species.loadSpecie(res,spec_id, userId);
})


app.post('/loadUsers',jsonParser, function(req,res){
  console.log("LOADING Users");
  let user_id = req.body.user_id;

  user.loadUsers(res, user_id);
})

app.post('/loadUser', jsonParser ,function(req,res){

  let user_id = req.body.user_id;
  let userId = req.body.userId;
  console.log(user_id)
  user.loadUser(res,user_id, userId);
})


app.post('/addToPanel', jsonParser ,function(req,res){
  let user_id = req.body.user_id;
  console.log(user_id)
  user.addToPanel(res,user_id);
})

app.post('/loadComments', jsonParser ,function(req,res){
  console.log("LOADING ONE COMMENTS");
  let comp_id = req.body.comp_id;
  complain.loadComments(res,comp_id);
})


app.post('/loadSpeciesComments', jsonParser ,function(req,res){
  console.log("LOADING SPECIES COMMENTS");
  let spec_id = req.body.spec_id;
  species.loadSpeciesComments(res,spec_id);
})



app.get('/loadPollutionTypes', function(req,res){
  console.log("LOADING POLLUTION TYPES")
  complain.loadPollutionTypes(res);
})

app.get('/loadAppVersion', function(req,res){
  console.log("LOADING APP VERSION")
  complain.loadAppVersion(res);
})

app.post('/loadAppVersion', jsonParser,function(req,res){
  console.log("LOADING APP VERSION post")
  let pform = req.body.pform;

  complain.loadAppVersionPOST(res,pform);
})

app.get('/loadEvents', function(req,res){
  console.log("LOADING EVENTS")
  events.loadEvents(res);
})

app.post('/addEvent', jsonParser, function(req,res){
  let event = req.body.event;
  events.addEvent(res,event);
})


app.post('/deleteEvent', jsonParser, function(req,res){
  let id = req.body.id;
  events.deleteEvent(res,id);
})

app.post('/checkEmailValidity', jsonParser, function(req,res){
  let credentials = req.body.credentials;
  user.checkEmailValidity(res,credentials);
})

app.post('/checkMobileValidity', jsonParser, function(req,res){
  let id = req.body.id;
  let mobile = req.body.mobile;
  user.checkMobileValidity(res,id,mobile);
})


app.post('/verifyEmailWithMobile', jsonParser, function(req,res){
  let credentials = req.body.credentials;
  user.verifyEmailWithMobile(res,credentials);
})

app.post('/loadAgreement', jsonParser, function(req,res){
  let user_id = req.body.user_id;
  user.loadAgreement(res,user_id);
})

app.post('/updateAgree', jsonParser, function(req,res){
  let user_id = req.body.user_id;
  user.updateAgree(res,user_id);
})

app.post('/verifyMobileCode', jsonParser, function(req,res){
  let verifyCredentials = req.body.verifyCredentials;
  user.verifyMobileCode(res,verifyCredentials);
})

app.post('/verifyResetMobileCode', jsonParser, function(req,res){
  let verifyCredentials = req.body.verifyCredentials;
  user.verifyResetMobileCode(res,verifyCredentials);
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
  console.log(credentials);
  user.getAdminUserByUsername(res,credentials);
  //res.json({success:true});
})


app.post('/addComplain', jsonParser, function(req,res){
  console.log("ADDING COMPLAIN 1");
  console.log(JSON.stringify(req.body));
  let details = req.body.details;
  console.log(details)
  complain.addComplain(res,details);

})

app.post('/addSpecies', jsonParser, function(req,res){
  console.log("ADDING SPECIES 1");
  console.log(JSON.stringify(req.body));
  let details = req.body.details;
  console.log(details)
  species.addSpecies(res,details);

})




app.post('/updateComplain', jsonParser, function(req,res){
  console.log("UPDATING COMPLAIN 1");
  let details = req.body.details;
  complain.updateComplain(res,details);

})

app.post('/updateSpecie', jsonParser, function(req,res){
  console.log("UPDATING SPECIE 1");
  let details = req.body.details;
  species.updateSpecies(res,details);

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


app.post('/addAsFavoriteComp', jsonParser, function(req,res){
  console.log("ADDING FAVORITE");
  console.log(JSON.stringify(req.body));
  let details = req.body.fav;
  console.log(details)
  complain.addAsFavorite(res,details);

})

app.post('/addAsFavoriteSpec', jsonParser, function(req,res){
  console.log("ADDING FAVORITE SPEC");
  console.log(JSON.stringify(req.body));
  let details = req.body.fav;
  console.log(details)
  species.addAsFavorite(res,details);

})


app.post('/addSpeciesComment', jsonParser, function(req,res){
  console.log("ADDING SPECIES COMMENT");
  console.log(JSON.stringify(req.body));
  let details = req.body.details;
  console.log(details)
  species.addComment(res,details);

})

app.get('/loadProfUsers', function(req,res){
  console.log("LOADING USER PROFILES")
  user.loadProfUsers(res);
})




/*app.post('/addAdv', jsonParser, function(req,res){
  let adv = req.body.data;
  console.log("BNBN00");console.log(adv)
  advModel.addAdv(res,adv);
})*/

app.post('/addAdv', function(req, res) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
    fstream = fs.createWriteStream(__dirname + '/files/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      res.redirect('back');
    });
  });
});



app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

app.post('/removeComplain', jsonParser ,function(req,res){
  console.log("LOADING ONE COMPLAIN");
  console.log(">>>>")
  console.log(req)
  console.log(req.body)
  let comp_id = req.body.comp_id;
  console.log(comp_id)
  complain.removeComplain(res,comp_id);
})

app.post('/updateAuthority', jsonParser, function(req,res){
  let complainId = req.body.complainId;
  let authId = req.body.authId;

  complain.updateAuthority(res,complainId,authId);
})

app.post('/updateSpecieAuthority', jsonParser, function(req,res){
  let specieId = req.body.specieId;
  let authId = req.body.authId;

  species.updateAuthority(res,specieId,authId);
})


app.post('/resolved', jsonParser, function(req,res){
  let complainId = req.body.complainId
  complain.resolved(res,complainId);
})


/*var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');


app.post('/addVideo', function(req,res){
  console.log("ADDING VIDEO");

  upload(req,res,function(err){
    if(err){
      console.log("ERROR: "+err);
      res.json({error_code:1,err_desc:err});
      return;
    }

    console.log("SUCCESS: ");
    res.json({error_code:0,err_desc:null});
  })
})*/


app.post('/addVideo', function(req, res) {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ADDING VIDEO")
  var fstream;
  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
    fstream = fs.createWriteStream(__dirname + '/files/' + filename);
    file.pipe(fstream);
    fstream.on('close', function () {
      //res.redirect('back');
      res.json({success:true});
    });
  });
});


app.get('/getvvv', function (req, res, next) {
   // var path = config.rootContentFilesPath + '/movie.mp4';
   let id = req.param("id");
   let type = req.param("type");

   let vidName = '';

   if(type){
    vidName = 'vidSpec_'+id+'.mp4';
   }else{
    vidName = 'vid_'+id+'.mp4';
   }



    var stat = fs.statSync(__dirname + '/files/' + vidName);
    var total = stat.size;
    if (req.headers['range']) {
        var range = req.headers.range;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        var end = partialend ? parseInt(partialend, 10) : total - 1;
        var chunksize = (end - start) + 1;
        console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

        var file = fs.createReadStream(__dirname + '/files/' + vidName, { start: start, end: end });
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        });
        file.pipe(res);
    } else {
        console.log('ALL: ' + total);
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
        fs.createReadStream(__dirname + '/files/' + vidName).pipe(res);
    }
});


app.post('/loadFavoriteComplains',jsonParser, function(req,res){
  console.log("LOADING FAVORITE COMPLAINS");
  let user_id = req.body.user_id;

  complain.loadFavoriteComplains(res, user_id);
});

app.post('/getFavoriteComplainsCount',jsonParser, function(req,res){
  console.log("LOADING FAVORITE COMPLAINS COUNT");
  let user_id = req.body.user_id;

  complain.getFavoriteCount(res, user_id);
});


app.post('/loadFavoriteSpecies',jsonParser, function(req,res){
  console.log("LOADING FAVORITE Species");
  let user_id = req.body.user_id;

  species.loadFavoriteSpecies(res, user_id);
});

app.post('/loadNumberOfPosts',jsonParser, function(req,res){
  console.log("LOADING NUMBER OF POSTS");
  complain.loadNumberOfPosts(res);
});

app.post('/loadNumberOfUsers',jsonParser, function(req,res){
  console.log("LOADING NUMBER OF USERS");
  complain.loadNumberOfUsers(res);
});

app.post('/loadNumberOfFollwings',jsonParser, function(req,res){
  console.log("LOADING NUMBER OF FOLLOWINGS");
  let user_id = req.body.user_id;
  complain.loadNumberOfFollwings(res, user_id);
});

app.post('/loadNumberOfOwnPosts',jsonParser, function(req,res){
  console.log("LOADING NUMBER OF OWN POSTS");
  let user_id = req.body.user_id;
  complain.loadNumberOfOwnPosts(res, user_id);
});

app.post('/editProfile', jsonParser, function(req,res){
  console.log("EDITING PROFILE");
  let details = req.body.credentials;
  user.editProfile(res,details);

})

app.post('/editProfileWOPW', jsonParser, function(req,res){
  console.log("EDITING PROFILE WO PW");
  let details = req.body.credentials;
  user.editProfileWOPW(res,details);

})

app.post('/updateMobile', jsonParser, function(req,res){
  console.log("UPDATING MOBILE");
  let details = req.body.credentials;
  user.updateMobile(res,details);

})
