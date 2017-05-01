var connection = require('../DB/connection');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import Async from 'async';


function Species() {

    this.get = function (res) {
    };


    this.loadSpecies = function (res, user_id) {

        connection.acquire(function (err, con) {

            if(user_id !== 0){
                console.log("YYYYYYYYYYYYYYYYY")
                con.query(`select s.id as id, s.type as type ,s.name as name,SUBSTRING(s.details,1,50) as details, `+
                `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where s.user_id = u.id order by u.id = ? desc, s.date desc`, user_id, function (err, result) {
                con.release();
                console.log("yyyyyyyyyyyyyy")
                console.log(result);
                res.json(result);
                });
            }else{
                con.query(`select s.id as id, s.type as type ,s.name as name,SUBSTRING(s.details,1,50) as details, `+
                `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }
            
        });
    };


    this.loadSpecie = function (res, spec_id) {
        connection.acquire(function (err, con) {
            con.query(`select s.id as id, s.type as type, s.name as name, s.details as details, i.image as image,`
            +` s.lat as lat, s.lng as lng, DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user, u.id as uid, s.location as location from species s left outer join species_images i on  s.id = i.species_id join user_details u where s.id = ? `
            + ` and s.user_id = u.id `, spec_id ,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };


    this.loadSpeciesComments = function (res, spec_id) {
        connection.acquire(function (err, con) {
            con.query(`select c.type as type, u.name as user, c.details as details, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date from species_comments c join user_details u where c.species_id = ? and c.user_id = u.id order by c.date `, spec_id ,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.addSpecies = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {res.send({ status: false, message: 'Error' }); return;}
                con.query('insert into species(type,name,details,location,user_id,lat,lng,date) values (?,?,?,?,?,?,?,now())', [details.specie.type,details.specie.name,details.specie.details, details.specie.location, details.specie.user ,details.specie.lat, details.specie.lng], function(err, result){
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }

                    let lstId = 0;

                    con.query('SELECT LAST_INSERT_ID() AS NID',function(err,result){
                        lstId = result[0].NID;
                        let arr = [true,false,false];
                        for(let index in details.images){
                            con.query('insert into species_images(species_id, image, selected) values(?,?, ?)',[lstId,details.images[index], arr[index]] , function(err, result){
                            if(err) {res.send({ status: false, message: 'Error' }); return;}
                            });
                        }

                        con.commit(function(err) { 
                            if (err) { 
                                con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
                            }
                            res.send({ status: true, message: 'Species added successfully', id: lstId });
                            sendSpeciesConfirmMail(details);
                            console.log('success!'); 
                        }); 
                    })
                
 
                    
                }); 
            })

        });
    }



    this.updateSpecies = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                console.log("BRGIN");console.log(details.specie)
                if(err) {
                    console.log("1111")
                    res.send({ status: false, message: 'Error' }); return;
                }
                con.query('update species set type=?, name=?, details=?, location=? , lat=?, lng=? where id = ? ', [details.specie.type,details.specie.name,details.specie.details, details.specie.location ,details.specie.lat, details.specie.lng, details.specie.id], function(err, result){
                    if (err) {
                        console.log(err)
                        con.rollback(function() { 
                            console.log("2222")
                            res.send({ status: false, message: 'Error' }); return; 
                        });
                    }
                    console.log("REACH1")

                    con.query('delete from species_images where species_id= ?', details.specie.id ,function(err,result){
                        if (err) {
                            con.rollback(function() { 
                                console.log("3333")
                                res.send({ status: false, message: 'Error' }); return; 
                            });
                        }
                        console.log("REACH2")
                        let arr = [true,false,false];

                        Async.eachOfSeries(details.images, function itOvEl(element,index,callback){
                            con.query('insert into species_images(species_id, image, selected) values(?,?, ?)',[details.specie.id,element, arr[index]] , function(err, result){
                                if(err) {
                                    console.log("VVVVVVVVVVVV")
                                    //res.send({ status: false, message: 'Error' }); return;
                                    callback("err");
                                }
                                console.log("REACH3")
                                callback();
                            });
                        }, function fin(err){
                            console.log("REACH4");
                            if(err){
                                console.log("4444")
                                res.send({ status: false, message: 'Error' }); return;
                            }
                            con.commit(function(err) {
                                if (err) { 
                                    con.rollback(function() { res.send({ status: false, message: 'Error' }); return; }); 
                                }
                                console.log("REACH5")
                                res.send({ status: true, message: 'Species added successfully', id: details.specie.id});
                          
                            }); 
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
                con.query('insert into species_comments(type,user_id,details,species_id,date) values (?,?,?,?,now())', [details.type,details.user_id,details.details, details.species_id], function(err, result){
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



    this.removeSpecies = function(res, comp_id){
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




function sendSpeciesConfirmMail(details){

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
        subject: 'Save Enviorenment - Species Details !!!',
        html: confirmSpeciesTemplate(details)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });    
}

function confirmSpeciesTemplate(details) {
    const template = `<h1 style="color:#18c9d2;font-size: 2.7em;font-weight: 400">Eniorenment <span style="color: #333">Protection</span> </h1>
                    <h2> User: ${ details.specie.user }, </h2>,
                    <h4>Type : ${details.specie.type} </h4>
                    <h4>Name : ${details.specie.name} </h4>
                    <h4>Location : ${details.specie.location} </h4>
                    <h4>Details : ${details.specie.details} </h4>`;
    return template.replace(/\n/, '<br>');
}




module.exports = new Species();

