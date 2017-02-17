var connection = require('../DB/connection');


function User() {
    this.get = function (res) {
    };

    this.getUserByUsername = function (res, credentials) {
        connection.acquire(function (err, con) {
            con.query('select * from user_details where email = ?', credentials.email, function (err, result) {
                con.release();
                let session = {
                    status:"",
                    error:"",
                    id:"",
                    username:"",
                    email:"",
                    name:""
                }

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
                res.json(session);
            });
        });
    };

    

    
}


module.exports = new User();

