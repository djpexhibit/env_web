var connection = require('../DB/connection');


function Adv() {
    this.get = function (res) {
    };

    this.addAdv = function(res, adv){
        console.log("EEEEEEEEEE ")
        connection.acquire( function(err,con){
            console.log("EEEEEEEEEE 2")
            con.beginTransaction(function(err){
                console.log("EEEEEEEEEE 3")
                if(err) { res.send({ status: false, message: 'Error' }); return;}
                con.query('insert into advs(file) values (?)', adv, function(err, result){
                    console.log("EEEEEEEEEE 4")
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }

                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
                        }
                        res.send({ status: true, message: 'Adv added successfully' });
                        console.log('success!'); 
                    }); 
                    
                }); 
            })

        });
    }


}

module.exports = new Adv();

