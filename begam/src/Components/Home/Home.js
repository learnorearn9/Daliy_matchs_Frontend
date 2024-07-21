import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Herosection from "./Herosection";
import Games from "./Games";
import Work from "./Work";
import Tournaments from "./Tournaments";
import Topthree from "./Topthree";
import Features from "./Features";
import Testimonial from "./Testimonal";
import Statistics from "./Statistics";
import Footer from "../Footer/footer";
import ScrollToTop from "../atoms/scrollTotop";
import Preloader from "../atoms/Preloader";
import UserTournaments from "./UserTournaments";
import ResultTable from "./ResultTable";

export default function Home() {
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
      <ScrollToTop Path={"/"} />
      <Preloader/>
      <Navbar />
      <Herosection />
      {/* <Games />
      <Work />
      <UserTournaments/> 
      <ResultTable/>
      <Statistics />
      <Topthree />
      <Features />
      <Testimonial />
      <Footer /> */}
    </>
  );
}
