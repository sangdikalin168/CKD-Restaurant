interface LoadingPageProps {
    message?: string;
}

const LoadingPage = ({ message }: LoadingPageProps) => {

    return (
        <div className="overlay-content">
            <div className="wrapper">
                <div className="flex items-center justify-center h-screen">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                </div>
                {message ? <p className="text-center text-gray-500">{message}</p> : null}
            </div>
        </div>
    );
};

export default LoadingPage;