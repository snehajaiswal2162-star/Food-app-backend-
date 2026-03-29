import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import{ ShoppingCart, UserCircle, Calendar, Package, LogOut } from 'lucide-react'
import MyBooking from './../pages/MyBooking';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const {navigate, user, setUser, axios} = useContext(AppContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

const logout = async () => {
  try {
    const { data } = await axios.post('/api/auth/logout')
    if(data.success)
      setUser(null)
      toast.success(data.message)
      navigate('/')
  } catch (error) {
    console.log(error)
  }
}

  return (  
    <nav className='bg-cyan-50 shadow-md sticky py-3 z-50 top-0'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link to={'/'} className='text-2xl font-bold text-blue-600'>
            <img src="/logo.png" alt="logo img"  className='w-32'/>
            </Link>
          </div>

          {/* Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link to={'/'} className='text-zinc-500 hover:text-blue-600 transition-colors font-medium'>Home</Link>
            <Link to={'/menu'} className='text-zinc-500 hover:text-blue-600 transition-colors font-medium'>Menus</Link>
            <Link to={'/contact'} className='text-zinc-500 hover:text-blue-600 transition-colors font-medium'>Contact</Link>
          </div>

          {/* signin / signout */}
          <div className='flex items-center space-x-4'>
            <button onClick={() => navigate('/cart')} className='relative p-2 hover:bg-gray-100 transition-colors rounded-lg'>
              <ShoppingCart size={22} className="text-gray-700"/>
              <span className='absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex font-medium items-center justify-center'>6</span>
            </button>

            <div className='hidden md:block'>
              {user ? (
                <div className='relative'>
                  <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                    onMouseEnter = {() => setIsProfileOpen(true)}
                    onMouseLeave = {() => setIsProfileOpen(false)}
                    >
                      <UserCircle size={30} className="text-gray-700"/>
                  </button>

                  {isProfileOpen &&(
                    <div
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                    className='absolute right-0 mt-2 w-48 shadow-lg rounded-lg bg-white border border-gray-100'
                    >
                      <Link to={'/MyBooking'} className='flex items-center px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors'>
                      <Calendar size={18} className='mr-3'/>
                      MyBooking
                      </Link>
                      <Link to={'/MyOrders'} className='flex items-center px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors'>
                      <Package size={18} className='mr-3'/>
                      MyBooking
                      </Link>
                      
                      <button onClick={logout} className='flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors'>
                        <LogOut size={18} className='mr-3' /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 cursor-pointer rounded-lg font-medium transition-colors' >Login</button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen &&(
          <div className='md:hidden py-4 border-t border-gray-200'>
            <div className='flex flex-col space-y-3'>
               <Link to={'/'} className='text-zinc-500 hover:text-blue-600 transition-colors font-medium'>Home</Link>
            <Link to={'/menu'} className='text-zinc-500 hover:text-blue-600 transition-colors font-medium'>Menus</Link>
            <Link to={'/contact'} className='text-zinc-500 hover:text-blue-600 transition-colors font-medium'>Contact</Link>

            {user ? (
                <div className='relative'>
                  <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                    onMouseEnter = {() => setIsProfileOpen(true)}
                    onMouseLeave = {() => setIsProfileOpen(false)}
                    >
                      <UserCircle size={30} className="text-gray-700"/>
                  </button>

                  {isProfileOpen &&(
                    <div
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                    className='absolute right-0 mt-2 w-48 shadow-lg rounded-lg bg-white border border-gray-100'
                    >
                      <Link to={'/MyBooking'} className='flex items-center px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors'>
                      <Calendar size={18} className='mr-3'/>
                      MyBooking
                      </Link>
                      <Link to={'/MyOrders'} className='flex items-center px-4 py-2 text-gray-400 hover:bg-gray-100 transition-colors'>
                      <Package size={18} className='mr-3'/>
                      MyBooking
                      </Link>
                      
                      <button onClick={logout} className='flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition-colors'>
                        <LogOut size={18} className='mr-3' /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => navigate('/login')} className='bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 cursor-pointer rounded-lg font-medium transition-colors' >Login</button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
