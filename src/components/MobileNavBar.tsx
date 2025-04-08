
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowUp, MessageCircle, LogIn, ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/use-translation";

export const MobileNavBar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isUserAuthenticated") === "true";
      setIsAuthenticated(auth);
    };
    
    checkAuth();
    window.addEventListener("storage", checkAuth);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800">
      <div className="flex justify-around items-center px-2 py-3">
        <button 
          onClick={handleGoBack}
          className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={() => navigate("/")}
          className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
          aria-label="Home"
        >
          <Home size={24} />
        </button>
        
        {showScrollTop ? (
          <button 
            onClick={handleScrollToTop}
            className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        ) : (
          <button 
            onClick={() => navigate("/chat")}
            className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
            aria-label="Chat"
          >
            <MessageCircle size={24} />
          </button>
        )}
        
        <button 
          onClick={() => navigate(isAuthenticated ? "/profile" : "/login")}
          className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
          aria-label={isAuthenticated ? "Profile" : "Login"}
        >
          <LogIn size={24} />
        </button>
      </div>
    </div>
  );
};
