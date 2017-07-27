var connection = require('../DB/connection');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import Async from 'async';
var fs  = require("fs");
var thumb = require('node-thumbnail').thumb;

function Species() {

    this.get = function (res) {
    };


    this.loadSpecies = function (res, user_id) {

        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select s.id as id, s.type as type ,s.location as location, s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments, f.is_favorite as fav, `+
                ` s.expert_replied as expertReplied, s.user_replied as userReplied ` +
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1 left outer join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.user_id = u.id order by u.id = ? desc, s.date desc limit 30 `, [user_id,user_id], function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select s.id as id, s.type as type ,s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };

    // this.loadSpeciesChunk = function (res, user_id,start,end) {
    //
    //     connection.acquire(function (err, con) {
    //
    //         if(user_id !== 0){
    //             con.query(`select s.id as id, s.type as type ,s.location as location, s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
    //             `DATE_FORMAT(s.date,'%b %d %Y') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments, f.is_favorite as fav, `+
    //             ` s.expert_replied as expertReplied, s.user_replied as userReplied ` +
    //             `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1 left outer join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.user_id = u.id order by u.id = ? desc, s.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
    //             con.release();
    //             res.json(result);
    //             });
    //         }else{
    //             con.query(`select s.id as id, s.type as type ,s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
    //             `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
    //             `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id limit 30 `, function (err, result) {
    //             con.release();
    //             //console.log("EEEE");console.log(result)
    //             res.json(result);
    //         });
    //         }
    //
    //     });
    // };

    this.loadSpeciesChunk = function (res, user_id,start,end) {

        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select s.id as id, s.type as type ,s.location as location, s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y') as date, u.name as user , IF(i.image IS NULL, FALSE, TRUE) as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments, f.is_favorite as fav, `+
                ` s.expert_replied as expertReplied, s.user_replied as userReplied ` +
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1 left outer join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.user_id = u.id order by u.id = ? desc, s.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select s.id as id, s.type as type ,s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };


    // this.loadFavoriteSpeciesChunk = function (res, user_id,start,end) {
    //
    //     connection.acquire(function (err, con) {
    //
    //         if(user_id !== 0){
    //             con.query(`select s.id as id, s.type as type ,s.location as location, s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
    //             `DATE_FORMAT(s.date,'%b %d %Y') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments, f.is_favorite as fav, `+
    //             ` s.expert_replied as expertReplied, s.user_replied as userReplied ` +
    //             `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1 join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.user_id = u.id order by u.id = ? desc, s.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
    //             con.release();
    //             res.json(result);
    //             });
    //         }else{
    //             con.query(`select s.id as id, s.type as type ,s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
    //             `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
    //             `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id limit 30 `, function (err, result) {
    //             con.release();
    //             //console.log("EEEE");console.log(result)
    //             res.json(result);
    //         });
    //         }
    //
    //     });
    // };

    this.loadFavoriteSpeciesChunk = function (res, user_id,start,end) {

        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select s.id as id, s.type as type ,s.location as location, s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y') as date, u.name as user , IF(i.image IS NULL, FALSE, TRUE) as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments, f.is_favorite as fav, `+
                ` s.expert_replied as expertReplied, s.user_replied as userReplied ` +
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1 join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.user_id = u.id order by u.id = ? desc, s.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select s.id as id, s.type as type ,s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };


    this.loadFilteredSpeciesChunk = function (res, user_id,term,start,end) {

        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select s.id as id, s.type as type ,s.location as location, s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y') as date, u.name as user , IF(i.image IS NULL, FALSE, TRUE) as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments, f.is_favorite as fav, `+
                ` s.expert_replied as expertReplied, s.user_replied as userReplied ` +
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1 left outer join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.name like (?) and s.user_id = u.id order by u.id = ? desc, s.date desc `, [user_id,term, user_id,start,end], function (err, result) {
                con.release();
                console.log(result)
                res.json(result);
                });
            }else{
                con.query(`select s.id as id, s.type as type ,s.name as name,s.anonymous as anonymous,SUBSTRING(s.specname,1,42) as specname, `+
                `DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from species_comments co where co.species_id = s.id group by species_id) as comments `+
                `from species s join user_details u left outer join species_images i on s.id = i.species_id and i.selected = 1  where  s.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };


    this.loadSpecie = function (res, spec_id, userId) {
        connection.acquire(function (err, con) {
            con.query(`select s.id as id, s.type as type, s.name as name,s.anonymous as anonymous, s.specname as specname, i.image as image,`
            +` s.lat as lat, s.lng as lng, DATE_FORMAT(s.date,'%b %d %Y %h:%i %p') as date, u.name as user, u.id as uid, s.location as location, f.is_favorite as fav  from species s left outer join species_images i on  s.id = i.species_id join user_details u left outer join species_favorite f on s.id = f.species_id and f.user_id = ? and f.is_favorite = 1 where s.id = ? `
            + ` and s.user_id = u.id `, [userId, spec_id] ,function (err, result) {
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
                if(err) {con.release();res.send({ status: false, message: 'Error' }); return;}
                con.query('insert into species(type,name,specname,location,user_id,lat,lng,date,anonymous) values (?,?,?,?,?,?,?,?,?)', [details.specie.type,details.specie.name,details.specie.specname, details.specie.location, details.specie.user ,details.specie.lat, details.specie.lng, details.specie.datetime, details.specie.anonymous], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' }); return;
                        });
                    }

                    let lstId = 0;

                    con.query('SELECT LAST_INSERT_ID() AS NID',function(err,result){
                        lstId = result[0].NID;
                        let arr = [true,false,false];
                        for(let index in details.images){

                          var base64Data = details.images[index].replace(/^data:image\/jpeg;base64,/, "");
                          var imgPath = "tools/files/species/"+lstId+"_"+index+".jpg";
                          var imgF = fs.writeFile(imgPath,base64Data,'base64',function(err){
                            console.log(err);
                          });

                          var imgThumbPath = "tools/files/species/thumb";


                          // thumb({
                          //   source: imgPath,
                          //   destination: imgThumbPath
                          // }, function(files, err, stdout, stderr) {
                          //   console.log('All done!');
                          // });


                            con.query('insert into species_images(species_id, image, selected) values(?,?, ?)',[lstId,details.images[index], arr[index]] , function(err, result){
                            if(err) {
                              con.release();
                              res.send({ status: false, message: 'Error' }); return;
                            }
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
                if(err) {
                    con.release();
                    res.send({ status: false, message: 'Error' }); return;
                }
                con.query('update species set type=?, name=?, specname=?, location=? , lat=?, lng=?, date=?, anonymous=? where id = ? ', [details.specie.type,details.specie.name,details.specie.specname, details.specie.location ,details.specie.lat, details.specie.lng, details.specie.datetime ,details.specie.anonymous ,details.specie.id], function(err, result){
                    if (err) {
                        con.rollback(function() {
                            con.release();
                            res.send({ status: false, message: 'Error' }); return;
                        });
                    }
                    con.query('delete from species_images where species_id= ?', details.specie.id ,function(err,result){
                        if (err) {
                            con.rollback(function() {
                              con.release();
                                res.send({ status: false, message: 'Error' }); return;
                            });
                        }
                        let arr = [true,false,false];

                        Async.eachOfSeries(details.images, function itOvEl(element,index,callback){
                          var base64Data = details.images[index].replace(/^data:image\/jpeg;base64,/, "");
                          var imgPath = "tools/files/species/"+lstId+"_"+index+".jpg";
                          var imgF = fs.writeFile(imgPath,base64Data,'base64',function(err){
                            console.log(err);
                          });

                          var imgThumbPath = "tools/files/species/thumb";

                            con.query('insert into species_images(species_id, image, selected) values(?,?, ?)',[details.specie.id,element, arr[index]] , function(err, result){
                                if(err) {
                                    //res.send({ status: false, message: 'Error' }); return;
                                    callback("err");
                                }
                                callback();
                            });
                        }, function fin(err){
                            if(err){
                              con.release();
                                res.send({ status: false, message: 'Error' }); return;
                            }
                            con.commit(function(err) {
                                if (err) {
                                    con.rollback(function() {
                                      con.release();
                                      res.send({ status: false, message: 'Error' }); return; });
                                }
                                con.release();
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
                if(err) {
                  con.release();
                  res.send({ status: false, message: 'Error' }); return;
                }
                con.query('insert into species_comments(type,user_id,details,species_id,date) values (?,?,?,?,now())', [details.type,details.user_id,details.details, details.species_id], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' }); return;
                        });
                    }
                    console.log(details);
                    let whichType = 'user_replied';
                    if(details.type === 'Media' || details.type === 'Expert'){
                      whichType = 'expert_replied';
                    }

                    con.query('update species set '+whichType+' = 1 where id = ? ', details.species_id, function(err, result){
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
                                  res.send({ status: false, message: 'Error' }); return; });
                            }
                            con.release();
                            res.send({ status: true, message: 'Comment added successfully' });
                            console.log('success!');
                        });

                      });

                });
            })

        });
    }



    this.removeSpecies = function(res, comp_id){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {
                  con.release();
                  res.send({ status: false, message: 'Error' }); return;
                }
                con.query('delete from complains where id = ?', [comp_id], function(err, result){
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
                        res.send({ status: true, message: 'Complain deleted successfully' });
                        console.log('success!');
                    });

                });
            })

        });
    }


    this.addAsFavorite = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {
                  con.release();
                  res.send({ status: false, message: 'Error' }); return;
                }

                con.query('insert into species_favorite(user_id,species_id,is_favorite) values (?,?,?) ON DUPLICATE KEY UPDATE is_favorite = ? ', [details.userId,details.specId,details.isFavorite,details.isFavorite], function(err, result){
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
                        res.send({ status: true, message: 'Favorite added successfully' });
                        console.log('success!');
                        return;
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
