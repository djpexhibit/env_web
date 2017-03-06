var connection = require('../DB/connection');


function User() {
    this.get = function (res) {
    };

    this.getUserByUsername = function (res, credentials) {
        connection.acquire(function (err, con) {
            if(err){
                console.log("1111")
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
                con.query('insert into user_details(name,username,password,email) values (?,?,?,?)', [details.name,details.username,details.password, details.email], function(err, result){
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




    this.getAdminUserByUsername = function (res, credentials) {
        console.log(">>>>>>>>>>>>>>>>>> 111")
        connection.acquire(function (err, con) {
            if(err){
                
                res.json({status:"ERROR",error:"400"});return;
            }
            con.query(`select * from user_details where email = ? and type = 'ADMIN' `, credentials.email, function (err, result) {
                con.release();
                console.log("22222")
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
                    name:""
                }
                if(!result && !result[0]){
                    console.log("########3")
                    session.status="ERROR",
                    session.error="400";
                    jwt=false;
                }else{
                    console.log("444444444")
                    let user=result[0];
                    if(user && credentials.password===user.password){
                        console.log("6666666666")
                        session.status="OK";
                        session.error=null;
                        session.id=user.id;
                        session.username=user.username;
                        session.name=user.name;
                        session.email=user.email;
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

    

    
}


module.exports = new User();

