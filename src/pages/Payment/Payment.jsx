import React, {useContext, useEffect, useState} from 'react';
import axios from "../../axios";
import {useForm} from "react-hook-form";
import {category} from "../../category";
import Select from "../add_post/Select";
import {CustomContext} from "../../Context";
import {Link} from "react-router-dom";
import Card from "../home/Card";

const Payment = () => {
    const [payment, setPayment] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);
    const {user, product, order, getProductForOrderById} = useContext(CustomContext)

    useEffect(() => {
        getProductForOrderById(JSON.parse(localStorage.getItem('product')).id)
    }, [])

    // {console.log(JSON.parse(localStorage.getItem('product')).id)}

    const {
        register,
        reset,
        handleSubmit
    } = useForm()
    const addOrderHandler = (data) => {
        axios.post('/order', {
            ...data,
            creator: user,
            ord: {
                name: JSON.parse(localStorage.getItem('product')).description,
                price: JSON.parse(localStorage.getItem('product')).price,
                image: JSON.parse(localStorage.getItem('product')).image,
                cash: JSON.parse(localStorage.getItem('product')).cash,

            },
            address: user.address,
            status: 'Заказ оформлен',
            date: Date(),

        }).then(() => {
            reset();
            setOrderStatus(false);
        }).catch(() => {
            alert('error');
        })
    }

    const handleActive = () => {
        setPayment(!payment)
    }

    const handleOrderStatus = () => {
        setOrderStatus(!orderStatus)
    }

    return (
        <div className='payment'>
            { orderStatus === false ?
                <div className="container">
                    <div className='payment__content'>

                        <form onSubmit={handleSubmit(addOrderHandler)} action="" className='payment__form'>
                            <h2 className='payment__title'>Оформление заказа</h2>
                            {
                                <Card item={(JSON.parse(localStorage.getItem('product')))}/>
                            }
                            <div>
                                <h2 className='payment__title'>Способ оплаты</h2>
                                <div className='payment__radio'>
                                    <label className='payment__label' htmlFor="Карта">
                                        <input onClick={handleActive} {...register('cash')} checked value='Карта'
                                               id='Карта'
                                               type="radio"/>
                                        <span {...register('payment__type')} className='payment__cash'>Картой</span>
                                    </label>
                                    <label className='payment__label' htmlFor="При получении">
                                        <input onClick={handleActive} {...register('cash')} checked
                                               value='При получении' id='При получении' type="radio"/>
                                        <span {...register('payment__type')}
                                              className='payment__cash'>При получении</span>
                                    </label>
                                </div>
                                {
                                    payment && <div>
                                        <h2>Номер карты</h2>
                                        <label>CVV</label>
                                    </div>
                                }
                            </div>
                            <div>
                                <h2 className='payment__title'>Адрес доставки</h2>
                                <label {...register('address')} className='payment__text'>{user.aboutMe}</label>
                            </div>
                            <h2 {...register('summary')} className='payment__title'>Сумма заказа</h2>
                            <label>{JSON.parse(localStorage.getItem('product')).price} {JSON.parse(localStorage.getItem('product')).cash}</label>
                            <button type='submit' onClick={() => {
                                setInterval(handleOrderStatus, 1000)
                            }} className='payment__btn'>Оплатить</button>
                        </form>


                    </div>

                </div> : <h2>Заказ оформлен</h2>}
        </div>
    );
};

export default Payment;