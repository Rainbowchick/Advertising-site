import React, {useEffect, useState, useContext} from "react";
import {CustomContext} from "../../Context";
import axios from "../../axios";
import {Link, useLocation} from "react-router-dom";
import Card from "./Card";
import {MdOutlineFavoriteBorder} from "react-icons/md";
import {AiFillMessage} from "react-icons/ai";

const Home = () => {
    const {product, user, getAllProduct} = useContext(CustomContext)

    const location = useLocation();

    useEffect(() => {
        getAllProduct()
    }, [])




    return (
        <div className='home'>
            <div className="container">
                <div className='home__content'>
                {
                    product.map((item) => (
                        <Card key={item.id} item={item}/>
                    ))
                }

            </div>
        </div>
        </div>
    );
}

export default Home;