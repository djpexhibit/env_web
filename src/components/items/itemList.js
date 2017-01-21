import React, {PropTypes} from 'react';
import ItemListRow from './ItemListRow';

const ItemList = ({items,onSave}) => {

  
    return(
        <div className="row">
            <div className="container">
		        <div className="col-sm-12 col-xs-12 no-padding-left">
			        <div className="panel panel-home-box ui-widget products-widget">
				        <div className="panel-body brit_products products-grid">
					        <div className="row infinite-scroll">
						         {items.map(item => 
                                    <ItemListRow sizeClass='col-sm-3 col-xs-6' key={item.id} item={item} onClick={() => onSave(item)} />
                                    )}
						    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ItemList.propTypes = {
    items: PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
};

export default ItemList;