import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

function ErrorPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get params from URL or use defaults
    const statusCode = searchParams.get('statusCode') || '404';
    const message = searchParams.get('message') || 'Page Not Found';

    useEffect(() => {
        document.title = `Error ${statusCode} - Blog`;
    }, [statusCode]);

    const getErrorDescription = (code) => {
        const descriptions = {
            '400': 'The request could not be understood or was missing required parameters.',
            '401': 'You need to be authenticated to access this resource.',
            '403': 'You do not have permission to access this resource.',
            '404': 'The page you are looking for does not exist or has been moved.',
            '500': 'Something went wrong on our end. Please try again later.',
            '503': 'Service is temporarily unavailable. Please try again later.',
        };
        return descriptions[code] || 'An unexpected error occurred.';
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Error Code */}
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                        {statusCode}
                    </h1>
                    <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full"></div>
                </div>

                {/* Error Message */}
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {message}
                </h2>

                {/* Error Description */}
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {getErrorDescription(statusCode)}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-secondary hover:bg-muted text-secondary-foreground font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                    >
                        ← Go Back
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl min-w-[200px]"
                    >
                        Go to Home
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="mt-16 grid grid-cols-3 gap-4 opacity-20">
                    <div className="h-2 bg-primary rounded-full animate-pulse"></div>
                    <div className="h-2 bg-accent rounded-full animate-pulse delay-75"></div>
                    <div className="h-2 bg-primary rounded-full animate-pulse delay-150"></div>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
