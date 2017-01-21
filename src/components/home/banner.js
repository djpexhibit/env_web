import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute,IndexLink  } from 'react-router';

export class Banner extends React.Component{
    render(){
        return(
            <div className="brit_banner">
                <div className="container">
                    <div className="brit_banner_grids">
                        <div className="col-md-6 brit_banner_wood">
                            <div className="brit_banner_wood_img">
                                <img src={require('../../images/home_1.jpg')} alt="" />
                            </div>
                            <div className="brit_banner_wood_text">
                                <h3 className="b-tittle">Travel Accessories</h3>
                                <a className="collection" href="single.html">View collection
                                    <i className="glyphicon glyphicon-arrow-right"></i>
                                </a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="col-md-6 brit_banner_jewell">
                            <div className="shoe-img">
                                <img src={require('../../images/home_2.jpg')} className="img-responsive" alt="" />
                            </div>
                            <div className="shoe-text">
                                <h3 className="b-tittle">Cosmetics</h3>
                                <Link  className="collection" to="/items/perfumes">
                                    View collection <i className="glyphicon glyphicon-arrow-right"></i>
                                </Link>
                            </div>
                            <div className="clearfix"> </div>
						    <div className="bottom-bags">
                                <div className="col-md-6 pack">
                                    <div className="bag-text">
                                        <h3 className="b-tittle">Cosmetics</h3>
                                        <a className="collection" href="single.html">View collection <i className="glyphicon glyphicon-arrow-right"></i></a>
                                    </div>
                                    <div className="bag-img">
                                        <img src={require('../../images/home_3.jpg')} className="img-responsive" alt="" />
                                    </div>
                                    <div className="clearfix"> </div>
                                </div>
                                <div className="col-md-6 glass">
                                    <div className="glass-text">
                                        <h3 className="b-tittle">Perfumes</h3>
                                        <a className="collection" href="single.html">View collection <i className="glyphicon glyphicon-arrow-right"></i></a>
                                    </div>
                                    <div className="glass-img">
                                        <img src={require('../../images/home_4.jpg')} className="img-responsive" alt=""/>
                                    </div>
                                    <div className="clearfix"> </div>
                                </div>
                            <div className="clearfix"> </div>
                        </div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
        )
    }
}