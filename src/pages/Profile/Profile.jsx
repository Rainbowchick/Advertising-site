import React, {useContext, useEffect} from "react";
import {FiTrash} from 'react-icons/fi'
import {Link, NavLink, Route, Routes, useLocation} from "react-router-dom";
import {CustomContext} from "../../Context";
import {useForm} from "react-hook-form";
import axios from "../../axios";
import Settings from "./Settings";
import Post from "./Post";
import Message from "./Message";
import Analytic from "./Analytic";
import Orders from "./Orders";

const Profile = () => {

    const location = useLocation()

    return (
        <div className='profile'>
            <div className="container">

                <ul className='profile__tabs'>
                    <li className='profile__link'><NavLink className='profile__link-item' to='/profile/post'>Мои
                        объявления</NavLink></li>
                    <li className='profile__link'><NavLink className='profile__link-item'
                                                           to='/profile/messages'>Сообщения</NavLink></li>
                    <li className='profile__link'><NavLink className='profile__link-item' to='/profile/settings'>Настройки
                        профиля</NavLink></li>
                    <li className='profile__link'><NavLink className='profile__link-item'
                                                           to='/profile/analytics'>Аналитика</NavLink></li>
                    <li className='profile__link'><NavLink className='profile__link-item'
                                                           to='/profile/orders'>Мои заказы</NavLink></li>
                </ul>
                <div className='product__crumbs'>
                    <Link className='product__crumbs-link' to='/'>Главная</Link> - <p
                    style={{color: "gray"}}>Профиль</p> - <p>{location.pathname.includes('settings')
                     ? 'Настройки' : location.pathname.includes('messages') ? 'Сообщения' : location.pathname.includes('post') ? 'Мои объявления' :
                        location.pathname.includes('analytics') ? 'Аналитика' : ''}</p>
                </div>
                <>
                    <Routes>
                        <Route path='/settings' element={<Settings/>}/>
                        <Route path='/post' element={<Post/>}/>
                        <Route path='/messages' element={<Message/>}/>
                        <Route path='/analytics' element={<Analytic/>}/>
                        <Route path='/orders' element={<Orders/>}/>
                    </Routes>
                </>

            </div>
        </div>
    )
}

export default Profile;