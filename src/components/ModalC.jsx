import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modalBOpen } from '../../feature/modal/modalBslice';
import { modalAOpen } from '../../feature/modal/modalASlice';
import { modalCClose } from '../../feature/modal/modalCslice';



const ModalC = () => {

    const modalCState = useSelector((state) => state?.modalCslice);
    const dispatch = useDispatch();

    const [contact, setContact] = useState()

    useEffect(() => {

        const storedContact = localStorage.getItem("single_contact")
        setContact(JSON.parse(storedContact))
    }, [modalCState])

    console.log("contact", contact);

    const modalAControl = () => {
        dispatch(modalCClose())
        dispatch(modalAOpen())
    }
    const modalBControl = () => {
        dispatch(modalCClose())
        dispatch(modalBOpen())
    }

    return (
        <div className={`m-modal  ${modalCState ? `` : `d-none`}`}>
            <div className='m-modal__content'>
                <div className='m-modal__header'>
                    <h4 className='modal-title'>Modal C</h4>
                    <button onClick={() => dispatch(modalCClose())} type="button" class="m-modal__cls-btn">
                        Close
                    </button>
                </div>
                <div className='m-modal__body'>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Contact</th>
                                <th scope="col">Country</th>
                                <th scope="col">Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="col">{contact?.phone}</td>
                                <td scope="col">{contact?.country?.name}</td>
                                <td scope="col">{contact?.id}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='m-modal__footer'>
                    <div className="">
                    </div>
                    <div className='d-flex align-content-center gap-3'>
                        <button onClick={() => modalAControl()} type="button" style={{color:"#46139f"}} class="btn">All Contacts</button>
                        <button onClick={() => modalBControl()} type="button" style={{color:"#ff7f50"}} class="btn">US Contacts</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalC