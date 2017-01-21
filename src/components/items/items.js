import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import * as cartActions from '../../actions/cartActions';
import {bindActionCreators} from 'redux';
import ItemList from './ItemList';
import {returnCategoryId} from '../../utils/commons';
import toastr from 'toastr';

class Items extends React.Component{

    constructor(props, context){    // initiate state
        super(props,context);
      //  this.props.actions.loadItemsByType(this.props.type);
        this.addToCart = this.addToCart.bind(this);
    }
   

    addToCart(item){
        if (this.props.cart && this.props.cart.filter((e) => { return e.id == item.id ; }).length > 0) {
            toastr.error('Item already in the cart');
        }else{
            this.props.actions.addToCart(item);
            toastr.success('Added to cart');
        }
    }

    render(){
        let catId = returnCategoryId(this.props.type);
        const items = this.props.items.filter(item => item.categoryId == catId);
        
        return(
            <ItemList items={items} onSave={this.addToCart} />
        );
    }
}

Items.PropTypes = {
   // dispatch: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    //addItem: PropTypes.func.isRequired
     actions: PropTypes.object.isRequired
};



function mapStateToProps(state, ownProps){          // map state to properties
    return {
        items:state.items,
        cart:state.cart,
        type:ownProps.params.type
    };
}

function mapDispatchToProps(dispatch){                      // Determine what actions to dispatch from this component
    return{
        //addItem : item => dispatch(itemActions.addItem(item)) 
        actions : bindActionCreators(Object.assign({}, itemActions, cartActions),dispatch) // do the above (all actions wrap in dispatch)
    };
}






export default connect(mapStateToProps, mapDispatchToProps )(Items);