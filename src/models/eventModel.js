var connection = require('../DB/connection');
import Async from 'async';

function Event() {
    this.get = function (res) {
    };

    this.loadEvents = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from events order by date desc',function (err, result) {
                con.release();
                res.json(result);
            });
        });
    };

}




module.exports = new Event();
