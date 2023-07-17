import {
    createContext, useEffect, useState
} from "react";
import axios from "./axios";

export const CustomContext = createContext()

export const Context = (props) => {
    const [user, setUser] = useState({})
    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState([]);
    const [filter, setFilter] = useState({
        city: '',
        category: '',
        cash: '',
        price: {from: 0, to: 1000000},
        type: '',
        choose: '',
        description: '',
        title: ''
    })

    useEffect(() => {
        getAllProduct(filter);
    },[filter])
    const getAllProduct = (filter) => {
        if (JSON.parse(localStorage.getItem('user')) === null) {
            axios.get(`/product?${filter?.city?.length ? `city=${filter.city}` : ''}&${filter?.cash?.length ? `cash=${filter.cash}` : ''}&${filter?.category?.length ? `category=${filter?.category}` : ''}`)
                .then(({data}) => {
                    setProduct(data)
                })
        } else {
            console.log(JSON.parse(localStorage.getItem(('user'))));
            axios.get(`/product?creator.id_ne=${JSON.parse(localStorage.getItem('user')).id}&${filter?.city?.length ? `city=${filter.city}` : ''}&${filter?.cash?.length ? `cash=${filter.cash}` : ''}&${filter?.category?.length ? `category=${filter?.category}` : ''}`)
                .then(({data}) => {
                    setProduct(data)
                })
        }
    }

    const getProductById = (id) => {
        axios.get(`/product?creator.id=${id}`)
            .then(({data}) => {
            setProduct(data);
        })
    }

    const  getOrderById = (id) => {
        axios.get(`/order?creator.id=${id}`)
            .then(({data}) => {
                setOrder(data)
            })
    }

    const getProductForOrderById = (id) => {
        axios.get(`/product?.id=${id}`)
            .then(({data}) => {
                setProduct(data);
            })
        console.log(id);
    }

    const getAllUserFromLocalStorage = () => {
        if (JSON.parse(localStorage.getItem('user'))!== null) {
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }

    const value = {
        user,
        setUser,
        getAllProduct,
        getAllUserFromLocalStorage,
        product,
        getProductById,
        filter,
        setFilter,
        getProductForOrderById,
        getOrderById,
        order,
        setOrder
    }
    return <CustomContext.Provider value={value}>
        {
            props.children
        }
    </CustomContext.Provider>
}
