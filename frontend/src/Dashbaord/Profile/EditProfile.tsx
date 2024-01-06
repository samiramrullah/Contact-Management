import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const EditProfile = () => {
    const [userData, setUserData] = useState<any>()
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevState: any) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_KEY}users/updateuserdetails`, userData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                toast.success(res?.data.message)
            })
            .catch((err: any) => {
                toast.error(err?.response?.data.message, {
                    position: 'top-right'
                })
            })
    }
    return (
        <>
            <section className="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md0 content-center md:mt-36 mt-0">
                <h2 className="text-lg font-semibold text-gray-700 capitalize ">Update Profile</h2>
                <form onSubmit={onSubmitHandler}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700" >Name *</label>
                            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
                                type='text'
                                name='name'
                                required
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700" >Email *</label>
                            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
                                type='email'
                                name='email'
                                onChange={onChangeHandler}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700" >Contact Number</label>
                            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
                                type='text'
                                name='phNumber'
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700" >Description</label>
                            <input className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md "
                                type='text'
                                name='description'
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type='submit' className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                    </div>
                </form>
            </section>
            <ToastContainer />
        </>
    )
}

export default EditProfile