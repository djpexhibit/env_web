var connection = require('../DB/connection');
var utils = require('../utils/commons.js');
var request = require("request");


function User() {
    this.get = function (res) {
    };

    this.getUserByUsername = function (res, credentials) {
        connection.acquire(function (err, con) {
            if(err){
                con.release();
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query('select * from user_details where email = ? and verified = true', credentials.email, function (err, result) {
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
                        session.email=user.email,
                        session.image=user.image,
                        session.mobile=user.mobile,
                        session.expertType = user.expert_type,
                        session.mediaType = user.media_type,
                        session.isJoined = user.is_joined,
                        session.type = user.type
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
                con.release();
                res.send({ status: false, message: 'Error' });
                return;
            }
            con.beginTransaction(function(err){
                if(err){
                    con.release();
                    res.send({ status: false, message: 'Error' }); return;
                }

                var rand = utils.getRandomInt(1001,9999);
                // send that random number via sms gateway
                request({
                  uri: "http://119.235.1.63:4070/Sms.svc/SendSms?phoneNumber="+details.mobile+"&smsMessage=Verification Code:"+rand+"&companyId=EML&pword=EMLADMIN",
                  method: "GET",
                  timeout: 10000,
                  followRedirect: true,
                  maxRedirects: 10
                }, function(error, response, body) {
                  console.log(body);
                });

                con.query('insert into user_details(name,username,password,email,mobile,verify_code,verified,type,expert_type,media_type,is_joined) values (?,?,?,?,?,?,?,?,?,?,?)', [details.name, details.username, details.password, details.email, details.mobile, rand, false, details.type, details.expertType, details.mediaType, details.isJoined], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' });
                          return;
                        });
                    }

                    con.commit(function(err) {
                        if (err) {
                            con.rollback(function() {
                              con.release();
                              res.send({ status: false, message: 'Error' });
                              return;
                            });
                        }
                        con.release();
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
                con.release();
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query('select * from user_details where email = ? or mobile = ? ', [credentials.email,credentials.mobile], function (err, result) {
                con.release();
                console.log(JSON.stringify(result));
                if(err){
                    res.json({status:"ERROR",error:"400"});return;
                }

                if(!result && !result[0]){
                    console.log("^^^NO RESULTS^^^");
                    res.json({status:"OK",msg:"EMAIL_NOT_EXIST"});return;
                }else{
                    console.log("^^^EXITS^^^");
                    console.log(result[0]);
                    // let user=result[0];
                    // if(user && (credentials.email===user.email || credentials.mobile === user.mobile)){
                    //     res.json({status:"OK",error:null,msg:"EMAIL_EXIST"});return;
                    // }else{
                    //    res.json({status:"OK",msg:"EMAIL_NOT_EXIST"});return;
                    // }
                    res.json({status:"OK",error:null,msg:"EMAIL_EXIST"});return;
                }
            });
        });
    };

    // this.verifyEmailWithMobile = function (res, credentials) {
    //     connection.acquire(function (err, con) {
    //         if(err){
    //             con.release();
    //             res.json({status:"ERROR",error:"400"});return;
    //         }
    //         con.query('select * from user_details where mobile = ?', credentials.mobile, function (err, result) {
    //
    //
    //             if(err){
    //                 con.release();
    //                 res.json({status:"ERROR",error:"400"});return;
    //             }
    //
    //
    //             if(!result && !result[0]){
    //                 con.release();
    //                 res.json({status:"OK",msg:"FAILED"});return;
    //             }else{
    //                 let user=result[0];
    //                 if(user && credentials.email===user.email){
    //
    //                   var rand = utils.getRandomInt(100000,999999);
    //                   // send that random number via sms gateway
    //                   request({
    //                     uri: "http://119.235.1.63:4070/Sms.svc/SendSms?phoneNumber="+credentials.mobile+"&smsMessage=Verification Code:"+rand+"&companyId=EML&pword=EMLADMIN",
    //                     method: "GET",
    //                     timeout: 10000,
    //                     followRedirect: true,
    //                     maxRedirects: 10
    //                   }, function(error, response, body) {
    //                     if(error){
    //                       con.release();
    //                       res.json({status:"OK",msg:"FAILED"});return;
    //
    //                     }else{
    //                       con.query('update user_details set reset_req=true, reset_verify_code=? where email = ?', [rand,credentials.email], function(err, result){
    //                           if (err) {
    //                             con.release();
    //                             res.json({status:"OK",msg:"FAILED"});return;
    //                           }
    //
    //                           con.release();
    //                           res.json({status:"OK",error:null,msg:"VERIFIED"});return;
    //                         });
    //                     }
    //
    //
    //                   });
    //
    //
    //
    //
    //                 }else{
    //                     con.release();
    //                    res.json({status:"OK",msg:"FAILED"});return;
    //                 }
    //
    //             }
    //
    //
    //         });
    //     });
    // };


    this.verifyEmailWithMobile = function (res, credentials) {
      console.log(credentials);
        connection.acquire(function (err, con) {
            if(err){
                con.release();
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query('select * from user_details where mobile = ? or email = ?', [credentials.mobile,credentials.email], function (err, result) {


                if(err){
                    con.release();
                    res.json({status:"ERROR",error:"400"});return;
                }


                if(!result && !result[0]){
                    con.release();
                    res.json({status:"OK",msg:"FAILED"});return;
                }else{
                    let user=result[0];

                      var rand = utils.getRandomInt(100000,999999);
                      // send that random number via sms gateway
                      request({
                        uri: "http://119.235.1.63:4070/Sms.svc/SendSms?phoneNumber="+user.mobile+"&smsMessage=Verification Code:"+rand+"&companyId=EML&pword=EMLADMIN",
                        method: "GET",
                        timeout: 10000,
                        followRedirect: true,
                        maxRedirects: 10
                      }, function(error, response, body) {
                        if(error){
                          con.release();
                          res.json({status:"OK",msg:"FAILED"});return;

                        }else{
                          con.query('update user_details set reset_req=true, reset_verify_code=? where email = ?', [rand,user.email], function(err, result){
                              if (err) {
                                con.release();
                                res.json({status:"OK",msg:"FAILED"});return;
                              }

                              con.release();
                              res.json({status:"OK",error:null,msg:"VERIFIED"});return;
                            });
                        }


                      });



                }


            });
        });
    };

    this.verifyMobileCode = function (res, verifyCredentials) {

      connection.acquire( function(err,con){
        con.beginTransaction(function(err){

          if(err) {
            con.release();
            res.json({status:"ERROR",error:"400"});return;
          }

          con.query('select verify_code from user_details where mobile = ?', verifyCredentials.mobile, function(err, result){
            if (err) {
              con.release();
              res.json({status:"ERROR",error:"400"});return;
            }

            let code=result[0].verify_code;

            if(code && verifyCredentials.mobileCode===code){
              con.query('update user_details set verified=true where mobile = ?', verifyCredentials.mobile , function(err, result){
                if (err) {
                  con.rollback(function() {
                    con.release();
                    res.json({status:"ERROR",error:"400"});
                    return;
                  });
                }

                con.commit(function(err) {
                  if (err) {
                    con.rollback(function() {
                      con.release();
                      res.json({status:"ERROR",error:"400"});return;
                    });
                  }
                  con.release();
                  res.json({status:"OK",error:null,msg:"VERIFIED"});return;
                });
              });

            }else{
              con.release();
              res.json({status:"OK",msg:"FAILED"});return;
            }
          });
        })
      });
    };


    this.verifyResetMobileCode = function (res, verifyCredentials) {

      connection.acquire( function(err,con){
        con.beginTransaction(function(err){

          if(err) {
            con.release();
            res.json({status:"ERROR",error:"400"});return;
          }

          con.query('select mobile,reset_verify_code from user_details where mobile = ? or email=?', [verifyCredentials.mobile, verifyCredentials.email], function(err, result){
            if (err) {
              con.release();
              res.json({status:"ERROR",error:"400"});return;
            }

            let code=result[0].reset_verify_code;

            if(code && verifyCredentials.mobileCode===code){
              con.query('update user_details set reset_verified=true, reset_req=false, password=?  where mobile = ?', [verifyCredentials.password ,result[0].mobile] , function(err, result){
                if (err) {
                  con.rollback(function() {
                    con.release();
                    res.json({status:"ERROR",error:"400"});return;
                  });
                }

                con.commit(function(err) {
                  if (err) {
                    con.rollback(function() {
                      con.release();
                      res.json({status:"ERROR",error:"400"});return;
                    });
                  }
                  con.release();
                  res.json({status:"OK",error:null,msg:"VERIFIED"});return;
                });
              });

            }else{
              con.release();
              res.json({status:"OK",msg:"FAILED"});return;
            }
          });
        })
      });
    };



    this.getAdminUserByUsername = function (res, credentials) {
        connection.acquire(function (err, con) {
            if(err){
              con.release();
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


    this.editProfile = function(res, details){
        connection.acquire( function(err,con){
            if(err){
                con.release();
                res.send({ status: false, message: 'Error' });
                return;
            }
            con.beginTransaction(function(err){
                if(err){
                    con.release();
                    res.send({ status: false, message: 'Error' }); return;
                }

                con.query('update user_details set name=?, email=?, image=?, password=?, username=?, type=? , expert_type=?, media_type=?, is_joined=? where id=?', [details.name, details.email, details.image, details.password,details.username, details.mobile, details.type, details.expertType, details.mediaType, details.isJoined, details.id], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' });
                          return;
                        });
                    }

                    con.commit(function(err) {
                        if (err) {
                            con.rollback(function() {
                              con.release();
                              res.send({ status: false, message: 'Error' });
                              return;
                            });
                        }
                        con.release();
                        res.send({ status: true, message: 'User updated successfully' });
                        console.log('success!');
                    });

                });
            })

        });
    }

    this.editProfileWOPW = function(res, details){
        connection.acquire( function(err,con){
            if(err){
                con.release();
                res.send({ status: false, message: 'Error' });
                return;
            }
            con.beginTransaction(function(err){
                if(err){
                    con.release();
                    res.send({ status: false, message: 'Error' }); return;
                }
                console.log(details);
                con.query('update user_details set name=?, email=?, image=?, username=?, type=? , expert_type=?, media_type=?, is_joined=? where id=?', [details.name, details.email, details.image, details.username, details.type, details.expertType, details.mediaType, details.isJoined, details.id], function(err, result){
                    if (err) {
                      console.log("1");
                      console.log(err);
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' });
                          return;
                        });
                    }

                    con.commit(function(err) {
                        if (err) {
                          console.log("2");
                          console.log(err);
                            con.rollback(function() {
                              con.release();
                              res.send({ status: false, message: 'Error' });
                              return;
                            });
                        }else{
                          con.release();
                          res.send({ status: true, message: 'User updated successfully' });
                          console.log('success!');
                        }

                    });

                });
            })

        });
    }


    this.updateMobile = function(res, details){
        connection.acquire( function(err,con){
            if(err){
                con.release();
                res.send({ status: false, message: 'Error' });
                return;
            }
            con.beginTransaction(function(err){
                if(err){
                    con.release();
                    res.send({ status: false, message: 'Error' }); return;
                }

                var rand = utils.getRandomInt(1001,9999);
                // send that random number via sms gateway
                request({
                  uri: "http://119.235.1.63:4070/Sms.svc/SendSms?phoneNumber="+details.mobile+"&smsMessage=Verification Code:"+rand+"&companyId=EML&pword=EMLADMIN",
                  method: "GET",
                  timeout: 10000,
                  followRedirect: true,
                  maxRedirects: 10
                }, function(error, response, body) {
                  console.log(body);
                });

                con.query('update user_details set mobile=?, verify_code = ? ,verified = ? where id = ? ', [details.mobile, rand, false, details.id], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' });
                          return;
                        });
                    }

                    con.commit(function(err) {
                        if (err) {
                            con.rollback(function() {
                              con.release();
                              res.send({ status: false, message: 'Error' });
                              return;
                            });
                        }
                        con.release();
                        res.send({ status: true, message: 'mobile updated successfully' });
                        console.log('success!');
                    });

                });
            })

        });
    }

    this.checkMobileValidity = function (res, id, mobile) {
        connection.acquire(function (err, con) {
            if(err){
                con.release();
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query('select * from user_details where mobile = ? and id != ? ', [mobile,id], function (err, result) {
                con.release();

                if(err){
                    res.json({status:"ERROR",error:"400"});return;
                }


                if(!result && !result[0]){
                    res.json({status:"OK",msg:"EMAIL_NOT_EXIST"});return;
                }else{
                    // let user=result[0];
                    // if(user && (credentials.email===user.email || credentials.mobile === user.mobile)){
                    //     res.json({status:"OK",error:null,msg:"EMAIL_EXIST"});return;
                    // }else{
                    //    res.json({status:"OK",msg:"EMAIL_NOT_EXIST"});return;
                    // }
                    res.json({status:"OK",error:null,msg:"EMAIL_EXIST"});return;
                }
            });
        });
    };





}


module.exports = new User();
