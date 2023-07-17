import React, {useContext, useEffect} from 'react';
import Card from "../home/Card";
import order from "../Order/Order";
import Order from "../Order/Order";
import {CustomContext} from "../../Context";

const Orders = () => {
    const {getOrderById, user, order} = useContext(CustomContext);
    useEffect(() => {
        getOrderById(user.id)
    }, [])
    return (
        <div>
            {
                order.map(item => (
                    <Order item={item}/>
                ))
            }
        </div>
    );
};

export default Orders;