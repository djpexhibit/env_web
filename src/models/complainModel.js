var connection = require('../DB/connection');


function Complain() {
    this.get = function (res) {
    };

    this.loadComplains = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from complains',function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.loadPollutionTypes = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from pollution_type',function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.loadComplain = function (res, comp_id) {
        connection.acquire(function (err, con) {
            con.query('select * from complains where id = ?', comp_id ,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.addComplian = function(res, complain){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {throw err;}
                con.query('insert into complain() values ()', [checkout.user], function(err, result){
                    if (err) {
                        con.rollback(function() { throw err; });
                    }
 
                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { throw err; }); 
                        }
                        res.send({ status: 0, message: 'Order created successfully' });
                        console.log('success!'); 
                    }); 
                }); 
            })

        });
    }

}


module.exports = new Complain();

