import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "../../axios";

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [active, setActive] = useState(false);
    const [elementActive, setElementActive] = useState(false)
    const [showElement, setShowElement] = useState(false)

    const handleActive = () => {
        setElementActive(!elementActive)
    }

    const handleShow = () => {
        setShowElement(!showElement)
    }


    useEffect(() => {
        axios.get(`/product/${params.id}`)
            .then(({data}) => {
                setProduct(data)
            })
    }, []);
    {
        console.log(product)
    }
    return (
        <div className='product'>
            <div className="container">
                <div className='product__crumbs'>
                    <Link className='product__crumbs-link' to='/'>На главную</Link> > <p>{product.title}</p>

                </div>
                <div className="product__content">
                    <div className="product__content-left">
                        <img className='product__content-image' src={product.image} alt={product.title}/>
                    </div>
                    <div className="product__content-right">
                        <h2 className='product__content-label'>{product.title}</h2>
                        <div className='product__content-user'>
                            <img className='product__content-userImage'
                                 src={product.creator?.avatar ? product.creator?.avatar : 'https://uralbeton18.ru/wp-content/uploads/2021/08/default_logo_user.jpg.webp'}
                                 alt=""/>
                            <p className='product__content-userName'>{product.creator?.name}</p>
                        </div>
                        <ul className='product__content-right-list'>

                            {
                                product.comment && product.comment.map((comment) => (
                                    <li className='product__content-right-item'><span
                                        className='product__content-right-email'>{comment.email}</span>{comment.message}
                                    </li>
                                ))
                            }
                        </ul>
                        {
                            active ? <textarea className='product__textarea' name="" id="" cols="30"
                                               rows="10"></textarea> : ''
                        }
                        <button onClick={() => (setActive(true))} className='product__content-right-btn'
                                type='button'>Добавить комментарий
                        </button>
                        <h4 onClick={handleActive} className='product__content-right-phone'>Номер
                            телефона:{elementActive ?
                                <p className='product__content-right-phone-text'>{product.creator?.phone ? product.creator?.phone : 'отсутствует'}</p> :
                                <p className='product__content-right-phone-text'>Показать</p>}</h4>
                        <Link to='/payment'>
                            {localStorage.setItem('product', JSON.stringify(product))}
                            <button
                                className={`product__btn  ${product.cash === 'Договорная' ? 'product__btn_disable' : ''}`}>Заказать
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='product__down'>

                    <div className="product__down-description">
                        <div className="product__down-description-text">
                            <h2>Описание:</h2>
                            <p>{product.description}</p>
                        </div>
                        <div className="product__down-description-price">
                        <h2>Цена:</h2>
                        <p>{product.price} {product.cash}</p>
                            <h2>Наличие сертификата:</h2>
                            <p>{product.certificate ? 'Да' : 'Нет'}</p>
                        </div>
                    </div>
                    {product.certificate ? <div className='product__block-certificate'>
                        {<button onClick={handleShow} className='product__btn'>{showElement ? <div className='product__certificate'><img className='product__certificate-img' src={product.certificate} alt='{}' /></div> : ''}Показать сертификат</button>}
                    </div> : ''}
                </div>
            </div>
        </div>
    );
}

export default Product;