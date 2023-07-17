import React, {useState} from 'react';
import {Link} from "react-router-dom";

const MenuCatalog = ({title, list, image}) => {
    const [active, setActive] = useState(false);
    return (
        <li onMouseLeave={() => {setActive(false)}} onMouseEnter={() => {
            setActive(true);
        }} className='header__bottom-item'>
            <Link className='header__bottom-link' to='/category'>
                <div className='header__bottom-icon-container'>
                    {image}
                </div>
                <p className='header__bottom-title'>{title}</p>
            </Link>
            {
                active && <ul className='header__bottom-activeList'>
                    {
                        list.map(element => (
                            <li key={element.name} className='header__bottom-activeItem'><Link className='header__bottom-activeItem' to={`/${element.path}`}>{element.name}</Link> </li>
                        ))
                    }
                </ul>
            }
        </li>
    );
};

export default MenuCatalog;