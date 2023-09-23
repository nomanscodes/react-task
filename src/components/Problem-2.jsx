import React, { useEffect, useState } from 'react';
import ModalA from './ModalA';
import ModalB from './ModalB';
import ModalC from './ModalC';
import { useDispatch, useSelector } from 'react-redux';
import { modalAOpen } from '../../feature/modal/modalASlice';
import { modalBOpen } from '../../feature/modal/modalBslice'
import { useNavigate } from 'react-router-dom';


const Problem2 = () => {

    const dispatch = useDispatch()

    return (
        <>
            <ModalA />
            <ModalB />
            <ModalC />
            <div className="container relative">
                <div className="row justify-content-center mt-5">
                    <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-lg btn-outline-primary" onClick={() => dispatch(modalAOpen())} type="button" >All Contacts</button>
                        <button className="btn btn-lg btn-outline-warning" onClick={() => dispatch(modalBOpen())} type="button" >US Contacts</button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Problem2;