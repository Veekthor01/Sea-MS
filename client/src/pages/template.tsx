import { Link } from "react-router-dom";
import Logout from "../auth/logout";
import { useNavigate } from "react-router-dom";
import CheckAuthenticated from "../auth/authMiddleware";

function Template() {
    const navigate = useNavigate();

    // Logout user
    const logoutUser = async () => {
        try {
            await Logout();
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    return (
        <>
        <CheckAuthenticated />
            {/*Header*/}
            <div className='flex justify-between items-center m-3 p-2'>
                <div className='w-44'>
                    <Link to='/'><img src='/logo-no-background.svg' alt='logo' /></Link>
                </div>
                <div className="font-sans font-semibold leading-normal tracking-wide">
                    <Link to='/dashboard'><p>Dashboard</p></Link>
                </div>
                <div className='font-sans font-semibold flex justify-between items-center leading-normal tracking-wide'>
                    <Link to='#' onClick={logoutUser}><p>Logout</p></Link>
                </div>
            </div>

            <h1 className="text-3xl font-sans font-bold mb-4 mt-5 text-center">
                Pick a Template to Get Started with Sea-MS
                </h1>

            {/*User content*/}
            <div className="flex justify-between space-x-4 p-4">
                <div className="w-1/3 flex flex-col rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300">
                    <div className="p-4">
                        <h1 className="text-lg font-sans font-bold mb-2">Blog</h1>
                        <img src='/t.blog.webp' alt='blog' loading='lazy' />
                    </div>
                    <div className="flex justify-center items-center p-4 mt-auto">
                    <Link to='/blogtemplate'>
                    <button className="mr-2 font-roboto font-semibold border border-black text-black px-2 py-1 rounded hover:bg-black hover:text-white transition-colors duration-200">
                        View & Edit
                    </button>
                </Link>
                    </div>
                </div>

                <div className="w-1/3 flex flex-col rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300">
                    <div className="p-4">
                        <h1 className="text-lg font-sans font-bold mb-2">
                            Portfolio
                            </h1>
                        <img src='/t.portfolio.webp' alt='portfolio' loading='lazy' />
                    </div>
                    <div className="flex justify-center items-center p-4 mt-auto">
                    <Link to='/portfoliotemplate'>
                        <button className="mr-2 font-roboto font-semibold border border-black text-black px-2 py-1 rounded hover:bg-black hover:text-white transition-colors duration-200">
                            View & Edit
                        </button>
                    </Link>
                    </div>
                </div>

                <div className="w-1/3 flex flex-col rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition duration-300">
                    <div className="p-4">
                        <h1 className="text-lg font-sans font-bold mb-2">
                            Resume
                            </h1>
                        <img src='/t.resume.webp' alt='resume' loading='lazy' />
                    </div>
                    <div className="flex justify-center items-center p-4 mt-auto">
                    <Link to='/resumetemplate'>
                        <button className="mr-2 font-roboto font-semibold border border-black text-black px-2 py-1 rounded hover:bg-black hover:text-white transition-colors duration-200">
                            View & Edit
                        </button>
                    </Link>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Template;
//const userId = document.cookie.split('; ').find(row => row.startsWith('userId=')).split('=')[1];