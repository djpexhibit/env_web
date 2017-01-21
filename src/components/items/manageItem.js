import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as itemActions from '../../actions/itemActions';
import ItemForm from './itemForm';

class ManageItem extends React.Component{
    constructor(props, context){
        super(props,context);

        this.state={
            item: Object.assign({}, this.props.item),
            errors:{}
        }
    }

    render(){
        return(
            <ItemForm allSuppliers={this.props.suppliers} item={this.state.item} errors={this.state.errors} />
        );
    }

   
}

 ManageItem.propTypes = {
     item: PropTypes.object.isRequired,
     suppliers: PropTypes.array.isRequired
 };
 
function mapStateToProps(state, ownProps){
    let item = {id:'', watchHref:'', name:'', supplierId:'', length:'', category:''};

    const suppliersFormattedForDropdown = state.suppliers.map(supplier => {
        return{
            value: supplier.id,
            text: supplier.firstName + ' ' + supplier.lastName
        };
    });

     return{
         item:item,
         suppliers: suppliersFormattedForDropdown
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageItem);