import React, {useContext, useEffect} from "react";
import {CustomContext} from "../../Context";
import {useParams} from "react-router-dom";
import Card from "../home/Card";

const OtherProfile = () => {

    const params = useParams()
    const {product, getProductById} = useContext(CustomContext);

    useEffect(() => {
        getProductById(params.id)
    }, [])

    return (
        <div className='other'>
            <div className="container">
                <div className='other__user'>
                    <img className='other__img' src={product[0].creator.avatar.length ? product[0].creator.avatar : 'https://uralbeton18.ru/wp-content/uploads/2021/08/default_logo_user.jpg.webp'} alt=""/>
                    <div className='other__info'>
                        <h2 className='other__title'>{product[0].creator.name}</h2>
                        <p className='other__text'>{product[0].creator.phone}</p>
                        <p className='other__text'>{product[0].creator.email}</p>
                    </div>
                </div>

                <div className="home__content">
                    {
                        product.map(item => (
                            <Card item={item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default OtherProfile;