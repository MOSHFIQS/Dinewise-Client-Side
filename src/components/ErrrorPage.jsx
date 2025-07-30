import { Link, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 text-center">
            {/* Error Code */}
            <h1 className="text-[8rem] font-extrabold text-yellow-500 drop-shadow-md leading-none">404</h1>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-4">
                Page Not Found
            </h2>

            {/* Description */}
            <p className="text-gray-500 max-w-md mb-6">
                The page you're looking for doesn’t exist or was moved. Please check the URL or return to the homepage.
            </p>

            {/* Back Button */}
            <div
            onClick={() => navigate(-1)}
                className="px-6 py-2 bg-yellow-500 text-white rounded-full text-sm font-medium hover:bg-yellow-600 transition"
            >
                Go Back Home
            </div>
        </div>
    );
};

export default ErrorPage;
