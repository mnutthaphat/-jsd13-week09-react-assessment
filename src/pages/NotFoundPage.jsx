import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
            <Link to="/" className="text-blue-500 underline">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
