import { useEffect, useState } from 'react';
import axios from 'axios';
import parser from 'html-react-parser';
import '../../templates/template.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserBlog {
    _id: string;
    name: string;
    title: string;
    content: string;
    author: string;
    createdAt?: Date;
    updatedAt?: Date;
}

function BlogURLPage() {
    const [, setBlogNames] = useState<string[]>([]);
    const [blog, setBlog] = useState<UserBlog[] | null>(null);

    useEffect(() => {
        const fetchUserBlog = async () => {
          try {
            const response = await axios.get(`${BACKEND_URL}/userBlog`);
            setBlog(response.data);

            // Extract the names of the blogs
            const names = response.data.map((blog: UserBlog) => blog.name);
            setBlogNames(names);
          } catch (error) {
            console.error('Error fetching user blog:', error);
          }
        };
      
        fetchUserBlog();
      }, []);

      return (

        <main className="pt-8 pb-16 lg:pt-12 lg:pb-20 bg-white dark:bg-gray-900 antialiased">
          <div className="px-4 mx-auto max-w-screen-xl">
          {blog && blog.map((blog: UserBlog) => (
            <div key={blog._id} className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            {/* Use html-react-parser to render content without <p> tags saved with by the RTE */}
            <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <div>
                        <a href="#" rel="author" className="text-xl font-sans font-bold text-gray-900 dark:text-white leading-normal tracking-wide">
                          {parser(blog.author)}
                          </a>
                        <p className="text-base font-roboto text-gray-500 dark:text-gray-400">
                        {parser(blog.createdAt?.toString() ?? '')}
                          </p>
                      </div>
                    </div>
                  </address>
                  <h2 className="mb-4 text-2xl font-sans font-bold text-gray-900 lg:text-3xl dark:text-white leading-normal tracking-wide">
                    {parser(blog.title)}
                    </h2>
                </header>
                <div className="text-lg font-sans mt-7 text-gray-500 dark:text-gray-400 leading-normal tracking-wide">
                  {parser(blog.content)}
                  </div>         
              </div>
                ))}
          </div>
        </main>
    );
}

export default BlogURLPage;