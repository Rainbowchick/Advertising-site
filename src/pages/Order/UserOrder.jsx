import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {CustomContext} from "../../Context";
import axios from "../../axios";


const UserOrder = () => {

    const params = useParams();
    const [order, setOrder] = useState({});



    useEffect(() => {
        axios.get(`/order/${params.id}`)
            .then(({data}) => {
                setOrder(data)
            })
    }, []);

    {console.log(order)}

    return (
        <div>
            <div className='product'>
                <div className="container">
                    <div className='product__crumbs'>
                        <Link className='product__crumbs-link' to='/'>На главную</Link> > <p>Заказ номер {order.id}</p>

                    </div>
                    <div className="product__content">
                        <div className="product__content-left">
                            <img className='product__content-image' src={order?.ord?.image} alt={order?.ord?.name}/>
                        </div>
                        <div className="product__content-right">
                            <h2 className='product__content-label'>{order?.ord?.name}</h2>
                            <h2 className='product__content-label'>Статус заказа</h2>
                            <p>{order?.status}</p>
                        </div>
                        <div className='product__down'>

                            <div className="product__down-description">
                                <div className="product__down-description-text">
                                    <h2>Адрес доставки</h2>
                                    <p>{order?.ord?.name}</p>
                                </div>
                                <div className="product__down-description-price">
                                    <h2>Сумма:</h2>
                                    <p>{order?.ord?.price} {order?.ord?.cash}</p>
                                    <h2>Дата заказа:</h2>
                                    <p>{order.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrder;