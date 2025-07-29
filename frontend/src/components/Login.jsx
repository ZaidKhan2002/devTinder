import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [emailId, setEmailId] = useState('test8@example.com');
    const [password, setPassword] = useState('Strongest1@3');
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
          const res = await axios.post(BASE_URL + "/login", {
            emailId,
            password,
          }, { withCredentials: true });
          console.log(res.data)
          dispatch(addUser(res.data))
          return navigate("/feed")
        } catch (err) {
          setError(err?.response?.data || "Something went wrong");
          console.log(err.response)
        }
      };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
    <div className="bg-base-300 p-8 rounded-2xl shadow-xl w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Login Page</h1>
      <form className="space-y-5">
        {/* Username Field */}
        <div className="flex items-center border rounded-md px-3 py-2 ">
            <svg   className="h-5 w-5 text-white mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
        >
                <path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
          <input
            type="text"
            value={emailId}
            placeholder="Username"
            className="w-full outline-none bg-base-300"
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="flex items-center border rounded-md px-3 py-2">
            <svg className="h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                >
                <path
                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </g>
            </svg>
          <input
            type="password"
            value={password}
            placeholder="Password"
            className="w-full outline-none bg-base-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <p className='text-red-500'>{error}</p>
        <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            onClick={handleLogin}
            >
            Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default Login