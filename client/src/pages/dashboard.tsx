import { Link } from "react-router-dom";
import { useState } from 'react';
import { FaKey, FaSignOutAlt } from 'react-icons/fa';
import UserBlog from "../templates/blog/userBlog";
import UserPortfolio from "../templates/portfolio/userPortfolio";
import UserResume from "../templates/resume/userResume";

function Dashboard () {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    return (
        <>
        {/*Header*/}
        <div className= 'flex justify-between items-center m-3 p-3'>
    <div className = 'w-44'>
     <Link to='/'><img src='logo-no-background.svg' alt='logo'/></Link>
    </div>
    <div className="font-sans font-semibold leading-normal tracking-wide">
     <Link to='/templates'><p>Templates</p></Link>
    </div>
    
    <div className="mr-16">
            <h1 onClick={toggleDropdown} className="cursor-pointer font-sans font-semibold leading-normal tracking-wide">
                Profile
                </h1>
            {dropdownOpen && (
                <div className="absolute top-16 right-0 bg-gray-400 mr-4 shadow-md px-6 py-6 rounded">
                    <Link to='/changepassword' className="flex items-center mb-4">
                        <FaKey /> <p className="ml-2 font-roboto font-medium">Change Password</p>
                    </Link>
                    <Link to='/logout' className="flex items-center">
                        <FaSignOutAlt /> <p className="ml-2">Logout</p>
                    </Link>
                </div>
            )}
        </div>
        </div>

        {/*user content*/}
                <div className="flex justify-between mt-10">
            <div className="flex-1 ml-3 pr-4 border-r border-gray-950">
            <h1 className="font-bold text-center text-lg mb-3">Blog</h1>
                <UserBlog />
            </div>

            <div className="flex-1 px-4 border-r border-gray-950">
                <h1 className="font-bold text-center text-lg mb-3">Portfolio</h1>
                <UserPortfolio />
            </div>

            <div className="flex-1 pl-4">
                <h1 className="font-bold text-center text-lg mb-3">Resume</h1>
                <UserResume />
            </div>
        </div>
        
        </>
    );
}

export default Dashboard;