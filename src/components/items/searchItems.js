import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import * as cartActions from '../../actions/cartActions';
import {bindActionCreators} from 'redux';
import ItemList from './ItemList';
import Loader from '../common/loader';

class SearchItems extends React.Component{

    constructor(props, context){
        super(props,context);

        this.addToCart = this.addToCart.bind(this);
    }

   

    addToCart(item){
        this.props.actions.addToCart(item);
    }

    render(){
        const {items} = this.props;
        
        return(
            <div>
            {items.length?
            <ItemList items={items} onSave={this.addToCart} />
            :<p>nothing</p>
            }
            <Loader/>
            </div>
        );
    }
}

SearchItems.PropTypes = {
    items: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};



function mapStateToProps(state, ownProps){
    return {
        items: state.items,
        searchText:ownProps.params.key
    };
}

function mapDispatchToProps(dispatch){ 
    return{
        actions : bindActionCreators(Object.assign({}, itemActions, cartActions),dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(SearchItems);