
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { VideoGrid } from "@/components/VideoGrid";
import { searchVideos } from "@/lib/api";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, LogIn } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSocialMediaStats, formatSubscriberCount } from "@/lib/socialMedia";
import { useNavigate } from "react-router-dom";

// Custom TikTok icon component
const TikTokIcon = ({ className = "", size = 16 }: { className?: string; size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    className={className}
    fill="currentColor"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { youtube, tiktok, instagram, isLoading: statsLoading } = useSocialMediaStats(10000); // Update every 10 seconds
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "blue");
  
  // Apply theme settings from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const color = localStorage.getItem("themeColor");
    
    if (theme) {
      setIsDarkMode(theme === "dark");
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
    
    if (color) {
      setThemeColor(color);
    }
    
    // Listen for theme changes from admin panel
    const handleStorageChange = () => {
      const updatedTheme = localStorage.getItem("theme");
      const updatedColor = localStorage.getItem("themeColor");
      
      if (updatedTheme) {
        setIsDarkMode(updatedTheme === "dark");
        document.documentElement.classList.toggle("dark", updatedTheme === "dark");
      }
      
      if (updatedColor) {
        setThemeColor(updatedColor);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const { data: videos = [], isLoading, error } = useQuery({
    queryKey: ["videos", searchQuery],
    queryFn: () => searchVideos(searchQuery),
    select: (data) => {
      if (!Array.isArray(data)) {
        console.error("Received non-array data:", data);
        return [];
      }
      return data;
    },
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to load videos. Please try again later.",
    });
  }

  const handleAdminLogin = () => {
    navigate("/admin");
  };
  
  // Get theme color classes
  const getThemeColorClasses = () => {
    switch (themeColor) {
      case "purple":
        return "border-purple-500 text-purple-500";
      case "pink":
        return "border-pink-500 text-pink-500";
      case "green":
        return "border-green-500 text-green-500";
      case "orange":
        return "border-orange-500 text-orange-500";
      default: // blue
        return "border-blue-500 text-blue-500";
    }
  };
  
  const borderColorClass = getThemeColorClasses();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className={`h-12 w-12 border-2 ${borderColorClass}`}>
                <AvatarImage src="/lovable-uploads/539de762-71b5-4183-9e88-1071a8c6ea5c.png" alt="KIMMISO" />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>@KimMiso1194</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>🍀 Business Inquiries ⬇️</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} text-sm`}
                onClick={() => window.open('mailto:business.kimmiso@gmail.com')}
              >
                <span>business.kimmiso@gmail.com</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
                onClick={handleAdminLogin}
              >
                <LogIn className="h-4 w-4" />
                <span>Admin</span>
              </Button>
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
                <TikTokIcon className="h-4 w-4" />
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
            
            <div className="w-full md:w-auto md:flex-1 md:max-w-xl">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>
        </div>
        
        <VideoGrid videos={videos} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
