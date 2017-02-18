var connection = require('../DB/connection');


function Complain() {
    this.get = function (res) {
    };

    this.loadComplains = function (res) {
        connection.acquire(function (err, con) {
            con.query('select c.id as id, p.type as type ,c.res_person as res_person,SUBSTRING(c.details,1,50) as details from complains c join pollution_type p where p.id = c.type',function (err, result) {
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
            con.query(`select p.type as type, c.res_person as res_person, c.details as details, i.image as image,`
            +` c.lat as lat, c.lng as lng, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user from complains c left outer join complain_images i on and c.id = i.complain_id join pollution_type p join user_details u where c.id = ? `
            + ` and p.id = c.type and c.user_id = u.id `, comp_id ,function (err, result) {
                con.release();
                console.log(JSON.stringify(result))
                res.json(result);
            });
        });
    };


    this.loadComments = function (res, comp_id) {
        connection.acquire(function (err, con) {
            con.query(`select c.type as type, u.name as user, c.details as details, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date from comments c join user_details u where c.complain_id = ? and c.user_id = u.id `, comp_id ,function (err, result) {
                con.release();
                console.log(JSON.stringify(result))
                res.json(result);
            });
        });
    };

    this.addComplain = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {res.send({ status: false, message: 'Error' }); return;}
                con.query('insert into complains(type,res_person,details,location,user_id,lat,lng,date) values (?,?,?,?,?,?,?,now())', [details.complain.type,details.complain.person,details.complain.details, details.complain.location, details.complain.user ,details.complain.lat, details.complain.lng], function(err, result){
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }

                    let lstId = 0;

                    con.query('SELECT LAST_INSERT_ID() AS NID',function(err,result){
                        lstId = result[0].NID;

                        for(let index in details.images){
                            con.query('insert into complain_images(complain_id, image) values(?,?)',[lstId,details.images[index]] , function(err, result){
                            if(err) {res.send({ status: false, message: 'Error' }); return;}
                            });
                        }

                        con.commit(function(err) { 
                            if (err) { 
                                con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
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
                if(err) { res.send({ status: false, message: 'Error' }); return;}
                con.query('insert into comments(type,user_id,details,complain_id,date) values (?,?,?,?,now())', [details.type,details.user_id,details.details, details.complain_id], function(err, result){
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }

                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
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

