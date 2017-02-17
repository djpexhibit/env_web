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
                    console.log("222222222")
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
                    console.log("333333333")
                    session.status="ERROR",
                    session.error="400";
                }else{
                    console.log("444444444")
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
            con.beginTransaction(function(err){
                if(err) {throw err;}
                con.query('insert into user_details(name,username,password,email) values (?,?,?,?)', [details.name,details.username,details.password, details.email], function(err, result){
                    if (err) {
                        con.rollback(function() { throw err; });
                    }

                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { throw err; }); 
                        }
                        res.send({ status: true, message: 'User added successfully' });
                        console.log('success!'); 
                    }); 
                    
                }); 
            })

        });
    }

    

    
}


module.exports = new User();

