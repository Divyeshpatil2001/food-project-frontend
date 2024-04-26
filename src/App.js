import logo from './logo.svg';
import './App.css';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Logout from './components/logout/Logout'
import {Routes,Route, RouterProvider, Outlet, BrowserRouter} from 'react-router-dom'
import Home from './components/home/Home'
import Header from './components/header/Header';
import Hero from './components/section1/Hero'
import Section2 from './components/section2/Section2';
import Section3 from './components/section3/Section3';
import Cards from './components/section4/Cards';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import DHome from './pages/home/DHome'
import React from 'react';
import DLogin from './pages/login/DLogin'
import List from './pages/list/List'
import Single from './pages/single/Single'
import New from './pages/new/New'
import Sidebar from './components/sidebar/Sidebar'
import { productInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import './styles/dark.scss'
import { Navigate } from 'react-router-dom';
import ProductsItem from './pages/products_new/ProductsItem';
import Footer from './components/footer/Footer';
import Catering from './components/catering/Catering';
import Menu_Products from './pages/menu/Menu_Products';
import Menu_ProductDesc from './pages/menu/Menu_ProductDesc';
import Menu_CustomDish from './pages/menu/Menu_CustomDish';
import { useSelector } from 'react-redux';
import AddToCart from './components/addtocart/AddToCart';
import Order from './components/order/Order'
import Profile from './components/profile/Profile';
import ProductUpload from './pages/new/products_upload/ProductUpload';
import MenusAdmin from './components/menu_admin/MenusAdmin';
import OrdersAdmin from './components/orders_admin/OrdersAdmin';
import ProfileAdmin from './components/adminprofile/ProfileAdmin';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  // const user_admin = localStorage.getItem('user_admin_status')
  const navigate = useNavigate()
  const [isAdmin,setIsAdmin] = useState(false)
  const user = useSelector(state => state.user.user);
  const [cart, setCart] = useState([]);
  
  function LayoutComponent() {
    return (
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    )
  }
  // function Adminlayout() {
  //   return (
  //     <div>
  //     <Navbar /> 
  //     <Sidebar />
  //     <main >
  //       <Outlet />
  //     </main>
  //     </div>
  //   )
  // }

  
  
  
  useEffect(() => {
    const userAdminStatus = localStorage.getItem('user_admin_status')
    setIsAdmin(userAdminStatus === 'true')
    console.log(userAdminStatus)
  },[isAdmin])

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path='/'element={<LayoutComponent />} >
          <Route index element={<Home />}></Route>
          <Route path='catering' element={<Catering />}></Route>
          <Route path='menu-products'>
            <Route index element={<Menu_Products />} ></Route>
            <Route path='products-desc/:productId' element={<Menu_ProductDesc />}></Route>
          </Route>
          <Route path='menu-custom-dish'>
            <Route index element={<Menu_CustomDish />} ></Route>
            <Route path='products-desc/:productId' element={<Menu_ProductDesc />}></Route>
          </Route>
          {user && (
            <Route path='addtocart' element={<AddToCart />}></Route>
          )}
          <Route path='order' element={<Order /> }></Route>
          <Route path='profile' element={<Profile /> }></Route>
          <Route path='logout' element={<Logout />}></Route>
        </Route>
        <Route path='register' element={<Register />}></Route>
        <Route path='login' element={<Login />}></Route>
        {isAdmin ? (
      <>
        <Route path='/admin/*' element={<AdminRoutes />} />
        {/* <Route path='/admin/*' element={<AdminRoutes />} /> */}
      </>
          ) : (
            <>
              <Route path='/admin' element={<Login />} />
              <Route path='/admin/*' element={<Login />}/>
            </>
          )}
        {/* {isAdmin && <Route path='/admin' element={<AdminRoutes />} />}     */}
      </Routes>
    </div>
        );
      }
            
            

function AdminRoutes() {
  return (
    <Routes>
      <Route index element={<DHome />} />
      <Route path="login" element={<DLogin />} />
      <Route path="users">
        <Route index element={<List />} />
        {/* <Route path=":userId" element={<Single />} /> */}
        <Route path="newuser" element={<New title="Add New User" />} />
      </Route>
      <Route path="products">
        <Route index element={<ProductsItem />} />
        {/* <Route path=":productId" element={<Single />} /> */}
        <Route path="newproduct" element={<ProductUpload />} />
      </Route> 
      <Route path="menu">
        <Route index element={<MenusAdmin />}></Route>
      </Route>
      <Route path="orders">
        <Route index element={<OrdersAdmin />}></Route>
      </Route>
      <Route path="profile">
        <Route index element={<ProfileAdmin />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

        
      
     
      







{/* <Route index element={<DHome />}></Route>
            <Route path='login' element={<DLogin />}></Route>
            <Route path='users'>
              <Route index element={<List />}></Route>
              <Route path=':userId' element={<Single />}></Route>
              <Route path='new' element={<New inputs={userInputs} title="Add New User" />}></Route>
            </Route>
            <Route path='products'>
              <Route index element={<List />}></Route>
              <Route path=':productId' element={<Single />}></Route>
              <Route path='new' element={<New inputs={productInputs} title="Add New Product" />}></Route>
            </Route> */}
          {/* </Route> */}
      
  
      {/* </Routes> */}
    
          

   
      {/* <RouterProvider router={router}></RouterProvider> */}
    // </div>
//   );
// }