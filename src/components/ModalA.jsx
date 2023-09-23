import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { modalAClose } from '../../feature/modal/modalASlice'
import { modalBOpen } from '../../feature/modal/modalBslice'
import { modalCOpen } from '../../feature/modal/modalCslice'


const ModalA = () => {

    const modalAState = useSelector(state => state.modalAslice)
    const dispatch = useDispatch()

    const modalControl = () => {
        dispatch(modalBOpen())
        dispatch(modalAClose())
    }

    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollContainerRef = useRef(null);

    const loadNextPage = async () => {
        if (nextPage && !isLoading) {
            setIsLoading(true);
            // console.log("loaded next data");
            try {
                const response = await fetch(nextPage);
                const newData = await response.json();
                setData((prevData) => [...prevData, ...newData.results]);
                setNextPage(newData.next);
            } catch (error) {
                // console.error('Error fetching data:', error);
            }
            setIsLoading(false);
        } if (!nextPage) {
            // console.log("not next page");
        }
    };

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                loadNextPage();
                // console.log("loaded hoitace");
                // console.log("ok", nextPage);
            }
        }
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, [nextPage]);


    useEffect(() => {
        const initialDataFetch = async () => {
            try {
                const response = await fetch('https://contact.mediusware.com/api/contacts/');
                const initialData = await response.json();
                setData(initialData.results);
                setNextPage(initialData.next);
                // console.log("initialData", initialData);
            } catch (error) {
                console.error('Error fetching initial data:', error);
                // console.log("not set next page");
            }
        };

        initialDataFetch();
    }, []);


    const modalC_Controler = (item) => {
        dispatch(modalAClose())
        dispatch(modalCOpen())
        // console.log("id", item);
        localStorage.setItem("single_contact", JSON.stringify(item))
    }


    return (
        <div className={`m-modal ${modalAState ? `` : `d-none`} `}>
            <div className='m-modal__content'>
                <div className='m-modal__header'>
                    <h4 className='modal-title'>Modal A (All Contacts)</h4>
                    <div className="">
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="search contract" />
                    </div>
                    <button onClick={() => dispatch(modalAClose())} type="button" class="m-modal__cls-btn">
                        Close
                    </button>
                </div>
                <div ref={scrollContainerRef} className='m-modal__body'>
                    <table className="table table-striped ">
                        <thead>

                            <tr >
                                <th scope="col">Contact</th>
                                <th scope="col">Country</th>
                            </tr>

                        </thead>
                        <tbody>
                            {data.map((item) =>
                                <tr onClick={() => modalC_Controler(item)} key={item?.id}>
                                    <td scope="col">{item?.phone}</td>
                                    <td scope="col">{item?.country?.name}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='m-modal__footer'>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
                        <label className="form-check-label" for="flexCheckIndeterminate">
                            Only Even
                        </label>
                    </div>
                    <div className='d-flex align-content-center gap-3'>
                        <button style={{ color: '#46139f' }} type="button" class="btn">All Contacts</button>
                        <button style={{ color: '#46139f' }} onClick={() => modalControl()} type="button" class="btn ">US Contacts</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalA