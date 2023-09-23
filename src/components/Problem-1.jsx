import React, { useState, useEffect } from 'react';
import { shortedTasks } from '../../utils';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [finalTask, setFinalTask] = useState([])

    const [inputsData, setInputsData] = useState({
        name: '',
        status: '',
    });
    const [taskStore, setTaskStore] = useState([])

    const getInputData = (e) => {
        const { name, value } = e.target;

        setInputsData({
            ...inputsData,
            [name]: value,
        });
    }

    useEffect(() => {
        const storedTask = JSON.parse(localStorage.getItem('tasks'));
        if (storedTask) {
            setTaskStore(storedTask);
            setFinalTask(shortedTasks(storedTask))
        }
    }, []);


    const saveTaskToLocalStorage = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputsData.name === '' || inputsData.status === '') {
            alert("All Fields Are Required");
        } else if (inputsData.status !== "active" && inputsData.status !== "completed" && inputsData.status !== "pending") {
            alert("Status must provide any of these three keywords: pending, active, or completed");
        } else {
            const newTask = {
                name: inputsData.name,
                status: inputsData.status
            };
            const updateTaskEverySubmit = [...taskStore, newTask];

            saveTaskToLocalStorage(updateTaskEverySubmit);
            setInputsData({
                name: '',
                status: ''
            });
            setTaskStore(updateTaskEverySubmit);
            setFinalTask(shortedTasks(updateTaskEverySubmit))
            setShow('all')
        }
    };


    const handleClick = (val) => {
        setShow(val);
        
        if (val === 'active') {
            const activeTask = taskStore.filter((item) => item?.status === 'active')
            setFinalTask(activeTask)
        }
        if (val === 'completed') {
            const completedTask = taskStore.filter((item) => item?.status === 'completed')
            setFinalTask(completedTask)
        }
        if (val === 'all') {
            setFinalTask(shortedTasks(taskStore))
        }

    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input value={inputsData.name} name='name' onChange={getInputData} type="text" className="form-control" placeholder="Name" />
                        </div>
                        <div className="col-auto">
                            <input value={inputsData.status} name='status' onChange={getInputData} type="text" className="form-control" placeholder="Status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalTask.map((item, index) =>
                                <tr key={index}>
                                    <td>{item?.name}</td>
                                    <td>{item?.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;