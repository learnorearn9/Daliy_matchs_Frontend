import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Herosection from "./Herosection";
import Games from "./Games";
import Work from "./Work";
import Topthree from "./Topthree";
import Features from "./Features";
import Testimonial from "./Reviews";
import Statistics from "./Statistics";
import ScrollToTop from "../atoms/scrollTotop";
import Preloader from "../atoms/Preloader";
import UserTournaments from "./UserTournaments";
import ResultTable from "./ResultTable";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
AOS.init({
  duration: 1500,
});

export default function Home() {
  return (
    <>
      <ScrollToTop Path={"/"} />
      <Preloader />
      <Navbar />
      <Herosection />
      <Games />
      <Work />
      <UserTournaments />
      <ResultTable />
      <Statistics />
      <Topthree />
      <Features />
      <Testimonial />
      <Footer />
    </>
  );
}
