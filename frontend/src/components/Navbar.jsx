import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
            dispatch(removeUser());
            return navigate("/login")
        } catch (err) {
            console.log("ERROR while logging out")
        }
    }
    
  return (
    <div className="navbar bg-base-300 shadow-sm">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">DevTinder</a>
    </div>
    <div className="flex gap-2">
        {user && (
                  <div className="dropdown dropdown-end mx-5 flex">
                    <p className="px-4">Welcome, {user.firstName}</p>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                          <img
                              alt="Tailwind CSS Navbar component"
                              src={user.photoUrl} />
                      </div>
                  </div>
      
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><Link to='/profile' className="justify-between">Profile</Link></li>
                <li><Link to='/' className="justify-between">Settings</Link></li>
                <li><Link to='/logout' onClick={handleLogout} className="justify-between">Logout</Link></li>
              </ul>
            </div>
        )}
    </div>
  </div>
  )
}

export default Navbar