const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const DashFooter = () => {
    return (
        <footer className="bg-zinc-900 text-zinc-100 py-3 px-3 fixed bottom-0 right-0 w-full lg:w-10/12">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="font-sans text-sm md:text-base font-bold mb-2 leading-normal tracking-wide">
                Your edited template will be available at {FRONTEND_URL}/[url name of your website]
                    </h1>
            </div>
        </footer>
    );
};

export default DashFooter;