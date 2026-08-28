import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="flex justify-end py-4 px-10 bg-gray-200 w-full left-0 border-b border-gray-300">
            <div className="flex gap-8 font-bold text-black font-sans">
                <Link to="/" className="hover:text-gray-700">Home</Link>
                <Link to="/owner" className="hover:text-gray-700">Owner</Link>
            </div>
        </nav>
    );
};

export default NavBar;
