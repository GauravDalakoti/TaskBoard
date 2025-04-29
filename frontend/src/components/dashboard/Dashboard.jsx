import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [loading, setLoading] = useState(false)
    const [tasks, setTasks] = useState([])

    const [filter, setFilter] = useState('All');


    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Active') return task.status !== 'complete';
        if (filter === 'Completed') return task.status === 'complete';
        return true;
    });


    const navigate = useNavigate()

    const completedTasks = tasks.filter(task => task.status === 'complete').length;
    const pendingTasks = tasks.length - completedTasks;
    const totalTasks = tasks.length

    const handleComplete = async (e, id) => {

        e.preventDefault()

        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/update-task-status`, {

                method: "POST",
                credentials: "include",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })

            })

            if (response.ok) {

                setLoading(false)
                const res = await response.json()
                console.log(res);
                toast.success("Task Completed Successfully")
                setTasks(tasks.map(task => task.id === id ? { ...task, status: 'complete' } : task));
            }

        } catch (error) {
            setLoading(false)
            console.log("error while updating the tasks", error)
        }

    };

    const handleDelete = async (id) => {


        try {

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/delete-task`, {

                method: "POST",
                credentials: "include",
                headers: {

                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id })

            })

            if (response.ok) {

                setLoading(false)
                const res = await response.json()
                console.log(res);
                toast.success("Task Deleted Successfully")
                setTasks(tasks.filter(task => task.id !== id));

            }

        } catch (error) {
            setLoading(false)
            console.log("error while deleting the tasks", error)
        }

    };

    useEffect(() => {

        (async () => {

            setLoading(true)
            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/get-all-tasks`, {

                    method: "GET",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },

                })

                if (response.ok) {

                    setLoading(false)
                    const res = await response.json()
                    setTasks(res.data)
                    console.log(res);
                   
                }

            } catch (error) {
                setLoading(false)
                console.log("error while fetching the tasks", error)
            }
        })()

    }, [])

    const handleEdit = (id) => {

        navigate(`/edit-task/${id}`)

    }

    const handleNewTask=()=>{

        navigate('/add-task')
    }


    return (
        <div className='min-h-[87vh] '>

            {
                loading ? <div role="status" className='flex justify-center py-10 text-center w-[100vw] '>
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                    :
                    tasks.length == 0 ? <div className='flex items-center justify-center'>
                        <div className='font-bold text-4xl py-10'>No Tasks Found</div>
                    </div>
                        :
                        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 p-8">
                            <div className="max-w-7xl mx-auto">

                                <div className="text-center mb-8">
                                    <h1 className="text-4xl font-bold text-gray-900">Task Dashboard</h1>

                                </div>

                               <div className='flex items-center justify-between max-lg:flex-col max-lg:gap-2'>
                                <div className="flex space-x-4 mb-6">
                            
                                    <button
                                        onClick={() => setFilter('All')}
                                        className={`px-4 py-2 rounded-lg font-semibold ${filter === 'All' ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilter('Active')}
                                        className={`px-4 py-2 rounded-lg font-semibold ${filter === 'Active' ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
                                        Active
                                    </button>
                                    <button
                                        onClick={() => setFilter('Completed')}
                                        className={`px-4 py-2 rounded-lg font-semibold ${filter === 'Completed' ? 'bg-indigo-500 text-white' : 'bg-gray-200'
                                            }`}
                                    >
                                        Completed
                                    </button>
                                </div>

                                <div className='max-lg:mb-4'>
                                    <button onClick={handleNewTask} className='bg-black hover:scale-105 transition-all duration-500 text-white px-4 py-2 rounded-lg font-semibold'>add new task</button>
                                </div>

                                </div>
                                <div className="flex justify-between mb-6 text-lg font-medium text-gray-700">
                                    <div className='font-semibold'>Total Tasks: <span className="text-green-600">{totalTasks}</span></div>
                                    <div className='font-semibold'>Completed Tasks: <span className="text-green-600">{completedTasks}</span></div>
                                    <div className='font-semibold'>Pending Tasks: <span className="text-yellow-600">{pendingTasks}</span></div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ${task.status === 'complete' ? 'border-l-4 border-green-500' : 'border-l-4 border-gray-300'}`}
                                        >
                                            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{task.title}</h3>
                                            <p className="text-gray-600 mb-4">{task.description}</p>
                                            <div className="flex justify-between items-center mb-4">

                                                <div className='flex flex-col'>

                                                    <span className="text-sm text-gray-500">Created Date: </span>
                                                    <span className="text-sm text-gray-500"><strong>{task.createdAt?.slice(0, 10)}</strong></span>
                                                </div>
                                                <div className='flex flex-col'>

                                                    <span className="text-sm text-gray-500">Priority: </span>
                                                    <span className="text-sm text-gray-500"><strong>{task.priority}</strong></span>
                                                </div>

                                                <div className='flex flex-col'>

                                                    <span className={`text-sm ${task.status === 'complete' ? 'text-green-600' : 'text-gray-500'}`}>Status:</span>
                                                    <span className="text-sm text-gray-500"> <strong>{task.status}</strong></span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 justify-between mt-4">
                                                {task.status === 'incomplete' && (
                                                    <button onClick={(e) => handleComplete(e, task.id)} className="bg-gradient-to-r hover:scale-105 transition-all duration-500 text-sm w-[13.5vw] from-indigo-600 to-indigo-700 text-white py-2 px-2 rounded-lg shadow-md max-lg:w-[46vw] hover:bg-indigo-800">
                                                        Mark as Complete
                                                    </button>
                                                )}


                                                {task.status === 'complete' && (
                                                    <button className="bg-gradient-to-r w-[13.5vw] max-lg:w-[46vw] text-sm from-green-600 to-green-700 text-white py-2 px-3 rounded-lg shadow-md cursor-not-allowed transition duration-300">
                                                        Completed
                                                    </button>
                                                )}
                                                <div className='flex gap-2'>
                                                    <button onClick={(e) => handleEdit(task.id)} className="bg-gradient-to-r hover:scale-105 transition-all duration-500 from-blue-600 to-blue-700 text-sm text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 ">
                                                        Edit
                                                    </button>
                                                    <button onClick={(e) => handleDelete(task.id)} className="bg-gradient-to-r hover:scale-105 transition-all duration-500 from-red-600 to-red-700 text-sm text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-800 ">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

            }

        </div>
    )
}

export default Dashboard