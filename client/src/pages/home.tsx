import { Link } from "react-router-dom";
import React, { Suspense } from "react";
import Footer from "../components/footer";
import LoaderSpinner from "../components/loading";

const TemplateCarousel = React.lazy(() => import('../components/templateCarousel'));
const Products = React.lazy(() => import('../components/product'));

function Home() {
  return (
    <>
    {/*Header*/}
    <div className= 'flex justify-between items-center m-3 p-3'>
    <div className = 'w-44'>
     <Link to='/'><img src='logo-no-background.svg' alt='logo'/></Link>
    </div>
    <div className="font-sans font-semibold leading-normal tracking-wide">
     <Link to='/template'><p>Templates</p></Link>
    </div>
    <div className='font-sans font-semibold flex justify-between items-center space-x-5 leading-normal tracking-wide'>
     <Link to='/login'><p>Login</p></Link>
     <Link to='/signup'><button className="bg-black text-white px-4 py-2 rounded">Get Started</button></Link>
    </div>
    </div>

    {/*Hero*/}
    <div className ='text-center mt-12 p-4 space-y-8 bg-black text-white'>
        <h1 className="w-9/12 mx-auto font-sans font-bold text-7xl leading-normal tracking-wide">
          Unleash Sea-mless Creativity
          </h1>
        <p className="font-roboto text-2xl leading-tight tracking-wide">
          Build your platform with ease.
          </p>
        <div className="inline-block bg-white text-black text-lg px-6 py-3 font-sans font-semibold space-y-4 rounded leading-normal tracking-wide">
        <Link to='/signup'><p>Get Started</p></Link>
    </div>
    </div>

    {/*Template carousel page*/}
    <Suspense fallback={<LoaderSpinner />}>
        <TemplateCarousel />
      </Suspense>

    {/*Product display page*/}
    <Suspense fallback={<LoaderSpinner />}>
        <Products />
      </Suspense>

    {/*Footer page*/}
    <Footer />
    </>
  );
}
 
export default Home;

/* import { useState, useEffect } from 'react';
<div className = 'mt-3 p-4 bg-gray-700'>
    <h1>Brands that trust Sea-MS</h1>
    </div>
const images = [
    'blog 2.webp',
    'blog.webp',
    'portfolio-2.webp',
    'portfolio.webp',
    'resume.webp',
]

function TemplateCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);
 
    return (
        <div className="relative w-4/5 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
            <img
            src={images[activeIndex]}
            alt="template"
            className="h-96 w-96 object-cover rounded-lg"
            />
        </div>
        <button
            onClick={prevSlide}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-l-lg"
        >
            Prev
        </button>
        <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-2 rounded-r-lg"
        >
            Next
        </button>
        </div>
    );
}

export default TemplateCarousel;*/