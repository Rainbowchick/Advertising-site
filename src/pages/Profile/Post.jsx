import React, {useContext, useEffect} from 'react';
import Card from "../home/Card";
import {CustomContext} from "../../Context";

const Post = (props) => {

    const {getProductById, user, product} = useContext(CustomContext);
    useEffect(() => {
        getProductById(user.id)
    }, [])
    return (
        <div className='home__content'>
            {
                product.map(item => (
                    <Card item={item}/>
                ))
            }
        </div>
    );
};

export default Post;