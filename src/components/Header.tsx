import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header=()=>{
    const {isLoggedIn} = useAppContext()
    return(
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between items-center px-4">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">BloomHolidays.com</Link>
                </span>
                <span className="flex space-x-2">
                {isLoggedIn ? ( 
                    <><Link className="flex items-center text-white px-3 py-2 font-bold rounded-lg hover:bg-blue-700 transition duration-300" to="/my-bookings">My Bookings</Link>
                      <Link className="flex items-center text-white px-3 py-2 font-bold rounded-lg hover:bg-blue-700 transition duration-300" to="/my-hotels">My Hotels</Link>
                      <SignOutButton />
                        </>):
                    (
                    <Link to="/sign-in" className="flex items-center text-white px-3 font-bold hover:bg-blue-600 transition duration-300">Sign In</Link>
                )}
                </span>
            </div>
        </div>
    )
}

export default Header;