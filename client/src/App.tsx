import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import ErrorBoundary from './components/errorBoundary';
import ErrorBoundary2 from './components/errorBoundary2';
import LoaderSpinner from './components/loading';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Template from './pages/template';
import BlogTemplate from './templates/blog/blogTemplate';
import PortfolioTemplate from './templates/portfolio/portfolioTemplate';
import ResumeTemplate from './templates/resume/resumeTemplate';
import EditBlogTemplate from './templates/blog/editBlogTemplate';
import EditPortfolioTemplate from './templates/portfolio/editPortfolioTemplate';
import EditResumeTemplate from './templates/resume/editResumeTemplate';
import UserBlog from './user/blog/userBlog';
import UserPortfolio from './user/portfolio/userPortfolio';
import UserResume from './user/resume/userResume';
import EditUserBlog from './user/blog/editUserBlog';
import EditUserPortfolio from './user/portfolio/editUserPortfolio';
import EditUserResume from './user/resume/editUserResume';
import BlogURLPage from './user/blog/userBlogURL';
import PortfolioURLPage from './user/portfolio/userPortfolioURL';
import ResumeURLPage from './user/resume/userResumeURL';
import SignupPage from './auth/signup';
import LoginPage from './auth/login';
import ChangePasswordForm from './auth/changePassword';

const queryClient = new QueryClient();

 // Routes
const routes = createRoutesFromElements(
  <Route>
  <Route path="/" element={<Home />} />
  <Route path="/dashboard" element={<Dashboard />} errorElement={<ErrorBoundary2 />} />
  <Route path="/template" element={
    <ErrorBoundary>
      <Template />
    </ErrorBoundary>//Catches errors anywhere in their child component tree and display a fallback UI.
  } />
  <Route path="/blogtemplate" element={<BlogTemplate />} />
  <Route path="/portfoliotemplate" element={<PortfolioTemplate />} />
  <Route path="/resumetemplate" element={<ResumeTemplate />} />
  <Route path="/editblogtemplate/:id" element={<EditBlogTemplate />} />
  <Route path="/editportfoliotemplate/:id" element={<EditPortfolioTemplate />} />
  <Route path="/editresumetemplate/:id" element={<EditResumeTemplate />} />
  <Route path="/userblog" element={<UserBlog />} />
  <Route path="/userportfolio" element={<UserPortfolio />} />
  <Route path="/userresume" element={<UserResume />} />
  <Route path="/edituserblog/:id" element={<EditUserBlog />} />
  <Route path="/edituserportfolio/:id" element={<EditUserPortfolio />} />
  <Route path="/edituserresume/:id" element={<EditUserResume />} />
  <Route path="/blog/:name" element={<BlogURLPage />} />
  <Route path="/portfolio/:name" element={<PortfolioURLPage />} />
  <Route path="/resume/:name" element={<ResumeURLPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/changepassword" element={<ChangePasswordForm />} />
  </Route>
);

function App() {

  return (
    <div className='bg-zinc-100'>
    <QueryClientProvider client={queryClient}>
      <RouterProvider 
      router={createBrowserRouter(routes)} 
      fallbackElement={<LoaderSpinner />} 
      >
      </RouterProvider>
      <ToastContainer />
      <Outlet />{/* used in parent route elements to render their child route elements.*/}
      </QueryClientProvider>
    </div>
  )
}

export default App