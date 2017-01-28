var connection = require('../DB/connection');
var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var pug = require('pug');

const CATEGORY_JEWELLARIES = 1;
const CATEGORY_WOODCRAFTS = 2;



function returnCategoryId(type){
    switch(type){
        case 'jewellaries':
            return CATEGORY_JEWELLARIES;
        case 'woodcrafts':
            return CATEGORY_WOODCRAFTS;
        default:
            return 0;
    }
}


function sendConfirmMail(checkout){
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'prasad.wanigasinghe.test@gmail.com',
            pass:'Pras777@dan'
        }
    });
   // var transporter = nodemailer.createTransport('smtps://info@capitalbritannia:Rajiv1234@smtp.domain.com');

   /*var transporter = nodemailer.createTransport(smtpTransport({
    host: 'https://emailmg.domain.com/roundcube/',
    port: 25,
    auth: {
        user: 'info@capitalbritannia.com',
        pass: 'Rajiv1234'
    }
}));*/
    
    var mailOptions = {
        from: 'prasad.wanigasinghe.test@gmail.com',
        to: 'prasad.wanigasinghe.test@gmail.com',
        subject: 'Capital Britannia - Placed Order Details !!!',
        html: confirmTemplate(checkout)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });    
}

function confirmTemplate(checkout) {

    const template = `<h1 style="color:#18c9d2;font-size: 2.7em;font-weight: 400">Capital <span style="color: #333">Britannia</span> </h1>
                    <h2> User: ${checkout.user.name}, </h2>,
                    <h3>Following order has been Confirmed. </h3>
                    <table>
                     ${checkout.selectedItems.map(item => `<tr><td><h4>${item.name}</h4></td><td><h4>${item.price}</h4></td></tr>`).join('\n      ')}
                    </table>
                    <h3>Delivery Details </h3>
                    <h4>TP : ${checkout.user.tp} </h4>
                    <h4>Address : ${checkout.user.address} </h4>`;
    return template.replace(/\n/, '<br>');
}

function orderTemplate(checkout) {

    const template = `<h1 style="color:#18c9d2;font-size: 2.7em;font-weight: 400">Capital <span style="color: #333">Britannia</span> </h1>
                    <h2> Hello ${checkout.user.name}, </h2>,
                    <h3>Following order has been Confirmed. </h3>
                    <table>
                     ${checkout.selectedItems.map(item => `<tr><td><h4>${item.name}</h4></td><td><h4>${item.price}</h4></td></tr>`).join('\n      ')}
                    </table>
                    <h3>Delivery Details </h3>
                    <h4>TP : ${checkout.user.tp} </h4>
                    <h4>Address : ${checkout.user.address} </h4>`;
    return template.replace(/\n/, '<br>');
}

function sendMail(checkout,type){
    var transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'prasad.wanigasinghe.test@gmail.com',
            pass:'Pras777@dan'
        }
    });
    //var transporter = nodemailer.createTransport('smtps://visionx.prasad%40gmail.com:pras777dan031607@smtp.gmail.com');

       /*var transporter = nodemailer.createTransport(smtpTransport({
    host: 'https://emailmg.domain.com/roundcube/',
    port: 25,
    auth: {
        user: 'info@capitalbritannia.com',
        pass: 'Rajiv1234'
    }
}));*/

    var text = 'Hello world from \n\n' + 'name here';
    
    var mailOptions = {
        from: 'prasad.wanigasinghe.test@gmail.com',
        to: 'prasad.wanigasinghe.test@gmail.com',
        subject: 'Capital Britannia - Your Order Has Been Confirmed !!!',
        //text: text //, // plaintext body
        html: orderTemplate(checkout)
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        };
    });
}

function Item() {
    this.get = function (res) {
        console.log(">>>>>>>>>>>>")
        connection.acquire(function (err, con) {
            con.query('select * from items', function (err, result) {
                con.release();
                //res.send(result);
                console.log(result);
                res.json(result);
            });
        });
    };

    this.getLimited = function (res) {
        connection.acquire(function (err, con) {
            con.query('select * from items limit 8', function (err, result) {
                con.release();
                //res.send(result);
                console.log(result);
                res.json(result);
            });
        });
    };

    this.getItemById = function (res,id) {
        connection.acquire(function (err, con) {
            con.query('select * from items where id = '+id, function (err, result) {
                con.release();
                //res.send(result);
                console.log(result);
                res.json(result);
            });
        });
    };

    this.getItemsByType = function (res,type) {
        let catId = returnCategoryId(type);
        connection.acquire(function (err, con) {
            con.query('select * from items where categoryId = '+catId, function (err, result) {
                con.release();
                //res.send(result);
                console.log(result);
                res.json(result);
            });
        });
    };

    this.searchItems = function (res,key) {
        connection.acquire(function (err, con) {
            con.query('select * from items where name like \'%'+key+'%\'', function (err, result) {
                con.release();
                //res.send(result);
                console.log(result);
                res.json(result);
            });
        });
    };

    this.buyItem = function(res,checkout){
        connection.acquire( function(err,con){
console.log('success! 1');
            con.beginTransaction(function(err){
                if(err) {throw err;}
console.log('success! 2');
                // Inserting order
                con.query('insert into orders set ?', checkout.user, function(err, result){
                    console.log('success! 3');
                    if (err) {
                        con.rollback(function() { throw err; });
                    }
                    console.log('success! 4');
                    con.query('INSERT INTO order_items(order_id,item_id,qty) values (?,?,1)', [2,checkout.selectedItems[0].id], function(err, result) { 
			            if (err) { 
				            con.rollback(function() { throw err; }); 
			            } 
			console.log('success! 5');
			            con.commit(function(err) { 
				            if (err) { 
					            con.rollback(function() { throw err; }); 
				            } 
                            console.log('success! 6');
                            sendMail(checkout,"ORDERER");
                            sendConfirmMail(checkout);
                             res.send({ status: 0, message: 'Order created successfully' });
				            console.log('success!'); 
			            }); 
		            }); 
                })

            });

            /*con.query('insert into orders set ?', checkout.user, function(err, result){
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Order creation failed' });
                } else {
                    sendMail(checkout,"ORDERER");
                    res.send({ status: 0, message: 'Order created successfully' });
                }
            })*/
        });
    };


    this.create = function (item, res) {
        connection.acquire(function (err, con) {
            con.query('insert into items set ?', item, function (err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Item creation failed' });
                } else {
                    res.send({ status: 0, message: 'Item created successfully' });
                }
            });
        });
    };

    this.update = function (item, res) {
        connection.acquire(function (err, con) {
            con.query('update items set ? where id = ?', [item, item.id], function (err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Item update failed' });
                } else {
                    res.send({ status: 0, message: 'Item updated successfully' });
                }
            });
        });
    };

    this.delete = function (id, res) {
        connection.acquire(function (err, con) {
            con.query('delete from items where id = ?', [id], function (err, result) {
                con.release();
                if (err) {
                    res.send({ status: 1, message: 'Failed to delete' });
                } else {
                    res.send({ status: 0, message: 'Deleted successfully' });
                }
            });
        });
    };
}


module.exports = new Item();

