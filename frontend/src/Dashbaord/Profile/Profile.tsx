import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios"
import { Link } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}users/getuserdetails`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res: any) => {
        if (res?.data?.status) {
          // toast.success(res.data.message, {
          //   position: 'top-right'
          // })
          setUserData(res?.data?.user)
        }
        else {
          toast.error(res?.data?.message, {
            position: 'top-right'
          })
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data.error.message)
      })
  }, [])
  return (
    <>
      <div className=''>
        <div className="p-16">
          <div className="p-8 bg-white shadow mt-24">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-gray-700 text-xl">8:00-16:00</p>
                  <p className="text-gray-400">Working Time</p>
                </div>
                <div>
                  <p className="font-bold text-gray-700 text-xl">{userData?.projectAllocated.length}</p>
                  <p className="text-gray-400">Projects</p>
                </div>
                <div>
                  <p className="font-bold text-red-700 text-xl">89</p>
                  <p className="text-gray-400">Escalation</p>
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <Link to={'/dashbaord/editprofile'}
                  className="cursor-pointer text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-10 h-6 mr-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                  <span>Edit</span>
                </Link>

                <button
                  className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Message
                </button>
              </div>
            </div>

            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">{userData?.name} <span className="font-light text-gray-500">27</span></h1>
              <p className="font-light text-gray-600 mt-1">Bucharest, Romania</p>
              <p className="font-light text-gray-600 mt-1">{userData?.email}</p>

              <p className="mt-8 text-gray-500">{userData?.designation}</p>
              <p className=" text-gray-500 font-bold">Alam Technologies</p>

            </div>

            <div className="mt-12 flex flex-col justify-center">
              <p className="text-gray-600 text-center font-light lg:px-16">{userData?.description ? userData?.description : 'No Discription Provided'}</p>
              {/* <button
              className="text-indigo-500 py-2 px-4  font-medium mt-4"
            >
              Show more
            </button> */}
            </div>

          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Profile