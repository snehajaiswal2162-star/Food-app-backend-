import React, { useContext } from 'react'
import {Routes, Route, useLocation} from "react-router-dom"
import Home from './pages/Home'
import Menu from './pages/Menu'
import MenuDetails from './pages/MenuDetails'
import Login from './pages/Login'
import MyOrders from './pages/MyOrders'
import MyBooking from './pages/MyBooking'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import BookTable from './pages/BookTable'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLayout from './pages/Admin/AdminLayout';
import AdminLogin from './pages/Admin/AdminLogin';
import AddMenu from './pages/Admin/AddMenu';
import AddCategory from './pages/Admin/AddCategory';
import Booking from './pages/Admin/Booking';
import Category from './pages/Admin/Category';
import Dashboard from './pages/Admin/Dashboard';
import Menus from './pages/Admin/Menu';
import Order from './pages/Admin/Order';
import { AppContext } from './context/AppContext'


const App = () => {
  const adminPath = useLocation().pathname.includes("admin")
  const {admin} = useContext(AppContext)
  return (
    <div>
      {!adminPath && <Navbar/>}
      <Routes>
        {/* User routes */}
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/menu-details/:id' element={<MenuDetails/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path='/myBooking' element={<MyBooking/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/booktable' element={<BookTable/>}/>

        {/* Admin routes */}
        <Route path='/admin' element={admin ? <AdminLayout/> : <AdminLogin/>}>
        
        <Route index element={ admin ? <Dashboard/> : <AdminLogin/>}/>
        <Route path='add-category' element={admin ? <AddCategory/> : <AdminLogin/>}/>
        <Route path='add-menu' element={admin ? <AddMenu/> : <AdminLogin/>}/>
        <Route path='category' element={admin ? <Category/> : <AdminLogin/>}/>
        <Route path='menus' element={admin ? <Menus/> : <AdminLogin/>}/>
        <Route path='order' element={admin ? <Order/> : <AdminLogin/>}/>
        <Route path='booking' element={admin ? <Booking/> : <AdminLogin/>}/>
        
        </Route>
      </Routes>
      {!adminPath && <Footer/>}
    </div>
  )
}

export default App
