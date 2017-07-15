var connection = require('../DB/connection');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
import Async from 'async';
var fs  = require("fs");
var thumb = require('node-thumbnail').thumb;


function Complain() {
    this.get = function (res) {
    };

    // this.loadComplains = function (res, user_id) {
    //     connection.acquire(function (err, con) {
    //
    //         if(user_id !== 0){
    //             con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
    //             `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments, `+
    //             `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
    //             ` f.is_favorite as fav from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1 left outer join complains_favorite f on c.id = f.complain_id and f.user_id = ? where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc limit 30 `, [user_id,user_id], function (err, result) {
    //             con.release();
    //             res.json(result);
    //             });
    //         }else{
    //             con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
    //             `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
    //             `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
    //             `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id limit 30 `, function (err, result) {
    //             con.release();
    //             //console.log("EEEE");console.log(result)
    //             res.json(result);
    //         });
    //         }
    //
    //     });
    // };

    this.loadComplains = function (res, user_id) {
        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , null as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                ` f.is_favorite as fav from complains c join pollution_type p join user_details u left outer join complains_favorite f on c.id = f.complain_id and f.user_id = ? where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc limit 30 `, [user_id,user_id], function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
                `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };

    // this.loadComplainsChunk = function (res, user_id, start, end) {
    //     connection.acquire(function (err, con) {
    //
    //         if(user_id !== 0){
    //             con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
    //             `DATE_FORMAT(c.date,'%b %d %Y') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments, `+
    //             `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
    //             ` f.is_favorite as fav from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1 left outer join complains_favorite f on c.id = f.complain_id and f.user_id = ? where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
    //             con.release();
    //             res.json(result);
    //             });
    //         }else{
    //             con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
    //             `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
    //             `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
    //             `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id limit 30 `, function (err, result) {
    //             con.release();
    //             //console.log("EEEE");console.log(result)
    //             res.json(result);
    //         });
    //         }
    //
    //     });
    // };


    this.loadComplainsChunk = function (res, user_id, start, end) {
        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `DATE_FORMAT(c.date,'%b %d %Y') as date, u.name as user , null as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                ` f.is_favorite as fav from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1 left outer join complains_favorite f on c.id = f.complain_id and f.user_id = ? where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
                `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
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



    this.loadComplain = function (res, comp_id, userId) {
        connection.acquire(function (err, con) {
            con.query(`select c.id as id, p.id as pid, p.type as type, e.id as aid, e.action as action, c.res_person as res_person, c.anonymous as anonymous, c.details as details, i.image as image,`
            +` c.lat as lat, c.lng as lng, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user, u.id as uid, c.location as location, f.is_favorite as fav from complains c left outer join complain_images i on  c.id = i.complain_id join pollution_type p join user_details u join expected_action e left outer join complains_favorite f on c.id = f.complain_id and f.user_id = ? and f.is_favorite = 1 where c.id = ? `
            + ` and p.id = c.type and e.id = c.action and c.user_id = u.id `, [userId,comp_id] ,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };


    this.loadComments = function (res, comp_id) {
        connection.acquire(function (err, con) {
            con.query(`select c.type as type, u.name as user, c.details as details, DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date from comments c join user_details u where c.complain_id = ? and c.user_id = u.id order by c.date `, comp_id ,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.addComplain = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {
                  con.release();
                  res.send({ status: false, message: 'Error' }); return;
                }
                con.query('insert into complains(type,res_person,details,location,user_id,lat,lng,date,action,anonymous) values (?,?,?,?,?,?,?,now(),?,?)', [details.complain.type,details.complain.person,details.complain.details, details.complain.location, details.complain.user ,details.complain.lat, details.complain.lng, details.complain.action, details.complain.anonymous], function(err, result){
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
                          var imgPath = "tools/files/complains/"+lstId+"_"+index+".jpg";
                          var imgF = fs.writeFile(imgPath,base64Data,'base64',function(err){
                            console.log(err);
                          });

                          var imgThumbPath = "tools/files/complains/thumb";


                          thumb({
                            source: imgPath,
                            destination: imgThumbPath
                          }, function(files, err, stdout, stderr) {
                            console.log('All done!');
                          });

                            con.query('insert into complain_images(complain_id, image, selected) values(?,?, ?)',[lstId,details.images[index], arr[index]] , function(err, result){
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
                            res.send({ status: true, message: 'Complain added successfully', id: lstId });
                            sendConfirmMail(details);
                            console.log('success!');
                            return;
                        });
                    })



                });
            })

        });
    }


/*    this.updateComplain = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {res.send({ status: false, message: 'Error' }); return;}
                con.query('update complains set type=?, res_person=?, details=?, location=? , lat=?, lng=?, action=? where id = ? ', [details.complain.type,details.complain.person,details.complain.details, details.complain.location ,details.complain.lat, details.complain.lng, details.complain.action, details.complain.id], function(err, result){
                    if (err) {
                        con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                    }
                    console.log("REACH1")

                    con.query('delete from complain_images where complain_id= ?', details.complain.id ,function(err,result){
                        if (err) {
                            con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                        }
                        console.log("REACH2")
                        let arr = [true,false,false];
                        for(let index in details.images){
                            con.query('insert into complain_images(complain_id, image, selected) values(?,?, ?)',[details.complain.id,details.images[index], arr[index]] , function(err, result){
                                if(err) {
                                    console.log("VVVVVVVVVVVV")
                                    res.send({ status: false, message: 'Error' }); return;
                                }
                                console.log("REACH3")
                            });
                        }

                        console.log("REACH4")

                        con.commit(function(err) {
                            if (err) {
                                con.rollback(function() { res.send({ status: false, message: 'Error' }); return; });
                            }
                            console.log("REACH5")
                            res.send({ status: true, message: 'Complain added successfully' });

                        });
                    })



                });
            })

        });
    }*/


    this.updateComplain = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {
                    con.release();
                    res.send({ status: false, message: 'Error' }); return;
                }
                con.query('update complains set type=?, res_person=?, details=?, location=? , lat=?, lng=?, action=?, anonymous=? where id = ? ', [details.complain.pid,details.complain.person,details.complain.details, details.complain.location ,details.complain.lat, details.complain.lng, details.complain.aid, details.complain.anonymous ,details.complain.id], function(err, result){
                    if (err) {
                        console.log(err)
                        con.rollback(function() {
                            con.release();
                            res.send({ status: false, message: 'Error' }); return;
                        });
                    }

                    con.query('delete from complain_images where complain_id= ?', details.complain.id ,function(err,result){
                        if (err) {
                            con.rollback(function() {
                                con.release();
                                res.send({ status: false, message: 'Error' }); return;
                            });
                        }

                        let arr = [true,false,false];

                        Async.eachOfSeries(details.images, function itOvEl(element,index,callback){
                            con.query('insert into complain_images(complain_id, image, selected) values(?,?, ?)',[details.complain.id,element, arr[index]] , function(err, result){
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
                                      res.send({ status: false, message: 'Error' }); return;
                                    });
                                }
                                con.release();
                                res.send({ status: true, message: 'Complain added successfully' });
                                return;
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
                con.query('insert into comments(type,user_id,details,complain_id,date) values (?,?,?,?,now())', [details.type,details.user_id,details.details, details.complain_id], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' }); return;
                        });
                    }

                    let whichType = 'user_replied';
                    if(details.type === 'Media' || details.type === 'Expert'){
                      whichType = 'expert_replied';
                    }

                    con.query('update complains set '+whichType+' = 1 where id = ? ', details.complain_id, function(err, result){
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
                            res.send({ status: true, message: 'Comment added successfully' });
                            console.log('success!');
                            return;
                        });
                      });

                });
            });

        });
    }



    this.removeComplain = function(res, comp_id){
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
                        return;
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

                con.query('insert into complains_favorite(user_id,complain_id,is_favorite) values (?,?,?) ON DUPLICATE KEY UPDATE is_favorite = ? ', [details.userId,details.compId,details.isFavorite,details.isFavorite], function(err, result){
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


    this.loadFavoriteComplains = function (res, user_id) {
        connection.acquire(function (err, con) {

            if(user_id !== 0){
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                ` f.is_favorite as fav from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1 join complains_favorite f on c.id = f.complain_id and f.user_id = ?  and f.is_favorite = 1 where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc limit 30 `, [user_id,user_id], function (err, result) {
                con.release();
                res.json(result);
                });
            }else{
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
                `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };

    this.loadFavoriteChunk = function (res, user_id, start, end) {
        connection.acquire(function (err, con) {

            if(user_id !== 0){
              con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
              `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments, `+
              `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
              ` f.is_favorite as fav from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1 join complains_favorite f on c.id = f.complain_id and f.user_id = ?  and f.is_favorite = 1 where p.id = c.type and c.user_id = u.id order by u.id = ? desc, c.date desc limit ?,? `, [user_id,user_id,start,end], function (err, result) {
              con.release();
              res.json(result);
                });
            }else{
                con.query(`select c.id as id, p.type as type ,c.res_person as res_person,c.anonymous as anonymous,SUBSTRING(c.details,1,42) as details, `+
                `c.expert_replied as expertReplied, c.user_replied as userReplied, c.closed as closed, `+
                `DATE_FORMAT(c.date,'%b %d %Y %h:%i %p') as date, u.name as user , i.image as image, u.id as user_id, (select count(*) from comments co where co.complain_id = c.id group by complain_id) as comments `+
                `from complains c join pollution_type p join user_details u left outer join complain_images i on c.id = i.complain_id and i.selected = 1  where p.id = c.type and c.user_id = u.id limit 30 `, function (err, result) {
                con.release();
                //console.log("EEEE");console.log(result)
                res.json(result);
            });
            }

        });
    };

    this.getFavoriteCount = function (res, user_id) {
        connection.acquire(function (err, con) {
                con.query(`select count(*) as favCount from complains_favorite f where f.user_id = ? and f.is_favorite = 1 `, [user_id], function (err, result) {
                con.release();
                res.json(result);
                });
        });
    };


    this.loadNumberOfPosts = function(res){
      connection.acquire(function (err, con) {
              con.query(`SELECT COUNT(*) as species,(SELECT COUNT(*) FROM complains) as complains FROM species `, function (err, result) {
              con.release();
              res.json(result);
              });
      });
    }

    this.loadNumberOfUsers = function(res){
      connection.acquire(function (err, con) {
              con.query(`SELECT COUNT(*) as users FROM user_details `, function (err, result) {
              con.release();
              res.json(result);
              });
      });
    }

    this.loadNumberOfFollwings = function(res, user_id){
      connection.acquire(function (err, con) {
              con.query(`SELECT COUNT(*) as species,(SELECT COUNT(*) FROM complains_favorite c WHERE  c.user_id = ? and c.is_favorite = 1) as complains FROM species_favorite s WHERE s.user_id = ?  and s.is_favorite = 1 `, [user_id, user_id],function (err, result) {
              con.release();
              res.json(result);
              });
      });
    }

    this.loadNumberOfOwnPosts = function(res, user_id){
      connection.acquire(function (err, con) {
              con.query(`SELECT COUNT(*) as species,(SELECT COUNT(*) FROM complains c WHERE  c.user_id = ? ) as complains FROM species s WHERE s.user_id = ? `, [user_id, user_id],function (err, result) {
              con.release();
              res.json(result);
              });
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
