import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const ItemListRow = ({item,onClick,sizeClass}) => {
    const itemStyle = {
        "backgroundImage":"url('/home_"+item.id+".jpg')"
    };
    return (
        <div className={sizeClass + ' brit_product'}>
            {item.isDiscounted?
            <div className="ribbon-wrapper-green"><div className="ribbon-green">{item.discountPercentage}% Off</div></div>:null
            }
            <div className="brit_product_tags">
            </div>
            <Link to={'/item/' + item.id}>
                <div className="brit_product_thumbnail" >
                <img src={require('../../images/item_'+item.id+'.jpg')} />
                </div>
            </Link>
            <h4 className="brit_product_name">
                <Link to={'/item/' + item.id}>{item.name}</Link>
            </h4>
            <h5 className="brit_product_price">
                {item.isDiscounted?
                <span><span className="brit_discount_price">${item.price} </span><span> ${item.price-item.price*item.discountPercentage/100}</span></span>:
                <span>$ {item.price}</span>
                }
            </h5>
            <div className="brit_product_buttons">
                <div className="btn-group">
                    <a onClick={onClick} className="btn btn-sm btn-success btn-add-to-cart" data-product-id="20649" data-toggle="tooltip" data-placement="top" data-container="body" title="" data-original-title="Add To Cart">
                        <i className="fa fa-shopping-cart"></i>
                        Add To Cart
                    </a>
                </div>
            </div>
        </div>
    );
};

ItemListRow.propTypes = {
    item: PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
};

export default ItemListRow;