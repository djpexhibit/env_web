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

    this.addComplain = function(res, complain){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {throw err;}
                con.query('insert into complains(type,res_person,details) values (?,?,?)', [complain.type,complain.person,complain.details], function(err, result){
                    if (err) {
                        con.rollback(function() { throw err; });
                    }
 
                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { throw err; }); 
                        }
                        res.send({ status: 0, message: 'Complain added successfully' });
                        console.log('success!'); 
                    }); 
                }); 
            })

        });
    }

}


module.exports = new Complain();

