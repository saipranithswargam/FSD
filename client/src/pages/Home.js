import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Partners from "../components/Partners/Partners";
import Features from "../components/Features/Features";
import Process from "../components/Process/Process";
import Testimonials from "../components/Testimonials/Testimonials";
import Footer from "../components/Footer/Footer";
import DownloadPdf from "../components/DownloadPdf/DownloadPdf"
const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <Partners />
            <Features />
            <Process />
            <DownloadPdf />
            <Testimonials />
            <Footer />
        </>
    );
};
export default Home;
