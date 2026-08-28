import { Link } from "react-router-dom";

// Component หน้า Error 404 (ดักจับเวลากด URL มั่ว)
const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>

            {/* กดแล้วพากลับไปหน้าแรก */}
            <Link to="/" className="text-blue-500 underline">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
