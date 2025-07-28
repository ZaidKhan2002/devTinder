import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store) => store.user);
  
    const fetchUser = async () => {
      if (userData) return;
      try {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(res.data));
      } catch (err) {
        // No need to navigate here; ProtectedRoute will handle it
        console.error(err);
      }
    };
  
    useEffect(() => {
      fetchUser();
    }, []);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body