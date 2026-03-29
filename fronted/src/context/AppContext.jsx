import {createContext, useContext, useEffect, useState } from "react"
import {data, useNavigate} from 'react-router-dom' 
import {toast} from 'react-hot-toast'
export const AppContext = createContext()

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true

const AppContextProvider = ({children}) => {


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)
    const [category,setCategory] = useState([])
    const [menu, setMenu] = useState([])
    const [cart,setCart] = useState([])
    const [totalPrice,setTotalPrice] = useState(0)

    const fetchCartData = async () => {
      try {
        const {data} = await axios.get('/api/cart/get')
        console.log(data, 'data')
        if(data.success){
          toast.success(data.message)
          setCart(data.cart)
        }else{
          console.log("Error fetching cart", error)
        }
      } catch (error) {
        toast.error("Something went wrong")
        console.log("Fetching error", error.response?.data?.message)
      }
    }

    useEffect (() => {
      const total = cart.reduce((acc,item) => acc + item.price * item.quantity, 0)
      setTotalPrice(total)
    },[cart])


    // Add to cart
    const addToCart = async (menuId) => {
      try {
        const {data} = await axios.post('/api/cart/add',
          {menuId:menuId,quantity:1})
        if(data.success){
          toast.success(data.message)
          // setCart(data.cart)
          // setTotalPrice(data.totalPrice)
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log("Add to cart error", error)
        toast.error("Something went wrong!")
      }
    }

const token = localStorage.getItem("token");

    // for category
    const fetchCategory = async () => {
        try {
            const {data} = await axios.get('/api/category/all')
            if(data.success){
            setCategory(data.categories)
        }else{
            console.log("Failed to fetch the category")
        }
        } catch (error) {
            console.log("Error fetching categories", error)
        }
    }

    // for menu
      const fetchMenu = async () => {
    try {
      const { data } = await axios.get("/api/menu/all");      

      if (data.success) {
        setMenu(data.menu);
      } else {
        console.log("Failed to fetch menus");
      }
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  };


   const isAuth = async () => {
  try {
    const { data } = await axios.get('/api/auth/is-Auth');
    if (data.success) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      return true;
    }
  } catch (error) {
    setUser(null);
    localStorage.removeItem("user");
    return false;
  }
};


    useEffect(() => {
  const init = async () => {
    // Restore admin from localStorage
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));

    // Restore user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    await isAuth()
    await fetchCategory();
    await fetchMenu();
    await fetchCartData()
  };
  init();
}, []);


   
    const value = {navigate,loading,setLoading,user,setUser,axios,admin, setAdmin,category,fetchCategory,menu,fetchMenu,addToCart }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider