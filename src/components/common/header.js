import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute,IndexLink  } from 'react-router';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import {bindActionCreators} from 'redux';

class Header extends React.Component{
    constructor(props,context){
      super(props,context);

      this.state={
        searchValue : '',
        activeMenu : 0
      }

      this.searchItem = this.searchItem.bind(this);
      this.typeSearch = this.typeSearch.bind(this);
      this.selectMenu = this.selectMenu.bind(this);
    }

    selectMenu(e,index){
      //e.target.parentNode
      this.setState({activeMenu:index})
    }
    

    searchItem(){
      this.props.actions.searchItems(this.state.searchValue);
      browserHistory.push('/searchItems/'+this.state.searchValue);
    }

    typeSearch(e){
      this.setState({ searchValue: e.target.value });
    }


    render(){

        // Calculating total
        let total = 0;

        const menuStyle_hide = {
            display:'none'
        };
        const menuStyle_show = {
            display:'inline'
        };
        const menuStyle_hide_option = {
            display:'none',
            opacity:'1'
        };
        return(
          <div>
            <div className="brit_top_strip">
              <div className="container">
                <div className="brit_top_strip_content">
                  <div className="brit_top_strip_content_right">
                    <ul>
                      <li><a href="#">help</a></li>
                      <li><Link  to="/contact">Contact</Link></li>
                      <li><Link  to="/about">About Us</Link></li>
                    </ul>
                  </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>


            <div className="brit_header">
              <div className="container">
                <div className="brit_header_top">
                  <div className="brit_header_top_content">
                    <div className="brit_header_top_content_logo">
                      <Link  to="/"><h1>TEST</h1> </Link>
                    </div>
                    <div className="brit_header_top_content_cart">
                      <div className="brit_header_top_content_cart_box">
                        <Link to={'/cart'}>
                          <div className="brit_header_top_content_cart_box_total">
                            <span className="simpleCart_total">${total} </span>
                            (
                              <span id="simpleCart_quantity" className="simpleCart_quantity">{0} items</span>
                            )
                          </div>
                          <i className="glyphicon glyphicon-shopping-cart"></i>
                        </Link>
                        {total <= 0.00 ?
                        <p>
                          <a className="simpleCart_empty" href="javascript:;">Empty Cart</a>
                        </p>:
                        <p>
          
                        </p>
                        }
                        <div className="clearfix"> </div>
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  
                  <div className="row">
                    <div className="col-md-8 search_field_left">
                      <ul className="megamenu skyblue">
                        <li className="showhide" style={menuStyle_hide}>
                          <span className="title">MENU</span>
                          <span className="icon1"></span>
                          <span className="icon2"></span>
                        </li>
                        <li className={this.state.activeMenu==0?"active grid":"grid"} style={menuStyle_show}>
                          <IndexLink className="color1" to="/" onClick={(e) => this.selectMenu(e,0) } >
                            <i className="glyphicon glyphicon-home"></i>  Home
                          </IndexLink>
                        </li>
                        
                      </ul>
                    </div>
                    
                    <div className="col-md-4 search_field" >
                      <div className="input-group">
                        <input type="text" onChange={ this.typeSearch } className="form-control input" placeholder="Find what you looking for..." />
                        <span className="input-group-btn">
                          <button onClick={() => this.searchItem()} className="btn btn-info btn" type="button">
                            <i className="glyphicon glyphicon-search"></i>
                          </button>
                        </span>
                      </div>
                    </div> 
                  </div>


                </div>
              </div>
            </div>
            </div>
        )
    }
}


function mapStateToProps(state, ownProps){
    return {
        cart:state.cart
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, itemActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);