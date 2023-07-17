import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Product from "./pages/Product/Product";
import OtherProfile from "./pages/my_profile/OtherProfile";
import BusinessAccount from "./pages/business_account/BusinessAccount";
import Profile from "./pages/Profile/Profile";
import AddPost from "./pages/add_post/AddPost";
import './scss/style.scss'
import Header from "./layout/header/Header";
import {useEffect, useState, useContext} from "react";
import {CustomContext} from "./Context";
import Category from "./pages/Category/Category";
import Payment from "./pages/Payment/Payment";
import UserOrder from "./pages/Order/UserOrder";

function App() {

    const {getAllUserFromLocalStorage, getAllProduct} = useContext(CustomContext)

    useEffect(() => {
        getAllUserFromLocalStorage();
    }, [])

    useEffect(() => {
        getAllProduct()
    },[])



    return (
    <div className="App">
      <Header ></Header>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/product/:id' element={<Product/>}></Route>
          <Route path='/order/:id' element={<UserOrder/>}></Route>
        <Route path='/other_profile/:id' element={<OtherProfile/>}></Route>
        <Route path='/business_account' element={<BusinessAccount/>}></Route>
        <Route path='/profile/*' element={<Profile/>}></Route>
        <Route path='/add_post' element={<AddPost/>}></Route>
          <Route path='/category' element={<Category />}></Route>
          <Route path='/payment' element={<Payment />}></Route>

      </Routes>
    </div>
  );
}

export default App;
