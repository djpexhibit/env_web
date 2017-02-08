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
            con.query('select * from complains c join complain_images i where id = ? and c.id = i.complain_id', comp_id ,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.addComplain = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {throw err;}
                con.query('insert into complains(type,res_person,details) values (?,?,?)', [details.complain.type,details.complain.person,details.complain.details], function(err, result){
                    if (err) {
                        con.rollback(function() { throw err; });
                    }


                    con.query('insert into complain_images(complain_id, image) values(?,?)',[1,details.images] , function(err, result){
                        if(err) {throw err;}

                        con.commit(function(err) { 
                            if (err) { 
                                con.rollback(function() { throw err; }); 
                            }
                            res.send({ status: 0, message: 'Complain added successfully' });
                            console.log('success!'); 
                        }); 

                    });
 
                    
                }); 
            })

        });
    }

}


module.exports = new Complain();

