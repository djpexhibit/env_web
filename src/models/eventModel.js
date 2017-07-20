var connection = require('../DB/connection');
import Async from 'async';

function Event() {
    this.get = function (res) {
    };

    this.loadEvents = function (res) {
        connection.acquire(function (err, con) {
            con.query(`select DATE_FORMAT(date,'%b %d %Y') as date, location as location, title as name from events order by date desc`,function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

    this.addEvent = function(res, details){
        connection.acquire( function(err,con){
            con.beginTransaction(function(err){
                if(err) {
                  con.release();
                  res.send({ status: false, message: 'Error' }); return;
                }
                console.log(details);
                con.query('insert into events(title,location,date) values (?,?,?)', [details.name,details.location,details.date], function(err, result){
                    if (err) {
                        con.rollback(function() {
                          con.release();
                          res.send({ status: false, message: 'Error' });
                          return;
                        });
                    }else{
                      con.commit(function(err) {
                            if (err) {
                                con.rollback(function() {
                                  con.release();
                                  res.send({ status: false, message: 'Error' }); return;
                                });
                            }
                            con.release();
                            res.send({ status: true, message: 'Event added successfully' });

                            console.log('success!');
                            return;
                        });
                    }






                });
            })

        });
    }

}




module.exports = new Event();
