import { Link } from "react-router-dom";
import UserBlog from "./components/blog/userBlog";

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
            <Link to='/changepassword'><p>Change Password</p></Link>
            <Link to='/logout'><p>Logout</p></Link>
        </div>
        </div>

        {/*user content*/}
        <div>
            <UserBlog />
        </div>
        
        </>
    );
}

export default Dashboard;