var connection = require('../DB/connection');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


function Complain() {
    this.get = function (res) {
    };

    this.loadComplains = function (res, user_id) {
        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,SUBSTRING(c.details,1,50) as details, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
                `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc`, user_id, function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,SUBSTRING(c.details,1,50) as details, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
                `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id `, function (err, result) {
                con.release();
                console.log("EEEE");console.log(result)
                res.json(result);
            });
            }
            
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
            +` c.lat as lat, c.lng as lng, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user, c.location as location from complains c left outer join complain_images i on  c.id = i.complain_id join pollution_type p join user_details u where c.id = ? `
            + ` and p.id = c.type and c.user_id = u.id `, comp_id ,function (err, result) {
                con.release();
                console.log(JSON.stringify(result))
                res.json(result);
            });
        });
    };


    this.loadComments = function (res, comp_id) {
        connection.acquire(function (err, con) {
            con.query(`select c.type as type, u.name as user, c.details as details, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date from comments c join user_details u where c.complain_id = ? and c.user_id = u.id order by c.date `, comp_id ,function (err, result) {
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
                        let arr = [true,false,false];
                        for(let index in details.images){
                            con.query('insert into complain_images(complain_id, image, selected) values(?,?, ?)',[lstId,details.images[index], arr[index]] , function(err, result){
                            if(err) {res.send({ status: false, message: 'Error' }); return;}
                            });
                        }

                        con.commit(function(err) { 
                            if (err) { 
                                con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
                            }
                            res.send({ status: true, message: 'Complain added successfully' });
                            sendConfirmMail(details);
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



    this.removeComplain = function(res, comp_id){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) { res.send({ status: false, message: 'Error' }); return;}
                con.query('delete from complains where id = ?', [comp_id], function(err, result){
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }

                    con.commit(function(err) { 
                        if (err) { 
                            con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
                        }
                        res.send({ status: true, message: 'Complain deleted successfully' });
                        console.log('success!'); 
                    }); 
                    
                }); 
            })

        });
    }

}




function sendConfirmMail(details){

    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'prasad.wanigasinghe.test@gmail.com',
            pass:'Pras777@dan'
        }
    });

    
    var mailOptions = {
        from: '<prasad.wanigasinghe.test@gmail.com>',
        to: 'prasad.wanigasinghe.test@gmail.com',
        subject: 'Save Enviorenment - Complain Details !!!',
        html: confirmTemplate(details)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });    
}

function confirmTemplate(details) {
    const template = `<h1 style="color:#18c9d2;font-size: 2.7em;font-weight: 400">Eniorenment <span style="color: #333">Protection</span> </h1>
                    <h2> User: ${ details.complain.user }, </h2>,
                    <h4>Type : ${details.complain.type} </h4>
                    <h4>Location : ${details.complain.location} </h4>
                    <h4>Details : ${details.complain.details} </h4>
                    <h4>Party : ${details.complain.person} </h4>`;
    return template.replace(/\n/, '<br>');
}

module.exports = new Complain();

