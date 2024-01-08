import { Link } from 'react-router-dom'
import { projectInterface } from '../../Dashbaord/projects/ViewProjects'
const ProjectCard = (props: projectInterface) => {
    return (
        <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <img className="object-cover object-center w-full h-56" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" alt="avatar" />

            <div className="flex items-center px-6 py-3 bg-gray-900">
                <svg aria-label="headphones icon" className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21C15.8954 21 15 20.1046 15 19V15C15 13.8954 15.8954 13 17 13H19V12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12V13H7C8.10457 13 9 13.8954 9 15V19C9 20.1046 8.10457 21 7 21H3V12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12V21H17ZM19 15H17V19H19V15ZM7 15H5V19H7V15Z" />
                </svg>

                <h1 className="mx-3 text-lg font-semibold text-white">{props.state}</h1>
            </div>

            <div className="px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{props?.name}</h1>

                <p className="py-2 text-gray-700 dark:text-gray-400">{props?.description}</p>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <div className="flex w-full">
                        <div className="flex-1  px-2 text-sm">
                            Budget Allocated
                        </div>
                        <div className="flex-1  text-center  font-bold">
                            Rs. {props?.budgetAllocated}
                        </div>
                    </div>
                </div>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <div className="flex w-full">
                        <div className="flex-1  px-2 text-sm">
                            Start Date
                        </div>
                        <div className="flex-1  text-center  font-bold">
                            {props?.startDate}
                        </div>
                    </div>
                </div>

                <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <div className="flex w-full">
                        <div className="flex-1  px-2 text-sm">
                            Resources
                        </div>
                        <div className="flex-1  text-center  font-bold">
                            {props?.resources?.length.toString()}
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <div className="m-5">
                        <Link to={`/dashbaord/updateproject/${props._id}`} >
                            <button className="flex p-2.5 bg-slate-700 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard