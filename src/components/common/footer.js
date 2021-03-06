import React from 'react';

export class Footer extends React.Component{
    render(){
        return(
                    <div className="brit_footer">
            <div className="container">
                <div className="brit_footer_top">
                    <div className="col-md-2 brit_footer_left">
                        <h3>About Us</h3>
                        <ul>
                            <li><a href="#">Who We Are</a></li>
                            <li><a href="contact.html">Contact Us</a></li>
                            <li><a href="#">Our Sites</a></li>
                            <li><a href="#">In The News</a></li>
                            <li><a href="#">Carrers</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 brit_footer_left">
                        <h3>Your Account</h3>
                        <ul>
                            <li><a href="account.html">Your Account</a></li>
                            <li><a href="#">Personal Information</a></li>
                            <li><a href="contact.html">Addresses</a></li>
                            <li><a href="#">Discount</a></li>
                            <li><a href="#">Track your order</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 brit_footer_left">
                        <h3>Shopping</h3>
                        <ul>
                            <li><a href="#">Accesories</a></li>
                            <li><a href="#">Books</a></li>
                            <li><a href="#">Cloths</a></li>
                            <li><a href="#">Bags</a></li>
                            <li><a href="#">Shoes</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 brit_footer_left ">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="#">Sports Shoes</a></li>
                            <li><a href="#">Casual Shorts</a></li>
                            <li><a href="#">Formal Shoes</a></li>
                            <li><a href="#">Party Wear</a></li>
                            <li><a href="#">Ethnic Wear</a></li>
                        </ul>
                    </div>
                    <div className="col-md-2 brit_footer_left lost">
                        <h3>Life Style</h3>
                        <ul>
                            <li><a href="#">Spa</a></li>
                            <li><a href="#">Beauty</a></li>
                            <li><a href="#">Travel</a></li>
                            <li><a href="#">Food</a></li>
                            <li><a href="#">Trends</a></li>
                        </ul>
                    </div>
                    <div className="clearfix"> </div>
                </div>
			</div>
        </div>
        )
    }
}