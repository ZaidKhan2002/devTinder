import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(true); // 👈 added

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
      // Do nothing, ProtectedRoute will redirect if needed
    } finally {
      setIsLoading(false); // 👈 ensure it ends
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) return <div className="text-center mt-10 text-white">Loading...</div>;

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
