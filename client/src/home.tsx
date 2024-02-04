import { Link } from "react-router-dom";

function Home() {
  return (
    <>
    
    {/*Header*/}
    <div>
    <div className = ''>
     <Link to='/'><h1>Sea-MS</h1></Link>
    </div>
    <div>
     <Link to='/templates'><p>Templates</p></Link>
    </div>
    <div>
     <Link to='/login'><p>Login</p></Link>
     <Link to='/signup'><p>Get Started</p></Link>
    </div>
    </div>

    {/*Hero*/}
    <div className = ''>
        <h1>Unleash Sea-mless Creativity</h1>
        <p>Build your platform with ease.</p>
        <Link to='/signup'><p>Get Started</p></Link>
    </div>

    {/*Template carousel page*/}
    <div className = ''>
    <h1>You don't have to start from scratch, pick up a template and start building</h1>
    </div>

    {/*Product display page*/}
    <div className = ''>
    <h1>Blog</h1>
    <p>Share your stories, ideas and connect with others, Start your own blog.</p>
    <h1>Portfolio</h1>
    <p>Show off your best work, create a space that reflect your skills and achievements.</p>
    <h1>Resume</h1>
    <p>Create a standout resume, higlight your skill to land a job with ease.</p>
    </div>
    
    {/*Brand carousel page*/}
    <div className = ''>
    <h1>Brands that trust Sea-MS</h1>
    </div>

    {/*Footer page*/}
    <div className = ''>
        <h1>Created by Veekthor</h1>
        <p>Follow on ...</p>
        <p>Copyright 2024</p>
    </div>

    </>
  );
}
 
export default Home;