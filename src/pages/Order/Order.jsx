import React from 'react';
import {Link} from "react-router-dom";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import {AiFillMessage} from "react-icons/ai";

const Order = ({item}) => {
    return (
        <div className='order__content'>
            <div key={item.id} className='home__card'>
                <Link className='home__card-link' to={`/order/${item.id}`}>
                    <img className='home__img' src={item?.ord.image} alt={item.title}/>
                    <h2 className='home__card-label'>{item?.ord.name}</h2>
                    <p className='home__card-price'>{item?.ord.price}</p>
                    <p className='home__card-cash'>{item?.ord.cash}</p>
                    <span className='home__card-description'>{item.description}</span>
                </Link>
                <div className='home__info'>
                    <Link className='home__info-link' to={`/other_profile/${item.creator.id}`}>
                        <img
                            src={item.creator.avatar.length ? item.creator.avatar : 'https://uralbeton18.ru/wp-content/uploads/2021/08/default_logo_user.jpg.webp'}
                            alt="" className="home__info-img"/>
                    </Link>
                    <div className='home__info-icons'>
                        <Link className='home__info-icon' to='/'>
                            <MdOutlineFavoriteBorder/>
                        </Link>
                        <Link className='home__info-icon' to='/'>
                            <AiFillMessage/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;