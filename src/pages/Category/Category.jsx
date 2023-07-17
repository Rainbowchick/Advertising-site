import React, {useContext, useState} from 'react';
import {IoIosArrowDown} from 'react-icons/io'
import {GoSearch} from 'react-icons/go'
import {arrayItem} from "../../list";
import {set} from "react-hook-form";
import Product from "../Product/Product";
import ProductItem from "./ProductItem";
import {CustomContext} from "../../Context";
import debounce from 'lodash.debounce';
import {category} from "../../category";

const Category = () => {
    const [active, setActive] = useState(false);
    const {filter, setFilter} = useContext(CustomContext);
    const [sort, setSort] = useState('');
    // const [title, setTitle] = useState('')

    const searchProduct = (e) => {
        setFilter({...filter, title: e.target.value})
    }
    const debounceFunc = debounce(searchProduct, 500);

    return (
        <div className='category'>
            <div className='container'>
                <div className='category__head'>
                    <div onMouseLeave={() => {
                        setActive(false)
                    }} onMouseEnter={() => {
                        setActive(true)
                    }} className='category__choose'>
                        <p className='category__title'>Все категории</p>
                        <p className='category__icon1'><IoIosArrowDown/></p>
                        <ul className={`category__list ${active ? 'category__list_active' : ''}`}>
                            {arrayItem.map(item => (
                                <li onClick={() => {
                                    setFilter({...filter, category: item.title})
                                }} className='category__item'>{item.title}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='category__search'>
                        <input onChange={debounceFunc} placeholder='Поиск' className='category__input' type="text"/>
                        <p className='category__icon'><GoSearch/></p>
                    </div>
                    <select onChange={(e) => {
                        setFilter({...filter, city: e.target.value})
                    }} value={filter.city} className='category__select' name="" id="">
                        <option value="">Выберите город</option>
                        <option value="Улан-удэ">Улан-удэ</option>
                        <option value="Закаменск">Закаменск</option>
                        <option value="Бичура">Бичура</option>
                        <option value="Хоринск">Хоринск</option>
                    </select>
                </div>
                <div className='category__content'>
                    <div className='category__price'>
                        <p className='category__title'>Цена</p>
                        <div className='category__price-search'>
                            <input onChange={(e) => {
                                setFilter({...filter, price: {...filter.price, from: +e.target.value}})
                            }} placeholder='От' className='category__input1' type="number"/>
                            <input onChange={(e) => {
                                setFilter({...filter, price: {...filter.price, to: +e.target.value}})
                            }} placeholder='До' className='category__input1' type="number"/>
                        </div>
                    </div>
                    <div>
                        <p className='category__title'>Тип оплаты</p>
                        <div className='category__radio'>
                            <label className='category__label' htmlFor="RUB">
                                <input onChange={(element) => {
                                    setFilter({...filter, cash: element.target.value})
                                }} name='cash' type="radio" value='RUB'/>
                                <span>RUB</span>
                            </label>
                            <label className='category__label' htmlFor="Договорная">
                                <input onChange={(element) => {
                                    setFilter({...filter, cash: element.target.value})
                                }} name='cash' type="radio" value='Договорная'/>
                                <span>Договорная</span>
                            </label>
                            <label className='category__label' htmlFor="">
                                <input defaultChecked onChange={(element) => {
                                    setFilter({...filter, cash: element.target.value})
                                }} name='cash' type="radio" value=''/>
                                <span>Все</span>
                            </label>
                        </div>
                    </div>
                    <div className='category__sort'>
                        <p className='category__title'>Сортировать</p>
                        <select onChange={(e) => {
                            setSort(e.target.value);
                        }
                        } className='category__select' name="" id="">
                            <option value="">По умолчанию</option>
                            <option value="less">Сначала дешевле</option>
                            <option value="more">Сначала дороже</option>
                        </select>
                        <button className='category__button'>Показать</button>
                    </div>
                </div>
            </div>
            <ProductItem sort={sort}/>
        </div>
    );
}

export default Category;