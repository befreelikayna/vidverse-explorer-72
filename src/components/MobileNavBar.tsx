
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ArrowUp, MessageCircle, LogIn, ArrowLeft, Shield, Image } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "@/hooks/use-translation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const MobileNavBar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPrivacyLink, setShowPrivacyLink] = useState(false);
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
      setShowPrivacyLink(window.innerHeight + window.scrollY >= document.body.offsetHeight - 300);
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
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
              aria-label="Navigation menu"
            >
              <Home size={24} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem onClick={() => navigate("/")}>
              <Home size={16} className="mr-2" /> {t('home')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/chat")}>
              <MessageCircle size={16} className="mr-2" /> {t('chat')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/pictures")}>
              <Image size={16} className="mr-2" /> Pictures
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/privacy-policy")}>
              <Shield size={16} className="mr-2" /> Privacy Policy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
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
            onClick={() => window.open("mailto:business.kimmiso@gmail.com")}
            className="flex items-center justify-center p-2 text-gray-400 hover:text-white"
            aria-label="Email"
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
