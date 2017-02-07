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
                    error:""
                }

                let user=result[0];
                if(credentials.password===user.password){
                    session.status="OK",
                    session.error=null
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

