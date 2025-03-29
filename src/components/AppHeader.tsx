
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Instagram, 
  Youtube, 
  LogIn, 
  LogOut, 
  UserPlus, 
  Home,
  MessageCircle 
} from "lucide-react";
import { TikTokIcon } from "@/components/TikTokIcon";
import { useTranslation } from "@/hooks/use-translation";
import { useEffect, useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface AppHeaderProps {
  youtube: number;
  tiktok: number;
  instagram: number;
  statsLoading: boolean;
  borderColorClass: string;
  isDarkMode: boolean;
  formatSubscriberCount: (count: number) => string;
}

export const AppHeader = ({
  youtube,
  tiktok,
  instagram,
  statsLoading,
  borderColorClass,
  isDarkMode,
  formatSubscriberCount
}: AppHeaderProps) => {
  const navigate = useNavigate();
  const { t, language, changeLanguage, getAvailableLanguages } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  const languages = getAvailableLanguages();

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("isUserAuthenticated") === "true";
      setIsAuthenticated(auth);
      
      if (auth) {
        const storedName = localStorage.getItem("userName");
        setUserName(storedName || "User");
      }
    };
    
    checkAuth();
    
    // Listen for auth changes in localStorage
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isUserAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/");
  };
  
  return (
    <header className="w-full">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className={`h-12 w-12 border-2 ${borderColorClass}`}>
              <AvatarImage src="/lovable-uploads/539de762-71b5-4183-9e88-1071a8c6ea5c.png" alt="KIMMISO" />
              <AvatarFallback>KM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>@KimMiso1194</span>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>🍀 {t('business')} ⬇️</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} text-sm`}
              onClick={() => window.open('mailto:business.kimmiso@gmail.com')}
            >
              <span>business.kimmiso@gmail.com</span>
            </Button>
            
            <Select
              value={language}
              onValueChange={changeLanguage}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <span>{userName}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('logout')}
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('login')}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t('signup')}
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} relative group`}
              onClick={() => window.open('https://www.youtube.com/@kimmiso', '_blank')}
            >
              <Youtube className="h-4 w-4 text-red-500" />
              <span className="flex items-center">
                {statsLoading ? "1.49M" : formatSubscriberCount(youtube)}
                <span className="ml-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {!statsLoading && "live"}
                </span>
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} relative group`}
              onClick={() => window.open('https://www.tiktok.com/@kimmiso94', '_blank')}
            >
              <TikTokIcon size={16} />
              <span className="flex items-center">
                {statsLoading ? "1.3M" : formatSubscriberCount(tiktok)}
                <span className="ml-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {!statsLoading && "live"}
                </span>
              </span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} relative group`}
              onClick={() => window.open('https://www.instagram.com/kimmiso1194/', '_blank')}
            >
              <Instagram className="h-4 w-4 text-pink-500" />
              <span className="flex items-center">
                {statsLoading ? "843K" : formatSubscriberCount(instagram)}
                <span className="ml-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {!statsLoading && "live"}
                </span>
              </span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate('/')}
            >
              <Home className="h-4 w-4" />
              {t('home')}
            </Button>
            
            <Button
              variant="ghost" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => navigate('/chat')}
            >
              <MessageCircle className="h-4 w-4" />
              {t('chat')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
              onClick={() => navigate('/admin')}
            >
              <LogIn className="h-4 w-4" />
              <span>{t('admin')}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
