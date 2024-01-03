import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Auth = () => {
    const [formData, setFormData] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();

    const onChangeHandler = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const loginHandler = (e: any) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_KEY}users/auth/login`, formData)
            .then((res) => {
                toast.success(res?.data.message)
                localStorage.setItem('token',res?.data.token)
                navigate('/dashbaord')
            })
            .catch((err: any) => {
                toast.error(err?.response?.data.message, {
                    position: 'top-right'
                })
            })
    }
    const signUpHandler = (e: any) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_KEY}users/auth/register`, formData)
            .then((res) => {
                if (res.data.status) {
                    toast.success(res.data.message, {
                        position: 'top-right',
                    })
                    navigate('/auth/:login')
                }
                else
                {
                    toast.warning(res.data.message,{
                        position:'top-right'
                    })
                }
            })
            .catch((err: any) => {
                toast.error(err.response.data.message, {
                    position: 'top-right'
                })
            })
    }

    if (id === "login") {
        return (
            <>
                <section className=" font-poppins">
                    <div className="flex items-center justify-center h-screen mx-auto max-w-7xl">
                        <div className="flex-1">
                            <div className="flex flex-wrap ">
                                <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2 ">
                                    <div className="absolute inset-0 z-10 bg-gray-900 opacity-40"></div>
                                    <img className="absolute inset-0 z-0 object-cover w-full h-full ml-auto"
                                        src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" alt='img' />
                                    <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center ">
                                        <h2 className="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300 ">
                                            Welcome to our community and join with us</h2>
                                        <div className="max-w-lg mx-auto mb-6">
                                            <p className="pt-6 font-medium text-gray-300 dark:text-gray-300">
                                                lorem ipsum dor amet sidcuscd andih wkoidus iusoyions hejitywa qopasation dummy text
                                                ipsum
                                            </p>
                                        </div>
                                        <Link to={'/auth/signup'}
                                            className="inline-block px-6 py-2 font-medium bg-green-600 text-gray-50 dark:text-gray-300">
                                            Join now</Link>
                                    </div>
                                </div>
                                <div className="w-full py-6 bg-gray-100 shadow-md lg:py-7 lg:w-1/2 dark:bg-gray-900">
                                    <div className="max-w-md mx-auto">
                                        <div className="px-4 my-7 ">
                                            <div className="mb-7">
                                                <span
                                                    className="flex items-center justify-center w-20 h-20 mx-auto text-gray-900 bg-green-600 rounded-lg dark:bg-green-600 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                        fill="currentColor" className="text-gray-200 bi bi-person-circle"
                                                        viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                                                        <path fill-rule="evenodd"
                                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
                                                Login your Account</h2>
                                            <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
                                                Please fill your credentials</p>
                                            <form onSubmit={loginHandler}>
                                                <div className="mb-4">
                                                    <input type="text"
                                                        className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                                        placeholder="Your email" required
                                                        name='email'
                                                        onChange={onChangeHandler}
                                                    />
                                                </div>
                                                <div className="relative flex items-center mb-4">
                                                    <input type="password"
                                                        className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                                        placeholder=" password" required
                                                        name='password'
                                                        onChange={onChangeHandler}
                                                    />
                                                </div>
                                                {/* <div className="relative flex items-center mb-4">
                                                <input type="password"
                                                    className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                                    placeholder="Repeat password" required />
                                            </div> */}
                                                {/* <div className="mb-4 text-right ">
                                                <a href="1"
                                                    className="text-sm font-semibold text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                                                    forgot password?</a>
                                            </div> */}

                                                <button
                                                    className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200 "
                                                    type="submit">LOGIN</button>
                                                <p className="text-sm text-gray-700 dark:text-gray-400"> Need an account?
                                                    <Link to={'/auth/signup'}
                                                        className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                                                        Create an account</Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <ToastContainer />
            </>
        )
    }
    else {
        return (
            <>
                <section className=" font-poppins">
                    <div className="flex items-center justify-center h-screen mx-auto max-w-7xl">
                        <div className="flex-1">
                            <div className="flex flex-wrap ">
                                <div className="relative items-center justify-center hidden w-full lg:flex lg:w-1/2 ">
                                    <div className="absolute inset-0 z-10 bg-gray-900 opacity-40"></div>
                                    <img className="absolute inset-0 z-0 object-cover w-full h-full ml-auto"
                                        src="https://images.pexels.com/photos/7321/sea-water-ocean-horizon.jpg?auto=compress&cs=tinysrgb&h=750&w=1260" alt='img' />
                                    <div className="top-0 z-10 max-w-xl mx-auto mb-12 text-center ">
                                        <h2 className="mb-4 text-4xl font-bold text-gray-100 dark:text-gray-300 ">
                                            Welcome to our community and join with us</h2>
                                        <div className="max-w-lg mx-auto mb-6">
                                            <p className="pt-6 font-medium text-gray-300 dark:text-gray-300">
                                                lorem ipsum dor amet sidcuscd andih wkoidus iusoyions hejitywa qopasation dummy text
                                                ipsum
                                            </p>
                                        </div>
                                        <a href="1"
                                            className="inline-block px-6 py-2 font-medium bg-green-600 text-gray-50 dark:text-gray-300">
                                            Join now</a>
                                    </div>
                                </div>
                                <div className="w-full py-6 bg-gray-100 shadow-md lg:py-7 lg:w-1/2 dark:bg-gray-900">
                                    <div className="max-w-md mx-auto">
                                        <div className="px-4 my-7 ">
                                            <div className="mb-7">
                                                <span
                                                    className="flex items-center justify-center w-20 h-20 mx-auto text-gray-900 bg-green-600 rounded-lg dark:bg-green-600 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                        fill="currentColor" className="text-gray-200 bi bi-person-circle"
                                                        viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                                                        <path fill-rule="evenodd"
                                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <h2 className="mb-3 text-2xl font-bold text-center text-gray-800 dark:text-gray-400">
                                                Sign Up for Account</h2>
                                            <p className="text-base text-center text-gray-500 mb-7 dark:text-gray-400">
                                                Please fill your credentials</p>
                                            <form onSubmit={signUpHandler}>
                                                <div className="mb-4">
                                                    <input type="text"
                                                        className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                                        placeholder="Name" required
                                                        name='name'
                                                        onChange={onChangeHandler}
                                                    />
                                                </div>
                                                <div className="relative flex items-center mb-4">
                                                    <input type="email"
                                                        className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                                        placeholder="email" required
                                                        name='email'
                                                        onChange={onChangeHandler}
                                                    />
                                                </div>
                                                <div className="relative flex items-center mb-4">
                                                    <input type="password"
                                                        className="w-full py-4 rounded-lg px-7 dark:text-gray-300 dark:bg-gray-800"
                                                        placeholder="password" required
                                                        name='password'
                                                        onChange={onChangeHandler}
                                                    />
                                                </div>
                                                {/* <div className="mb-4 text-right ">
                                                <a href="1"
                                                    className="text-sm font-semibold text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                                                    forgot password?</a>
                                            </div> */}
                                                <button
                                                    className="w-full py-4 mb-4 font-semibold text-gray-200 bg-green-600 rounded-lg px-7 dark:text-gray-300 dark:bg-green-600 hover:text-blue-200 "
                                                    type="submit">Sign Up</button>
                                                <p className="text-sm text-gray-700 dark:text-gray-400"> Already have an Account?
                                                    <Link to={'/auth/login'}
                                                        className="text-sm font-semibold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">
                                                        Login</Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ToastContainer />
            </>
        )
    }
}

export default Auth