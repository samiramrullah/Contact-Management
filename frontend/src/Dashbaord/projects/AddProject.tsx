import React, { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';


interface User {
  _id: String;
  name: String;
  email: String;
  projectAllocated: Array<any>;
  managerComment: Array<any>;
  description: String;
  phNumber: String;
};

interface projectInterface {
  preventDefault(): unknown;
  name: String;
  startDate: Date;
  budgetAllocated: String;
  state: String;
  description: String;
}
const AddProject = () => {
  const [allusers, setAllUsers] = useState<User[]>([]);
  const [projectData, setProjectData] = useState<projectInterface>()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_KEY}users/getallusers`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => {
        setAllUsers(res?.data?.users)
      })
      .catch((err: any) => {
        toast.error(err?.response?.data.message, {
          position: 'top-right'
        })
      })
  }, [])

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_KEY}projects/addproject`, projectData)
      .then((res) => {
        toast.success(res?.data.message)
      })
      .catch((err: any) => {
        toast.error(err?.response?.data.message, {
          position: 'top-right'
        })
      })
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <section className="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 capitalize ">Create Project</h2>

      <form onSubmit={onSubmitHandler}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-gray-700 " >Name *</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
              name='name'
              type='text'
              required
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="text-gray-700 " >Start Date *</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
              type='date'
              required
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="text-gray-700 " >Budget Allocated</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
              name='budgetAllocated'
              type='text'
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="text-gray-700 " >State</label>
            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
              name='state'
              type='text'
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="text-gray-700 " >Resources</label>
            <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
              name='resources'
              onChange={onChangeHandler}
            >
              {allusers.map((user) => (
                <option>{user?.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-700 " >Description</label>
            <textarea className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
              name='description'
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
      </form>
      <ToastContainer />
    </section>
  )
}

export default AddProject