var connection = require('../DB/connection');


function Complain() {
    this.get = function (res) {
    };

    this.loadComplains = function (res) {
        connection.acquire(function (err, con) {
            con.query('select id, type,res_person,SUBSTRING(details,1,50) as details from complains',function (err, result) {
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

    this.loadExpectedActions = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from expected_action',function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };



    this.loadComplain = function (res, comp_id) {
        connection.acquire(function (err, con) {
            con.query('select c.type as type, c.res_person as res_person, c.details as details, i.image as image, c.lat as lat, c.lng as lng from complains c join complain_images i where c.id = ? and c.id = i.complain_id', comp_id ,function (err, result) {
                con.release();
                console.log(JSON.stringify(result))
                res.json(result);
            });
        });
    };


    this.loadComments = function (res, comp_id) {
        connection.acquire(function (err, con) {
            con.query('select * from comments where complain_id = ?', comp_id ,function (err, result) {
                con.release();
                console.log(JSON.stringify(result))
                res.json(result);
            });
        });
    };

    this.addComplain = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {throw err;}
                con.query('insert into complains(type,res_person,details,location,lat,lng) values (?,?,?,?,?,?)', [details.complain.type,details.complain.person,details.complain.details, details.complain.location, details.complain.lat, details.complain.lng], function(err, result){
                    if (err) {
                        con.rollback(function() { throw err; });
                    }

                    let lstId = 0;

                    con.query('SELECT LAST_INSERT_ID() AS NID',function(err,result){
                        lstId = result[0].NID;

                        for(let index in details.images){
                            con.query('insert into complain_images(complain_id, image) values(?,?)',[lstId,details.images[index]] , function(err, result){
                            if(err) {throw err;}
                            });
                        }

                        con.commit(function(err) { 
                            if (err) { 
                                con.rollback(function() { throw err; }); 
                            }
                            res.send({ status: true, message: 'Complain added successfully' });
                            console.log('success!'); 
                        }); 
                    })
                
 
                    
                }); 
            })

        });
    }



    this.addComment = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {throw err;}
                con.query('insert into comments(type,user_id,details,complain_id) values (?,?,?,?)', [details.comment.type,details.comment.user_id,details.complain.details, details.complain.complain_id], function(err, result){
                    if (err) {
                        con.rollback(function() { throw err; });
                    }

                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { throw err; }); 
                        }
                        res.send({ status: true, message: 'Comment added successfully' });
                        console.log('success!'); 
                    }); 
                    
                }); 
            })

        });
    }

}


module.exports = new Complain();

