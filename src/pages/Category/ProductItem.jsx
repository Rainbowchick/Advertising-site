import React, {useContext, useEffect, useState} from 'react';
import {CustomContext} from "../../Context";
import axios from "../../axios";
import {MdOutlineFavoriteBorder} from 'react-icons/md'
import {AiFillMessage} from 'react-icons/ai'
import {Link} from 'react-router-dom'

const ProductItem = ({sort}) => {

    const {getAllProduct, product, filter} = useContext(CustomContext);
    // const [product, setProduct] = useState([])

    useEffect(() => {
        getAllProduct();
        //     axios('/product')
        //         .then(({data}) => {
        //             setProduct(data);
        //         })
    }, [])

    return (
        <div className='product__items'>
            <div className='container'>
                {
                    product.sort((a, b) => sort === 'more' ? b.price - a.price : sort === 'less' ? a.price - b.price : '')
                        .filter((el) => el.price >= +filter?.price?.from && el.price <= +filter?.price?.to).filter(el =>
                        el.description.toLowerCase().includes(filter?.title?.toLowerCase())).map(item => (
                        <Link className='product-item-link' to={`/product/${item.id}`}>
                            <div className='product-item'>
                                <img className='product-item__img' src={item.image} alt=""/>
                                <div className='product-item__left'>
                                    <p className='product-item_description'>{item.description}</p>
                                    <div className='product-item__info'>
                                        <p className='product-item__text'>{item.choose}</p>
                                        <p className='product-item__text'>{item.select}</p>
                                    </div>
                                    <div className='product-item__content'>
                                        <p className='product-item__about'>{item.price} {item.cash}</p>
                                        <p className='product-item__about'>Область продажи: {item.city}</p>
                                    </div>
                                </div>
                                <div className='product-item__right'>
                                    <div className='product-item__icons'>
                                        <p className='product-item__icon'><MdOutlineFavoriteBorder/></p>
                                        <p className='product-item__icon'><AiFillMessage/></p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default ProductItem;