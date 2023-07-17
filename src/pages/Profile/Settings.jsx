import React, {useContext} from 'react';
import {FiTrash} from "react-icons/fi";
import {CustomContext} from "../../Context";
import {useForm} from "react-hook-form";
import axios from "../../axios";

const Settings = () => {

    const {user, setUser} = useContext(CustomContext)

    const {
        handleSubmit,
        reset,
        register,
    } = useForm()

    const updateUser = (data) => {
        axios.patch(`/users/${user.id}`, {
            name: data.name.length ? data.name : user.name,
            phone: data.phone.length ? data.phone : user.phone,
            email: data.email.length ? data.email : user.email,
            aboutMe: data.aboutMe.length ? data.aboutMe : user.aboutMe,
            avatar: data.avatar.length ? data.avatar : user.avatar,
        }).then((res) => {
             axios(`/product?creator.id=${res.data.id}`)
                 .then((json) => {
                     if (!json.data.length) {
                         setUser(res.data);
                         localStorage.setItem('user', JSON.stringify(res.data))
                     }
                     json.data.forEach((item) => {
                         axios.patch(`/product/${item.id}`, {
                             creator: res.data
                         })
                             .then(() => {
                                 setUser(res.data);
                                 localStorage.setItem('user', JSON.stringify(res.data))
                             })
                     })
                 })
        })
    }

    return (
        <div className='profile__content'>
        <h2 className='profile__title'>Фото профиля</h2>
        <form onSubmit={handleSubmit(updateUser)}>
            <div className='profile__user'>
                <img className='profile__img' src={user.avatar} alt=""/>
                {/*<button className='profile__btn'>Выберите файл</button>*/}
                <input {...register('avatar')} className='profile__input' defaultValue={user.avatar}
                       type="text" placeholder='Ссылка на картинку'/>
                <p className='profile__icon'><FiTrash/></p>
            </div>
            <p className='profile__info'>Максимальный размер 5 мб</p>
            <h3 className='profile__title'>Личная информация</h3>
            <p className='profile__title'>Мое имя</p>
            <input {...register('name')} defaultValue={user.name} className='profile__input'
                   placeholder='Введите имя' type="text"/>
            <p className='profile__title'>Email</p>
            <input {...register('email')} defaultValue={user.email} className='profile__input'
                   placeholder='Введите email'
                   type="text"/>
            <p className='profile__title'>Адрес</p>
            <input {...register('aboutMe')} className='profile__input-info' defaultValue={user.aboutMe}
                   placeholder='Ваша информация'
                   type="text"/>
            <p className='profile__title'>Введите номер телефона</p>
            <input {...register('phone')} defaultValue={user.phone} className='profile__input'
                   placeholder='Телефон' type="tel"/>
            <button className='profile__btn2'>Сохранить</button>
        </form>
        <h3 className='profile__title profile_line'>Изменение пароля</h3>
        <p className='profile__title'>Текущий пароль</p>
        <input className='profile__input' placeholder='Текущий пароль' type="password"/>
        <p className='profile__title'>Новый пароль</p>
        <input className='profile__input' placeholder='Новый пароль' type="password"/>
        <p className='profile__title'>Подтвердите пароль</p>
        <input className='profile__input' placeholder='Пароль' type="password"/>
        <button className='profile__btn2'>Сохранить</button>
        <h3 className='profile__title profile_line'>Удалить профиль</h3>
        <p className='profile__remove'><span className='profile__remove-item'><FiTrash/></span>Удалить
            профиль</p>
    </div>
    )
};

export default Settings;