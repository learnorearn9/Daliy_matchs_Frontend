import React, { useEffect, useState } from 'react'
import ScrollToTop from '../atoms/scrollTotop'
import Navbar from '../Home/Navbar'
import Preloader from '../atoms/Preloader';
import Herosection from '../Home/Herosection';

export default function Profile() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      window.scrollTo(0, 0);
    }, []);
  
    if (loading) {
      return <Preloader />;
    }
  return (
    <>
      <ScrollToTop/>
      <Navbar/>
      <Herosection/>
    </>
  )
}
