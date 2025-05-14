
import { Link } from "react-router-dom";
import FloatingCharacter from "@/components/FloatingCharacter";

const NotFoundPage = () => {
  return (
    <>
      <FloatingCharacter />
      
      <div className="flex items-center justify-center min-h-screen bg-neon-dark">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 neon-text animate-pulse-neon">404</h1>
          <h2 className="text-2xl font-bold mb-6 text-white">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="px-6 py-3 rounded-md bg-neon-purple text-white font-medium hover:bg-opacity-80 transition-all neon-glow"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
