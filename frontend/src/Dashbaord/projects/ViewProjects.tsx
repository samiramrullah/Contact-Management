import axios from 'axios'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import ProjectCard from '../../utils/cards/Projectcard'

export interface projectInterface {
    _id: string;
    budgetAllocated: number;
    name: string;
    resources: Array<{
        name: string;
        email: string;
        _id: string;
    }>;
    startDate: string;
    state: string;
    __v: number;
}

const ViewProjects = () => {
    const [allProjects, setAllProjects] = useState<Array<projectInterface>>()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}projects/getallprojects`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res: any) => {
                if (res?.data.status) {
                    toast.success(res?.data.message, {
                        position: 'top-right'
                    });
                    setAllProjects(res.data.products)
                }
                else toast.error('Error in getting projects', {
                    position: 'top-right'
                })

            })
            .catch((err: any) => {
                toast.success(err?.data.message, {
                    position: 'top-right'
                });
            })
    }, [])
    return (
        <div className='grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3'>
            {allProjects?.map((project: projectInterface) => (
                <ProjectCard _id={project._id} name={project.name}
                    startDate={project.startDate} state={project.state}
                    budgetAllocated={project.budgetAllocated} resources={[]} __v={project.__v} />
            ))}
            <ToastContainer />
        </div>
    )
}

export default ViewProjects