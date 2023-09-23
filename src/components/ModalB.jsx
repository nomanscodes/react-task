import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalBClose } from '../../feature/modal/modalBslice';
import { modalAOpen } from '../../feature/modal/modalASlice';
import { modalCOpen } from '../../feature/modal/modalCslice';


const ModalB = () => {
    const modalBState = useSelector((state) => state?.modalBslice);
    const dispatch = useDispatch();

    const modalControl = () => {
        dispatch(modalBClose())
        dispatch(modalAOpen())
    }

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [usData, setUsData] = useState()

    const loadAllUSData = async (url) => {
        try {

            const response = await fetch(url);
            const newData = await response.json();
            setData((prevData) => [...prevData, ...newData.results]);

            // console.log("newData", newData);

            if (newData.next) {
                await loadAllUSData(newData.next);
            } else {
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };


    useEffect(() => {
        const initialDataFetch = async () => {
            try {
                setIsLoading(true);
                await loadAllUSData('https://contact.mediusware.com/api/contacts/');
            } catch (error) {
                console.error('Error fetching initial data:', error);
                setIsLoading(false);
            }
        };

        initialDataFetch();
    }, []);

    useEffect(() => {
        const usContacts = data.filter(item => item?.country?.id === 2)
        setUsData(usContacts)
    }, [data])


    const modalC_Controler = (item) => {
        dispatch(modalBClose())
        dispatch(modalCOpen())
        // console.log("id", item);
        localStorage.setItem("single_contact", JSON.stringify(item))
    }


    return (
        <div className={`m-modal ${modalBState ? '' : 'd-none'} `}>
            <div className="m-modal__content">
                <div className="m-modal__header">
                    <h4 className="modal-title">Modal B (Only US Contacts)</h4>
                    <div className="">
                        <input
                            type="email"
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="name@example.com"
                        />
                    </div>
                    <button onClick={() => dispatch(modalBClose())} type="button" className="m-modal__cls-btn">
                        Close
                    </button>
                </div>
                <div className="m-modal__body">
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Contact</th>
                                <th scope="col">Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usData?.map((item, index) => (
                                <tr onClick={() => modalC_Controler(item)} key={index}>
                                    <td scope="col">{item?.phone}</td>
                                    <td scope="col">{item?.country?.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="m-modal__footer">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                        <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                            Only Even
                        </label>
                    </div>
                    <div className="d-flex align-content-center gap-3">
                        <button  onClick={() => modalControl()} type="button" style={{color:"#ff7f50"}} className="btn">
                            All Contacts
                        </button>
                        <button  type="button" style={{color:"#ff7f50"}} className="btn">US Contacts</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalB;
