import React, { useEffect, useState } from 'react'
import Navbar from '../Home/Navbar'
import ScrollToTop from '../atoms/scrollTotop'
import Preloader from '../atoms/Preloader';
import Herosection from '../Home/Herosection';
import AllTournaments from './AllTournaments';
import Participents from './Participents';

export default function Tournament() {
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
      <AllTournaments/>
      <Participents/>
    </>
  )
}
