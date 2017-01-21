import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as cartActions from '../../actions/cartActions'; 
import {Col, PageHeader, Jumbotron, Form, Input, ButtonInput } from 'react-bootstrap';

class Cart extends React.Component{
    constructor(props,context){
        super(props,context);

        this.state={
            checkout:{
                selectedItems:[],
                user:{
                    name:"",
                    email:"",
                    tp:"",
                    address:""
                },
                status:'NEW'
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateCheckoutState = this.updateCheckoutState.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();              

        /*let checkout = {};
        checkout.selectedItems = this.props.cart;
        checkout.user = null;*/
        let checkout = this.state.checkout;
        checkout.selectedItems = this.props.cart;
        this.props.actions.buyItems(checkout);

    }

    updateCheckoutState(e){
        const field = e.target.name;
        let checkout = this.state.checkout;
        checkout.user[field]=e.target.value;
        return this.setState({checkout:checkout});
    }
    

    render(){
        let cart = this.props.cart;
        let total = 0 ;
        const homeStyle = {
            mainContainer : { background:'white' },
            headerPadding :{ paddingBottom:'1em' }
        };
        return(
            <div className="container">
            <Col xs={12}>
            {
                this.state.checkout.status == 'PAID'
                ? (<div style={homeStyle.mainContainer}>
                    <Jumbotron style={homeStyle.mainContainer}>
                        <h2 style={homeStyle.headerPadding}>Hello, {'testuser'}!</h2>
                        <p>Thaks for using our services. Your order will be dispatched soon.</p>
                    </Jumbotron>
                </div>
                )
                : (
                    <div style={homeStyle.mainContainer}>
                        <Col xs={12} md={6} >
                            <div style={homeStyle.mainContainer}>
                                <h4 style={homeStyle.headerPadding}>  </h4>
                                    {cart.map( item => {
                                        let price = item.isDiscounted?(item.price - item.price*item.discountPercentage/100):item.price;
                                        total += price
                                        return (
                                            <div>
                                                <Product
                                                    item = {item}
                                                    key={item.id}
                                                    removeFromCart={(e)=> this.removeItemFromCart(e,item)}
                                                    />
                                                
                                            </div>            
                                        )
                                    })}
                            </div>
                            <div  style={{'paddingTop':'1em'}}>Total amount to pay is $ <span style={{'fontWeight':'bold'}}>{total}</span></div>
                            
                        </Col>
                        <Col xs={12} md={6} >
                            <div style={homeStyle.mainContainer}>
                                <h4 style={homeStyle.headerPadding}> </h4>
                            </div>
                            <form className="form-horizontal" onSubmit={(e) => this.handleSubmit(e)}>
                                <div className="form-group" >
                                    <label for="checkout_name">Name</label>
                                    <input id="checkout_name" type="text" label="Your name" className="form-control"
                                        ref="name"
                                        onChange={this.updateCheckoutState}
                                        placeholder="Enter your name here"
                                        name="name" />
                                </div>
                                <div className="form-group" >
                                    <label for="checkout_email">Email</label>
                                    <input id="checkout_email" type="email" label="Email" className="form-control"
                                        ref="email"
                                        onChange={this.updateCheckoutState}
                                        placeholder="Enter your email id" 
                                        name="email" />
                                </div>
                                <div className="form-group">
                                    <label for="checkout_phone">Phone Number</label>
                                    <input id="checkout_phone" type="phone" label="Phone no" className="form-control"
                                        ref="phone"
                                        onChange={this.updateCheckoutState}
                                        placeholder="Enter your Phone no here" required={true}
                                        name="tp" />
                                </div>
                                <div className="form-group">
                                    <label for="checkout_address">Address</label>
                                    <input id="checkout_address" type="address" label="Address" className="form-control"
                                        ref="address"
                                        onChange={this.updateCheckoutState}
                                        placeholder="Enter your address here" required={true}
                                        name="address" />
                                </div>
                                <button className="btn btn-success"  type="submit" bsStyle="success" value="Checkout now!"  >
                                    Checkout Now!
                                </button>
                            </form>
                        </Col>
                </div>
                )
                }
            </Col>
            </div>
        );
    }

    removeItemFromCart(e,item){
        this.props.actions.removeFromCart(item);
    }
}




function mapStateToProps(state, ownProps){
    return {
        cart:state.cart,
        checkout: state.checkout
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({},cartActions),dispatch)
    };
}


class Product extends React.Component {
    render() {
        const { item,key,removeFromCart } = this.props
        return (
            <div style={{'paddingBottom':'0.5em'}}>
                <div className="row">
                    <div className="col-md-4">
                        <img style={{'width':'100px','borderRadius': '0.4em'}} src={ require('../../images/item_'+item.id+'.jpg') } />
                    </div>
                    <div className="col-md-6">
                        <h3> {item.name} </h3>
                        <h4>
                            {item.isDiscounted?
                <span><span className="brit_discount_price">${item.price} </span><span> ${item.price-item.price*item.discountPercentage/100}</span></span>:
                <span>$ {item.price}</span>
                }
                        </h4>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={(e)=> removeFromCart(e,item)}> X </button>
                    </div>
                </div>     
            </div>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);