import React from 'react';
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import * as cartActions from '../../actions/cartActions';
import {bindActionCreators}  from 'redux';
import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';



//import exampleImage from './react-share-pin-example.png';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');



class Item extends React.Component{

    

    constructor(props,context){
        super(props,context);
        props.actions.loadItemById(props.params.id);

        this.addToCart = this.addToCart.bind(this);
    }

    addToCart(item){
        this.props.actions.addToCart(item);
    }

    render(){
            const shareUrl = 'http://github.com';
            const title = 'GitHub';

        let {item} = this.props;

        if(!item){
            return <div>No item selected</div>;
        }

        return(
            <div className="container brit_item_detail_main">
                
                <div className="row"></div>

                <div itemscope="" itemtype="http://schema.org/Product" >
                    <h1>{item.name}</h1>
                    <div className="row">
                        <div className="col-sm-6 col-xs-12">
                            <div className="panel panel-default">
                                <div className="panel-body brit_product_images">
                                    <div className="row">
                                        <div className="brit_image_full">
                                            {item.isDiscounted?
            <div className="ribbon-wrapper-green"><div className="ribbon-green">{item.discountPercentage}% Off</div></div>:null
            }
                                            <img class="img-responsive" src="https://static.mystore.lk/cache/products/19939/sales-play-smart-point-of-sale-pos-machine-splh12a-460x460-0-0.jpg" data-zoom-image="https://static.mystore.lk/cache/products/19939/sales-play-smart-point-of-sale-pos-machine-splh12a-800x800-0-0.jpg" itemprop="image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6 col-xs-12 brit_no_padding_left">
                            <div id="brit_product_info" className="panel panel-default">
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-sm-6 col-xs-12">
                                            {item.isDiscounted?
                <span><span className="brit_discount_price">${item.price} </span><span> ${item.price-item.price*item.discountPercentage/100}</span></span>:
                <span>$ {item.price}</span>
                }
                                        </div>
                                        <div className="col-sm-6 col-xs-12">
                                            <input className="form-control input-lg text-right txt-quantity numbers-only" name="quantity" value="1" type="text" />
                                            <div className="btn-group brit_checkout_main">
                                                <button type="button" onClick={()=> this.addToCart(item)} className="btn btn-success btn-lg btn-buy-now">Add to cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div id="brit_product_tabs" className="col-sm-9 col-xs-12">
                        <div id="overview" className="panel panel-default">
                            <div className="panel-heading">
                                <strong>Overview</strong>
                            </div>
                            <div className="panel-body">
                                {item.description}
                                <div className="brit_social">
                                    <FacebookShareButton
                                        url={shareUrl}
                                        title={title}
                                        className="Demo__some-network__share-button">
                                        <FacebookIcon
                                            size={32}
                                            round />
                                    </FacebookShareButton>
                                </div>
                            </div>

                        </div>
                    </div>


                    

                </div>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return{
        item:state.itemDetails
    };

}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, itemActions, cartActions),dispatch)
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Item);