function Products() {
    return (
        <div className="bg-violet-800 p-8">
          <h1 className="w-4/5 mx-auto mt-4 mb-3 font-sans text-4xl text-white font-bold text-center leading-snug tracking-wide">
          Share and connect with others, showcase your work, and land your dream job
          </h1> 
            <div className="flex justify-between">
                <div className="w-1/3">
                    <div className="rounded-lg p-6 mb-4 text-white">
                        <img src="/p.blog.webp" alt="Blog" className="w-full mb-4 rounded" />
                        <h1 className="text-xl font-sans font-bold mb-2 leading-normal tracking-wide">
                          Blog
                          </h1>
                        <p className="font-roboto leading-tight tracking-wide">
                          Share your stories, ideas, and connect with others. Start your own blog.
                          </p>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="rounded-lg p-6 mb-4 text-white">
                        <img src="/p.portfolio.webp" alt="Portfolio" className="w-full mb-4 rounded" />
                        <h1 className="text-xl font-sans font-bold mb-2 leading-normal tracking-wide">
                          Portfolio
                          </h1>
                        <p className="font-roboto leading-tight tracking-wide">
                          Show off your best work, create a space that reflects your skills and achievements.
                          </p>
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="rounded-lg p-6 mb-4 text-white">
                        <img src="/p.resume.webp" alt="Resume" className="w-full mb-4 rounded" />
                        <h1 className="text-xl font-sans font-bold mb-2 leading-normal tracking-wide">
                          Resume
                          </h1>
                        <p className="font-roboto leading-tight tracking-wide">
                          Create a standout resume, highlight your skills to land a job with ease.
                          </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;