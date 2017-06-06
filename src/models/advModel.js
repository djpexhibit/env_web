var connection = require('../DB/connection');


function Adv() {
    this.get = function (res) {
    };

    this.addAdv = function(res, adv){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {
                  con.release();
                  res.send({ status: false, message: 'Error' }); return;
                }
                con.query('insert into advs(file) values (?)', adv, function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' }); return;
                        });
                    }

                    con.commit(function(err) {
                        if (err) {
                            con.rollback(function() {
                              con.release();
                              res.send({ status: false, message: 'Error' }); return;
                            });
                        }
                        con.release();
                        res.send({ status: true, message: 'Adv added successfully' });
                        console.log('success!');
                    });

                });
            })

        });
    }


}

module.exports = new Adv();
