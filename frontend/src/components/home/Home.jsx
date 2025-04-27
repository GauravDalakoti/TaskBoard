import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const [task, setTask] = useState({ title: "", description: "", status: "incomplete", priority: "medium" })

    const handleChange = (e) => {

        setTask(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!token) {

            toast.error("user not login")
            navigate("/sign-in")
        }

        else {

            setLoading(true)
            try {

                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/tasks/add-new-task`, {

                    method: "POST",
                    credentials: "include",
                    headers: {

                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
                })

                if (response.ok) {

                    setLoading(false)
                    const res = await response.json()
                    toast.success("Task added Successfully")
                }

            } catch (error) {
                setLoading(false)
                console.log("error while adding the task", error)
            }
        }
    }

    return (
        <div className='min-h-[87vh]'>
            <section className="relative flex-1 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-12 pb-6 bg-gradient-to-br from-indigo-50 to-white overflow-hidden">

                <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

                <div className="z-10 max-w-xl">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                        Master Your Tasks<br />With Ease
                    </h1>
                    <p className="text-gray-600 text-lg mb-8">
                        Stay organized, prioritize your goals, and achieve more every day with TaskNest.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#add-task" className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-semibold hover:opacity-90 transition">
                            Get Started
                        </a>
                        <a href="/" className="px-6 py-3 border border-indigo-500 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition">
                            Learn More
                        </a>
                    </div>
                </div>

                <div className="z-10 mt-12 md:mt-0">
                    <img
                        src={assets.home}
                        alt="Task Management"
                        className="w-full max-w-xl md:max-w-2xl "
                    />
                </div>
            </section>

            <section id="add-task" className="px-6 md:px-20 py-12 bg-white">
                <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Add a New Task</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="col-span-2">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={task.title}
                                onChange={handleChange}
                                placeholder="Enter task title"
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                        </div>


                        <div className="col-span-2">
                            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                            <textarea
                                rows="3"
                                id="description"
                                value={task.description}
                                onChange={handleChange}
                                placeholder="Enter task description"
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                        </div>


                        <div>
                            <label htmlFor="status" className="block text-gray-700 font-semibold mb-2">Status</label>
                            <select
                                id="status"
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={task.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>


                        <div>
                            <label htmlFor="priority" className="block text-gray-700 font-semibold mb-2">Priority</label>
                            <select
                                id="priority"
                                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                value={task.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {
                            loading ? <div className="col-span-2">
                                <button
                                    type="button"
                                    disabled
                                    className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition flex justify-center items-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        role="status"
                                        className="inline w-5 h-5 mr-3 text-white animate-spin"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="#E5E7EB"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Loading...
                                </button>
                            </div>


                                :
                                <div className="col-span-2">
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
                                    >
                                        Add Task
                                    </button>
                                </div>
                        }
                    </form>
                </div>
            </section>

            <section class="pt-2 bg-gray-50 sm:pt-2 pb-8">
                <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div class="text-center">
                        <p class="max-w-4xl mx-auto mb-4 text-4xl font-bold leading-tight text-gray-900 sm:leading-tight sm:text-5xl lg:text-6xl lg:leading-tight">
                            Organize Your Work with Our Smart Task Manager
                        </p>
                        <h1 class="max-w-2xl mx-auto px-6 text-lg text-gray-600 font-inter">
                            Create, manage, and track your tasks easily. Stay focused and boost your productivity with real-time updates and a sleek dashboard.
                        </h1>
                        <div class="px-8 sm:items-start sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-9">
                            <a href="#add-task"
                                class="mb-3 sm:mb-0 inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 border-2 border-transparent sm:w-auto rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                                role="button">
                                Get Started
                            </a>
                            <a href="/dashboard"
                                class="inline-flex items-center justify-center w-full px-8 py-3 text-lg font-bold text-gray-900 hover:text-white transition-all duration-200 bg-gray-100 border-2 border-gray-900 sm:w-auto rounded-xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button">
                                View Dashboard
                            </a>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Home

