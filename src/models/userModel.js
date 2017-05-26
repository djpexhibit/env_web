var connection = require('../DB/connection');
var utils = require('../utils/commons.js');


function User() {
    this.get = function (res) {
    };

    this.getUserByUsername = function (res, credentials) {
        connection.acquire(function (err, con) {
            if(err){
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query('select * from user_details where email = ?', credentials.email, function (err, result) {
                con.release();

                if(err){
                    res.json({status:"ERROR",error:"400"});return;
                }

                let session = {
                    status:"",
                    error:"",
                    id:"",
                    username:"",
                    email:"",
                    name:""
                }
                if(!result && !result[0]){
                    session.status="ERROR",
                    session.error="400";
                }else{
                    let user=result[0];
                    if(user && credentials.password===user.password){
                        session.status="OK",
                        session.error=null,
                        session.id=user.id,
                        session.username=user.username,
                        session.name=user.name,
                        session.email=user.email
                    }else{
                        session.status="ERROR",
                        session.error="400"
                    }

                }


                res.json(session);
            });
        });
    };


    this.register = function(res, details){
        connection.acquire( function(err,con){
            if(err){
                res.send({ status: false, message: 'Error' }); return;
            }
            con.beginTransaction(function(err){
                if(err){
                    res.send({ status: false, message: 'Error' }); return;
                }

                var rand = utils.getRandomInt(1001,9999);
                // send that random number via sms gateway

                con.query('insert into user_details(name,username,password,email,mobile,verify_code,verified) values (?,?,?,?,?,?,?)', [details.name,details.username,details.password, details.email, details.mobile, rand, false], function(err, result){
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }

                    con.commit(function(err) {
                        if (err) {
                            con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                        }
                        res.send({ status: true, message: 'User added successfully' });
                        console.log('success!');
                    });

                });
            })

        });
    }


    this.checkEmailValidity = function (res, credentials) {
        connection.acquire(function (err, con) {
            if(err){
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query('select * from user_details where email = ?', credentials.email, function (err, result) {
                con.release();

                if(err){
                    res.json({status:"ERROR",error:"400"});return;
                }


                if(!result && !result[0]){
                    res.json({status:"OK",msg:"EMAIL_NOT_EXIST"});return;
                }else{
                    let user=result[0];
                    if(user && credentials.email===user.email){
                        res.json({status:"OK",error:null,msg:"EMAIL_EXIST"});return;
                    }else{
                       res.json({status:"OK",msg:"EMAIL_NOT_EXIST"});return;
                    }

                }
            });
        });
    };

    this.verifyMobileCode = function (res, verifyCredentials) {

      connection.acquire( function(err,con){
        con.beginTransaction(function(err){

          if(err) { res.json({status:"ERROR",error:"400"});return; }

          con.query('select verify_code from user_details where mobile = ?', verifyCredentials.mobile, function(err, result){
            if (err) { res.json({status:"ERROR",error:"400"});return; }
console.log(result);
            let code=result[0].verify_code;
            console.log(code);
            console.log(verifyCredentials.mobileCode);
            if(code && verifyCredentials.mobileCode===code){
              con.query('update user_details set verified=true where mobile = ?', verifyCredentials.mobile , function(err, result){
                if (err) {
                  con.rollback(function() { res.json({status:"ERROR",error:"400"});return; });
                }

                con.commit(function(err) {
                  if (err) {
                    con.rollback(function() { res.json({status:"ERROR",error:"400"});return; });
                  }
                  res.json({status:"OK",error:null,msg:"VERIFIED"});return;
                });
              });

            }else{
              res.json({status:"OK",msg:"FAILED"});return;
            }
          });
        })
      });
    };




    this.getAdminUserByUsername = function (res, credentials) {
        connection.acquire(function (err, con) {
            if(err){

                res.json({status:"ERROR",error:"400"});return;
            }
            con.query(`select * from user_details where email = ? and type = 'ADMIN_FULL' OR type = 'ADMIN_LMT' `, credentials.email, function (err, result) {
                con.release();
                if(err){
                    res.json({status:"ERROR",error:"400"});return;
                }

                let jwt = false;

                let session = {
                    status:"",
                    error:"",
                    id:"",
                    username:"",
                    email:"",
                    name:"",
                    type:""
                }
                if(!result && !result[0]){
                    session.status="ERROR",
                    session.error="400";
                    jwt=false;
                }else{
                    let user=result[0];
                    if(user && credentials.password===user.password){
                        session.status="OK";
                        session.error=null;
                        session.id=user.id;
                        session.username=user.username;
                        session.name=user.name;
                        session.email=user.email;
                        session.type=user.type;
                        jwt=true
                    }else{
                        session.status="ERROR";
                        session.error="400";
                        jwt = false
                    }

                }


                res.json({session:session, jwt:jwt});
            });
        });
    };


/*    this.getAdminUserByUsername = function (done, credentials) {
        connection.acquire(function (err, con) {
            if(err){
                return done(err);
            }
            con.query(`select * from user_details where email = ? and type = 'ADMIN_FULL' OR type = 'ADMIN_LMT' `, credentials.email, function (err, result) {
                con.release();
                if(err){
                    return done(err);
                }

                let token = false;

                let session = {
                    status:"",
                    error:"",
                    id:"",
                    username:"",
                    email:"",
                    name:"",
                    type:""
                }
                if(!result && !result[0]){
                    session.status="ERROR",
                    session.error="400";
                    token=false;
                }else{
                    let user=result[0];
                    if(user && credentials.password===user.password){
                        session.status="OK";
                        session.error=null;
                        session.id=user.id;
                        session.username=user.username;
                        session.name=user.name;
                        session.email=user.email;
                        session.type=user.type;

                        const payload = {
                            sub: user.id
                        };
                        jwt = token.sign(payload, "secretkey");

                    }else{
                        session.status="ERROR";
                        session.error="400";
                        token = false
                    }

                }


                return done(null, token, session);
            });
        });
    };*/


    this.getAdminUserById = function (id) {
        connection.acquire(function (err, con) {
            if(err){
                return done(err);
            }
            con.query(`select * from user_details where email = ? and type = 'ADMIN_FULL' OR type = 'ADMIN_LMT' `, credentials.email, function (err, result) {
                con.release();
                if(err){
                    return done(err);
                }

                let token = false;

                let session = {
                    status:"",
                    error:"",
                    id:"",
                    username:"",
                    email:"",
                    name:"",
                    type:""
                }
                if(!result && !result[0]){
                    session.status="ERROR",
                    session.error="400";
                    token=false;
                }else{
                    let user=result[0];
                    if(user && credentials.password===user.password){
                        session.status="OK";
                        session.error=null;
                        session.id=user.id;
                        session.username=user.username;
                        session.name=user.name;
                        session.email=user.email;
                        session.type=user.type;

                        const payload = {
                            sub: user.id
                        };
                        jwt = token.sign(payload, "secretkey");

                    }else{
                        session.status="ERROR";
                        session.error="400";
                        token = false
                    }

                }


                return done(null, token, session);
            });
        });
    };




}


module.exports = new User();
