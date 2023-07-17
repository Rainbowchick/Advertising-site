import {FcMenu} from "react-icons/fc";
import {GiMilkCarton, GiShinyApple} from "react-icons/gi";
import {FaCarrot} from "react-icons/fa";
import {TbMeat} from "react-icons/tb";
import React from "react";

export const arrayItem = [
    {
        id: 1,
        title: 'Все',
        list: [{name: 'Фрукты', path: 'category'}, { name: 'Овощи', path: 'vegetable'},
            {name: 'Мясо', path: 'meat'}, {name: 'Молоко', path: 'milk'}],
        image: <FcMenu />
    },
    {
        id: 2,
        title: 'Фрукты',
        list: [{name: 'Яблоки', path: 'apple'}, {name: 'Бананы', path: 'bananas'},
            {name: 'Сливы', path: 'plums'}, {name: 'Абрикосы', path: 'apricots'}],
        image: <GiShinyApple />
    },
    {
        id: 3,
        title: 'Овощи',
        list: [{name: 'Морковь', path: 'carrot'}, {name: 'Помидор', path: 'tomato'}, {name: 'Перец', path: 'pepper'},
            {name: 'Свекла', path: 'beet'}, {name: 'Картошка', path: 'potato'}],
        image: <FaCarrot />
    },
    {
        id: 4,
        title: 'Мясо',
        list: [{name: 'Говядина', path: 'beef'}, {name: 'Свинина', path: 'pork'}, {name: 'Мясо птицы', path: 'poultry_meat'}],
        image: <GiMilkCarton />
    },
    {
        id: 5,
        title: 'Молоко',
        list: [{name: 'Молоко', path: 'milk'}, {name: 'Творог', path: 'cottage_cheese'},
            {name: 'Сметана', path: 'sour_cream'}, {name: 'Сыр', path: 'cheese'}],
        image: <TbMeat />
    }
]