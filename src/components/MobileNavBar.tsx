
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowUp, MessageCircle, LogIn, ArrowLeft, Download } from "lucide-react";
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

  const handleDownloadApk = () => {
    window.open('https://www.upload-apk.com/DSV4fSEVUyr28KG', '_blank');
  };
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800">
      <div className="flex justify-around items-center px-2 py-3">
        <button 
          onClick={handleGoBack}
          className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
          <span className="text-xs mt-1">Back</span>
        </button>
        
        <button 
          onClick={() => navigate("/")}
          className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-white"
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          onClick={handleDownloadApk}
          className="flex flex-col items-center justify-center p-2 text-green-500 hover:text-green-400"
        >
          <Download size={20} />
          <span className="text-xs mt-1">{t('downloadApp')}</span>
        </button>
        
        {showScrollTop ? (
          <button 
            onClick={handleScrollToTop}
            className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-white"
          >
            <ArrowUp size={20} />
            <span className="text-xs mt-1">Top</span>
          </button>
        ) : (
          <button 
            onClick={() => navigate("/chat")}
            className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-white"
          >
            <MessageCircle size={20} />
            <span className="text-xs mt-1">Chat</span>
          </button>
        )}
        
        <button 
          onClick={() => navigate(isAuthenticated ? "/profile" : "/login")}
          className="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-white"
        >
          <LogIn size={20} />
          <span className="text-xs mt-1">{isAuthenticated ? "Profile" : "Login"}</span>
        </button>
      </div>
    </div>
  );
};
