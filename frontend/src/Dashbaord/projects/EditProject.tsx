import { ChangeEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import { useParams } from "react-router-dom"
import { projectInterface } from './ViewProjects'
const EditProject = () => {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState<projectInterface>({
        _id: '',
        budgetAllocated: 0,
        name: '',
        resources: [
            {
                _id: '',
                name: '',
                email: '',
                designation: ''
            },
        ],
        startDate: '',
        state: '',
        __v: 0,
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProjectDetails((prevState: projectInterface) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}projects/getprojectbyid/${id}`)
            .then((res: any) => {
                setProjectDetails(res.data.project)
            })
            .catch((err: any) => {
                toast.error(err?.response?.data.message, {
                    position: 'top-right'
                })
            })
    }, [id])
    return (
        <>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
                <h2 className="text-lg font-semibold text-gray-700 capitalize ">Update Project</h2>
                <form>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700" >Name</label>
                            <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                name="name"
                                value={projectDetails?.name ? projectDetails?.name.toString() : ''}
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700" >Start Date</label>
                            <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                value={projectDetails?.startDate ? projectDetails?.startDate.toString() : ''}
                                name="startDate"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700" >Username</label>
                            <input type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                name="budgetAllocated"
                                onChange={onChangeHandler}
                                value={projectDetails?.budgetAllocated ? projectDetails?.budgetAllocated.toString() : ''}
                            />
                        </div>
                        <div>
                            <label className="text-gray-700" >State</label>
                            <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                name="state"
                                onChange={onChangeHandler}
                                value={projectDetails?.state ? projectDetails?.state.toString() : ''}
                            />
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button>
                        </div>
                    </div>
                </form>

                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
                    <h2 className="text-lg font-semibold text-gray-700 capitalize ">Resources</h2>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Designation
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {projectDetails?.resources?.map((resource) => (
                                    <tr className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {resource?.name ? resource.name : 'Not Mentioned'}
                                        </th>
                                        <td className="px-6 py-4 ">
                                            {resource?.email ? resource?.email : 'Not Mentioned'}
                                        </td>
                                        <td className="px-6 py-4 uppercase">
                                            {resource?.designation ? resource?.designation : 'Not Mentioned'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </section >

            </section>

            <ToastContainer />
        </>
    )
}

export default EditProject