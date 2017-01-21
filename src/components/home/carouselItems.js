import React from 'react';
var Slider = require('react-slick');
require('slick-carousel/slick/slick-theme.css');
require('slick-carousel/slick/slick.css');
import {connect} from 'react-redux';
import * as itemActions from '../../actions/itemActions';
import * as cartActions from '../../actions/cartActions';
import {bindActionCreators} from 'redux';
import ItemListRow from '../items/ItemListRow';
import {returnCategoryId} from '../../utils/commons';
import toastr from 'toastr';

class CarouselItems extends React.Component{

    constructor(props, context){
        super(props, context);

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

        let settings = {
            arrows:true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }],
            className: 'slides'
        };

        return(
            <div className="brit_jewellary_section">
                <div className="container">
                    <h3 className="brit_section_title">{this.props.title}</h3>
                        <div className="brit_jewellary_section_info">
                        {items.length > 0 ? 
         

                            <Slider {...settings}>
                                 {items.map( (item) => {
                                     return <div><ItemListRow sizeClass='' key={item.id} item={item} onClick={() => this.addToCart(item)} /></div>
                                })}
                                  
                            </Slider>
                           : null 
                        }
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
        );
    }
}


function mapStateToProps(state, ownProps){ 
    return {
        items:state.items,
        cart:state.cart
    };
}

function mapDispatchToProps(dispatch){
    return{
        actions : bindActionCreators(Object.assign({}, itemActions, cartActions),dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps )(CarouselItems);