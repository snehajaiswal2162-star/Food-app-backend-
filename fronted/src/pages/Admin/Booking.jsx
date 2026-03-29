import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';

const Booking = () => {

  const {admin,axios,loading,setLoading} = useContext(AppContext)
  const [booking,setBooking] = useState([])

  const fetchBooking = async () => {
    try {
      const {data} = await axios.get('/api/booking/booking')
      console.log('data', data)
        if(data.success){
      setBooking(data.booking)
    }else{
      console.log("Faild to fatch the bookings")
    }
    } catch (error) {
      console.log("Error fetching booking", error)
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true)
      const {data} = await axios.put(`/api/booking/update-status/${bookingId}`, {
        status: newStatus
      })

      if(data.success){
        toast.success(data.message)
        fetchBooking()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if(admin){
      fetchBooking()
    }
  },[admin])

  return (
    <div>
      <div className='py-24 px-3 sm:px-6'>
        <h1 className='text-3xl font-bold text-center my-3'>All Booking</h1>
        <div className='border border-gray-400 max-w-5xl mx-auto p-3 rounded-lg'>

          {/* Header */}
          <div className='hidden md:grid grid-cols-5 font-semibold text-gray-700 mb-4'>
            <div>Name</div>
            <div>Phone no</div>
            <div>Person</div>
            <div>Date</div>
            <div>Time</div>
            <div>Status</div>
          </div>

          {/* Items */}
          <ul>
            {booking.map((item) => (
              <li key={item._id} className='border rounded-lg p-3 md:p-2'>
                 <div className="flex flex-col md:grid md:grid-cols-5 md:items-center gap-2 md:gap-0">
                  <p className='font-medium text-center md:text-left'>{item?.name}</p>
                  <p className='font-medium text-center md:text-left'>{item?.phone}</p>
                  <p className='text-gray-600 hidden md:block'>{item?.numOfPeople}</p>
                  <p className='text-gray-600 hidden md:block'>{new Date(item?.date).toLocaleDateString("en-US",{
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}</p>
                  <p className='text-gray-600 hidden md:block'>{item?.time}</p>

                  <div className='flex justify-center md:justify-start items-center gap-2 md:gap-5 mt-2 md:mt-0'>
                    <select name="status" value={item.status} onChange={(e) => handleStatusChange(item._id,e.target.value)} disabled={loading} className='border rounded-md px-3 py-2' id="">
                      <option value="pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                 </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Booking
