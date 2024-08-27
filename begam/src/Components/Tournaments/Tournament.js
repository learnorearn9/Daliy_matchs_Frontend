import React, { useEffect, useState } from 'react';
import Navbar from '../Home/Navbar';
import ScrollToTop from '../atoms/scrollTotop';
import Preloader from '../atoms/Preloader';
import AllTournaments from './AllTournaments';
import Spinner from '../atoms/Spinner';

export default function Tournament() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a loading delay
        setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust the time as needed
        window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, []);

    if (loading) {
        return <Spinner />; // Show the Preloader while loading
    }

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <AllTournaments />
        </>
    );
}
