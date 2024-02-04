import { Link } from "react-router-dom";

function Dashboard () {
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
         <h1>Profile</h1>
            <Link to='/changepassword'><p>Login</p></Link>
            <Link to='/logout'><p>Get Started</p></Link>
        </div>
        </div>

        {/*user content*/}
        </>
    );
}

export default Dashboard;