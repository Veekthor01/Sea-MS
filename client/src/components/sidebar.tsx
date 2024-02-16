import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`min-h-screen inset-y-0 left-0 z-10 ${isOpen ? 'block' : 'hidden'} lg:block bg-zinc-900 font-roboto text-zinc-300 w-64`}>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Set up your platform</h2>
        <button onClick={toggleSidebar} className="lg:hidden focus:outline-none">
          <svg className="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>
      <nav className="p-4">
    <ul className="space-y-2">
        <li className="w-full">
            <NavLink to="/" className="block py-2 px-4 hover:bg-zinc-700 w-full">Home</NavLink>
        </li>
        <li className="w-full">
            <NavLink to="/template" className="block py-2 px-4 hover:bg-zinc-700 w-full">Templates</NavLink>
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            Marketing
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            SEO
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            Communications
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            Automations
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            Contacts
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            Billing and Payment
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            App
        </li>
        <li className="block py-2 px-4 hover:bg-zinc-700 w-full cursor-pointer">
            Settings
        </li>
    </ul>
</nav>
    </div>
  );
};

export default Sidebar;
