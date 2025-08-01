import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequests } from '../utils/requestSlice'
import { toast } from 'react-hot-toast';

const Requests = () => {
    const requests = useSelector((store) => store.request);
    const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
        try {
          const res = await axios.post(
            BASE_URL + "/request/review/" + status + "/" + _id,
            {},
            { withCredentials: true }
          );
          dispatch(removeRequests(_id));
          toast.success(`Request ${status === "accepted" ? "accepted" : "rejected"} successfully`);
        } catch (err) {
            toast.error("Something went wrong");
        }
      };

    const fetchRequests = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true })
            dispatch(addRequests(res.data.data));
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchRequests();
    },[])

    if (!requests) return;

    if (requests.length === 0)
      return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="my-10 px-4">
    <h1 className="text-3xl font-bold text-center text-white mb-8">Connection Requests</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {requests.map((request) => {
        const { fromUserId } = request;
        if (!fromUserId) return null;

        const { firstName, lastName, photoUrl, age, gender, about } = fromUserId;

        return (
          <div
            key={request._id}
            className="bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:shadow-2xl"
          >
            <img
              src={photoUrl}
              alt={`${firstName}'s profile`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold mb-1">{firstName} {lastName}</h2>
            <p className="text-sm text-gray-300 mb-1">{age} • {gender}</p>
            <p className="text-center text-gray-400 text-sm mb-4">{about}</p>

            <div className="flex gap-4 mt-auto">
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm font-medium"
              >
                Reject
              </button>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded-lg text-sm font-medium"
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
  )
}

export default Requests