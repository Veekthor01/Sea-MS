import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="bg-zinc-900 text-zinc-100 py-3 md:py-6 px-2 md:px-4">
            <div className="flex flex-col items-center space-y-1 md:space-y-4">
                <h1 className="md:text-xl font-sans font-bold mb-2 leading-normal tracking-wide">
                    Created by Veekthor
                    </h1>
                <p className='text-sm md:text-base font-roboto leading-tight tracking-wide'>
                © {year}
                     </p>
            </div>
            <div className="flex justify-center md:justify-end space-x-4 text-sm md:text-base mt-3 md:mt-0">
                <a href="https://www.twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
                <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                </a>
            </div>
        </footer>
    );
}

export default Footer;