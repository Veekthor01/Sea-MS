import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ObjectId } from 'mongodb';
import parser from 'html-react-parser';
import '../template.css'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Projects {
  name: string;
  description: string;
  technologies: string[];
  url: string;
}

interface PortfolioTemplate {
  _id: ObjectId;
  name: string;
  author: string;
  about: string;
  technologies: string[];
  projects: Projects[];
}

function PortfolioTemplate() {
    const portfolioTemplateQuery = useQuery({
        queryKey: ['portfolioTemplate'],
        queryFn: async () => {
            const response = await axios.get(`${BACKEND_URL}/portfolioTemplate`);
            const data = await response.data;
            return data;
          },
            //staleTime: 1000 * 60 * 2, // 2 minutes or set to 0 for no caching or Infinity for no re-fetching
        })

    if (portfolioTemplateQuery.isLoading) return (<h1> Loading...</h1>)
    if (portfolioTemplateQuery.isError) return (<h1> Error: {portfolioTemplateQuery.error.message}</h1>)
    if (portfolioTemplateQuery.isLoadingError) return (<h1> Loading Error...</h1>)// remove later

    return (
      <main className="pt-8 pb-16 lg:pt-8 lg:pb-20 bg-gradient-to-r from-slate-900 to-slate-700 antialiased">
      <div className="px-4 mx-auto max-w-screen-xl">
          {portfolioTemplateQuery.data.map((portfolio: PortfolioTemplate) => (
              <div key={portfolio._id.toString()} className="w-full mt-8">
                <div className="flex justify-end">
                <Link to={`/editPortfolioTemplate/${portfolioTemplateQuery.data[0]._id}`}>
                  <button className="font-roboto font-semiboldfont-roboto font-semibold border border-white text-white px-2 py-1 rounded hover:bg-white hover:text-black transition-colors duration-200">
                    Edit Template
                  </button>
                </Link>
              </div>
                <div className="px-6 py-2 text-xl text-white text-center font-sans font-bold leading-normal tracking-wide">
                  {parser(portfolio.author)}
                  </div>
                <div className="px-6 py-2 text-white leading-normal tracking-wide">
                  {parser(portfolio.about)}
                  </div>
                  <h1 className="px-6 py-6 text-lg text-white text-center font-sans font-bold leading-normal tracking-wide">
                    Technologies/Tools
                    </h1>
                    <p className="px-6 py-2 text-white text-center font-roboto leading-tight tracking-wide">
                        {portfolio.technologies?.join(' • ')}
                    </p>
                <h1 className="px-6 py-2 text-lg text-white font-sans font-bold leading-normal tracking-wide">
                  Projects
                  </h1>
                {portfolio.projects?.map((project, index) => (
                  <div key={index} className="px-6 py-4">
                    <h3 className="font-bold text-white font-roboto ">
                      {project.name}
                      </h3>
                    <p className="mt-1 text-gray-200 font-roboto ">
                      {project.description}
                      </p>
                      <p className='mt-4 italic text-gray-200 font-roboto '>
                        Built with
                     </p>
                    {project.technologies?.map((technology, index) => (
                      <p key={index} className="mt-2 text-sm text-gray-200 font-roboto ">
                        {technology}
                        </p>
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
      )
}

export default PortfolioTemplate
{/*<Link to={`/editPortfolioTemplate/${portfolioTemplateQuery.data[0]._id}`} 
className="inline-block px-6 py-3 mt-8 text-xs font-medium leading-6 text-center
 text-white uppercase transition
  bg-blue-600 rounded shadow ripple hover:shadow-lg
   hover:bg-blue-800 focus:outline-none">Edit</Link> 
  // <h2 className="px-6 py-4 text-xl font-bold text-gray-900 dark:text-white">
                  {portfolio.name}
                  </h2>
  */}