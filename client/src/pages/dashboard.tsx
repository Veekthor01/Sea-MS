import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaKey, FaSignOutAlt } from 'react-icons/fa';
import UserBlog from "../templates/blog/userBlog";
import UserPortfolio from "../templates/portfolio/userPortfolio";
import UserResume from "../templates/resume/userResume";
import CheckAuthenticated from "../auth/authMiddleware";
import Logout from "../auth/logout";
import Sidebar from "../components/sidebar";
import DashFooter from "../components/dashFooter";

function Dashboard () {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedSection, setSelectedSection] = useState('blog');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

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
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                {/* Header */}
                <div className='flex justify-between items-center mx-2 md:mx-3 mb-3 p-2 md:p-3'>
                <div className='w-28 md:w-44'>
                        <Link to='/'><img src='logo-no-background.svg' alt='logo'/></Link>
                    </div>
                    <div className="font-sans text-sm md:text-base text-zinc-900 font-semibold leading-normal tracking-wide hover:text-zinc-700">
                        <Link to='/template'><p>Templates</p></Link>
                    </div>
                    <div className="md:mr-16">
                        <h1 onClick={toggleDropdown} className="cursor-pointer font-sans text-sm md:text-base font-semibold text-zinc-900 leading-normal tracking-wide hover:text-zinc-700">
                            Profile
                        </h1>
                        {dropdownOpen && (
                            <div className="absolute top-16 right-0 text-sm md:text-base bg-zinc-50 text-zinc-900 mr-4 shadow-md px-6 py-6 rounded">
                                <Link to='/changepassword' className="flex items-center mb-4">
                                    <FaKey /> <p className="ml-2 font-roboto font-medium">Change Password</p>
                                </Link>
                                <Link to='#' className="flex items-center" onClick={logoutUser}>
                                    <FaSignOutAlt /> <p className="ml-2">Logout</p>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="font-sans font-bold text-lg md:text-2xl text-center text-zinc-900 mt-8 mb-3">
                    Welcome to your dashboard!
                    </h1>
                <h2 className="mx-5 md:mx-0 font-sans font-medium text-center mb-3 text-zinc-900">
                    Here you can manage your blog, portfolio or resume
                    </h2>

                {/* User content */}
                {/*Buttons to select section*/}
                
                <div className="flex justify-between md:justify-around mt-10 text-zinc-900 font-bold mx-5 md:mx-0 md:text-xl leading-normal tracking-wide">
                    <button 
                        className={`px-3 md:px-4 py-2 rounded ${selectedSection === 'blog' ? 'bg-zinc-900 text-zinc-100' : 'border border-zinc-900 hover:bg-zinc-800 hover:text-zinc-100'}`} 
                        onClick={() => setSelectedSection('blog')}
                    >
                        Blog
                    </button>
                    <button 
                        className={`px-3 md py-2 rounded ${selectedSection === 'portfolio' ? 'bg-zinc-900 text-zinc-100' : 'border border-zinc-900 hover:bg-zinc-800 hover:text-zinc-100'}`} 
                        onClick={() => setSelectedSection('portfolio')}
                    >
                        Portfolio
                    </button>
                    <button 
                        className={`px-3 md py-2 rounded ${selectedSection === 'resume' ? 'bg-zinc-900 text-zinc-100' : 'border border-zinc-900 hover:bg-zinc-800 hover:text-zinc-100'}`} 
                        onClick={() => setSelectedSection('resume')}
                    >
                        Resume
                    </button>
                </div>
                
                    <div className="ml-4 md:ml-10">        
                {selectedSection === 'blog' && (
                        <div className="flex-1 ml-3 pr-4 border-b border-zinc-900">
                            <h1 className="font-bold text-zinc-900 mt-4 md:mt-3 mb-3">
                                Your blog
                                </h1>
                            <UserBlog />
                        </div>
                    )}

                    {selectedSection === 'portfolio' && (
                        <div className="flex-1 px-4 border-b border-zinc-900">
                            <h1 className="font-bold mt-4 md:mt-3 mb-3">
                           Your portfolio
                                </h1>
                            <UserPortfolio />
                        </div>
                    )}

                    {selectedSection === 'resume' && (
                        <div className="flex-1 pl-4 border-b border-zinc-900">
                             <h1 className="font-bold text-zinc-900 mt-4 md:mt-3 mb-3">
                                Your resume
                                </h1>
                            <UserResume />
                        </div>
                    )}
                    </div>

                </div>
                    <DashFooter />
        </div>
        </>
    );
}

export default Dashboard;