import React, { useState, useEffect, useRef } from 'react';

function Test() {
    const [data, setData] = useState([]);
    const [nextPage, setNextPage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollContainerRef = useRef(null);

    console.log("nextPage", data);


    const loadNextPage = async () => {
        if (nextPage && !isLoading) {
            setIsLoading(true);
            console.log("loaded next data");
            try {
                const response = await fetch(nextPage);
                const newData = await response.json();
                setData((prevData) => [...prevData, ...newData.results]);
                setNextPage(newData.next);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false);
        } if (!nextPage) {
           console.log("not next page"); 
        }
    };

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
            if (scrollTop + clientHeight >= scrollHeight - 1) {
                loadNextPage();
                console.log("loaded hoitace");
                console.log("ok", nextPage);
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
            } catch (error) {
                console.error('Error fetching initial data:', error);
                console.log("not set next page");

            }
        };

        initialDataFetch();
    }, []);


    return (
        <div
            ref={scrollContainerRef}
            style={{
                height: '400px',
                overflow: 'auto',
            }}
        >
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.phone}</li>
                ))}
            </ul>
            {isLoading && <p>Loading...</p>}
        </div>
    );
}

export default Test;
