import { useEffect, useState } from 'react';
import axios from 'axios';
import parser from 'html-react-parser';
import '../../templates/template.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Projects {
    name: string;
    description: string;
    technologies: string[];
    url: string;
  }
  
  interface UserPortfolio {
    _id: string;
    name: string;
    author: string;
    about: string;
    technologies: string[];
    projects: Projects[];
  }

  function PortfolioURLPage () {
    const [, setPortfolioNames] = useState<string[]>([]);
    const [portfolio, setPortfolio] = useState<UserPortfolio[] | null>(null);

    useEffect(() => {
        const fetchUserPortfolio = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/userPortfolio`);
            setPortfolio(response.data);

            // Extract the names of the portfolios
            const names = response.data.map((portfolio: UserPortfolio) => portfolio.name);
            setPortfolioNames(names);
          } catch (error) {
            console.error('Error fetching user portfolio:', error);
          }
        };
      
        fetchUserPortfolio();
      }, []);

      return (
      <main className="pt-8 pb-16 lg:pt-8 lg:pb-20 bg-gradient-to-r from-slate-900 to-slate-700 antialiased">
      <div className="px-4 mx-auto max-w-screen-xl">
        {portfolio && portfolio.map((portfolio: UserPortfolio) => (
            <div key={portfolio._id} className="w-full mt-8">
            <div className="px-6 py-2 text-xl text-white text-center font-sans font-bold leading-normal tracking-wide">
                  {parser(portfolio.author)}
                  </div>
                <div className="px-6 py-2 text-white leading-normal tracking-wide">
                  {parser(portfolio.about)}
                  </div>
                  <h1 className="px-6 py-6 text-lg text-white text-center font-sans font-bold leading-normal tracking-wide">
                    Technologies/Tools
                    </h1>
                    <div className="px-6 py-2 text-white text-center font-roboto leading-tight tracking-wide">
                        {parser(portfolio.technologies?.join(' • '))}
                    </div>
                <h1 className="px-6 py-2 text-lg text-white font-sans font-bold leading-normal tracking-wide">
                  Projects
                  </h1>
                {portfolio.projects?.map((project, index) => (
                  <div key={index} className="px-6 py-4">
                    <h3 className="font-bold text-white font-roboto ">
                     {parser(project.name)}
                      </h3>
                    <div className="mt-1 text-gray-200 font-roboto ">
                        {parser(project.description)}
                      </div>
                      <div className='mt-4 italic text-gray-200 font-roboto '>
                        Built with
                     </div>
                    {project.technologies?.map((technology, index) => (
                      <div key={index} className="mt-2 text-sm text-gray-200 font-roboto ">
                        {parser(technology)}
                        </div>
                    ))}
                    <a href={project.url || '#'} className="mt-4 inline-block font-roboto px-6 py-3 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-600 rounded shadow hover:shadow-lg hover:bg-blue-800 focus:outline-none">
                      Project Link
                      </a>
                  </div>
                ))}
              </div>
            ))}         
          </div>
          
        </main>
      );
}

export default PortfolioURLPage;