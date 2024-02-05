import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";
import Home from './home';
import Dashboard from './dashboard';
import BlogTemplate from './components/blog/blogTemplate';
import PortfolioTemplate from './components/portfolio/portfolioTemplate';
import ResumeTemplate from './components/resume/resumeTemplate';
import EditBlogTemplate from './components/blog/editBlogTemplate';
import EditPortfolioTemplate from './components/portfolio/editPortfolioTemplate';

const queryClient = new QueryClient();

 // Routes
const routes = createRoutesFromElements(
  <React.Fragment> {/* or use Route instead of React.Fragement which is also basically <> </> tags */}
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/blogtemplate" element={<BlogTemplate />} />
  <Route path="/portfoliotemplate" element={<PortfolioTemplate />} />
  <Route path="/resumetemplate" element={<ResumeTemplate />} />
  <Route path="/editblogtemplate/:id" element={<EditBlogTemplate />} />
  <Route path="/editportfoliotemplate/:id" element={<EditPortfolioTemplate />} />
  </React.Fragment>
);

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider 
      router={createBrowserRouter(routes)} 
      fallbackElement={<div>Loading...</div>}>
      </RouterProvider>
      <Outlet />{/* used in parent route elements to render their child route elements.*/}
      </QueryClientProvider>
    </>
  )
}

export default App

// Type declaration for RouterProvider
/*declare function RouterProvider(
  props: RouterProviderProps
 ): React.ReactElement;
 
 interface RouterProviderProps {
   router: Router;
   fallbackElement?: React.ReactNode;
 } */