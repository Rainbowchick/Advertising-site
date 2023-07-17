import React, {useState, useContext} from "react";
import {CustomContext} from "../../Context";
import {category} from "../../category";
import Select from "./Select";
import {useForm} from "react-hook-form";
import axios from "../../axios";
import {useNavigate} from "react-router-dom";


const AddPost = () => {
    const [categoryActive, setCategoryActive] = useState(false);
    const [select, setSelect] = useState('');
    const [choose, setChoose] = useState('');
    const [choose1, setChoose1] = useState('');
    const { user, setUser } = useContext(CustomContext)

    const {
        register,
        reset,
        handleSubmit
    } = useForm()

    const navigate = useNavigate()
    const addPostHandler = (data) => {
        axios.post('/product', {
            ...data,
            creator: user,
            category: select,
            type: choose,
            choose: choose1,
            comment: [],
        }).then((res) => {
            {
                reset();
                setChoose('');
                setChoose1('');
                setSelect('');
                setCategoryActive(false);
                navigate('/');
            }
        }).catch(() => {
            alert('error')
        })


    }

    return (
        <div className='post'>
            <div className="container">
                <form onSubmit={handleSubmit(addPostHandler)} action="" className='post__form'>
                    <h2 className='post__title'>Создайте свое объявление</h2>
                    <h3 className='post__text'>
                        Загрузить фото
                    </h3>
                    <input {...register('image')} placeholder='Добавьте фото' type="text" className='post__input'/>
                    <h3 className='post__text'>
                        Загрузить сертификат на продукцию
                    </h3>
                    <input {...register('certificate')} placeholder='Добавьте фото' type="text" className='post__input'/>
                    <p className='post__description'>Описание</p>
                    <textarea {...register('description')} placeholder='Описание товара' className='post__textarea'/>
                    <div className='post__categhory'>
                        <p className='post__category-title'>Категория</p>
                        <button className='post__category-btn' type={'button'} onClick={() => {
                            setCategoryActive(true)
                            setSelect('');
                            setChoose('');
                        }}>Выбрать
                        </button>
                        <ul className='post__category-list' style={{display: categoryActive ? 'block' : 'none'}}>
                            {
                                category.filter(item => item.category.includes(select)).map(item => (
                                    <li className='post__category-item'>
                                        <span onClick={() => setSelect(item.category)}>{item.category}</span>
                                        <ul className='post__category-list'
                                            style={{display: select ? 'block' : 'none'}}>
                                            {
                                                item.list.filter(e => e.category.includes(choose)).map(element => (
                                                    <li className='post__category-item' onClick={() => {
                                                        setChoose(element.category)
                                                    }}>{element.category}
                                                        {
                                                            element.list && <ul className='post__category-list'
                                                                                style={{display: choose.length ? 'block' : 'none'}}>
                                                                {
                                                                    element.list.filter(list => list.name.includes(choose1)).map(list => (
                                                                        <li className='post__category-item' onClick={() => {
                                                                            setChoose1(list.name)
                                                                        }}>{
                                                                            list.name
                                                                        }</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        }
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <Select register={register} formKey={'city'} title='Область продажи'
                            list={['Улан-удэ', 'Бичура', 'Закаменск', 'Хоринск']}/>
                    <h2 className='post__price'>Цена</h2>
                    <div>
                        <input {...register('price')} placeholder='Введите цену' className='post__input input_margin'
                               type="number"/>
                        <div className='post__payment'>
                            <label className='post__label' htmlFor="Договорная">
                                <input {...register('cash')} checked value='Договорная' id='Договорная' type="radio"/>
                                <span className='post__cash'>Договорная</span>
                            </label>
                            <label className='post__label' htmlFor="RUB">
                                <input {...register('cash')} checked value='RUB' id='RUB' type="radio"/>
                                <span className='post__cash'>RUB</span>
                            </label>
                        </div>
                    </div>

                    <div className='post__order'>
                        <Select register={register} formKey={'delivery'} title={'Доставка'}
                                list={['Самовывоз', 'Доставка до дома']}/>
                    </div>
                    <div>
                        <button type='submit' className='post__category-btn btn_size'>Опубликовать
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPost;