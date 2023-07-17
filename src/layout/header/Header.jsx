import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import {BiSearchAlt} from 'react-icons/bi'
import mainlogo from './icons/logo3.png'
import MenuCatalog from "../../components/MenuCatalog";
import {arrayItem} from "../../list";
import {CustomContext} from "../../Context";

const Header = () => {
    const {user, setUser} = useContext(CustomContext)
    const [popup, setPopup] = useState(false);
    const navigate = useNavigate();
    const logOutUser = () => {
        localStorage.removeItem('user');
        setUser({});
    }


    return (
        <header className='header'>
            <div className="container">
                <nav className='header__nav'>
                    <div className='header__left'>
                        <h1 className='header__title'>
                            <Link className='header__link' to='/'><img className='header__logo' src={mainlogo} alt="СельхозБурятия"/></Link>
                        </h1>
                        <p className='header__label'>Лучшая площадка для сельскохозяйственной продукции</p>
                    </div>
                    <div className='header__right'>
                        {
                            user.email ? <div className='header__user'>
                                    <p className='header__user-name'><Link to='/profile/post'>{user.name}</Link></p>
                                    <img src={user.avatar} alt="" className="home__info-img"/>
                                    <button className='header__user-btn' onClick={() => {logOutUser()}} type={"button"}>Выйти</button>
                                </div>
                                : <p onClick={() => { setPopup(true) }} className='header__auth'>Авторизация</p>

                        }
                        <button onClick={(e) => (
                            user.email ?  navigate('/add_post') : setPopup(true)
                        )} type={'button'}  className='header__btn'>Подать объявление</button>
                    </div>

                </nav>
            </div>
            {popup && <Popup setPopup={setPopup} popup={popup}/>}
            <div className='header__bottom'>
                <div className="container">
                    <div className='header__bottom-search'>
                        <input placeholder='Поиск..' className='header__bottom-input' type="search"/>
                            <button className='header__bottom-icon'><BiSearchAlt /></button>
                    </div>
                    <ul className='header__bottom-list'>
                        {
                            arrayItem.map(item => (
                                <MenuCatalog key={item.id} {...item} />

                            ))
                    }
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;