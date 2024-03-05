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
    <div className='flex justify-between items-center mx-2 md:mx-3 mb-3 p-2 md:p-3'>
    <div className='w-28 md:w-44'>
     <Link to='/'><img src='logo-no-background.svg' alt='logo'/></Link>
    </div>
    <div className="hidden sm:block font-sans text-sm md:text-base text-zinc-900 font-semibold leading-normal tracking-wide hover:text-zinc-700">
     <Link to='/template'><p>Templates</p></Link>
    </div>
    <div className='font-sans text-sm md:text-base text-zinc-900 font-semibold flex justify-between items-center space-x-5 leading-normal tracking-wide hover:text-zinc-800'>
     <Link to='/login'><p>Login</p></Link>
     <Link to='/signup'><button className="bg-zinc-900 text-zinc-100 px-2 py-1 md:px-4 md:py-2 rounded hover:bg-zinc-700">Get Started</button></Link>
    </div>
    </div>

    {/*Hero*/}
    <div className ='text-center mt-6 md:mt-12 p-4 py-5 md:py-10 space-y-4 md:space-y-8 text-zinc-900'>
        <h1 className="w-11/12 md:w-3/5 lg:w-9/12 mx-auto font-sans font-bold text-[50px] md:text-[70px] lg:text-[82px] leading-normal tracking-wide">
        Unleash <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900">Sea</span>-mless Creativity
          </h1>
        <p className="font-roboto text-lg md:text-2xl leading-tight tracking-wide">
          Build your platform with ease.
          </p>
        <div className="inline-block bg-zinc-900 text-zinc-100 text-base md:text-lg px-4 md:px-6 py-2 md:py-3 font-sans font-semibold space-y-4 rounded leading-normal tracking-wide hover:bg-zinc-800 cursor-pointer">
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