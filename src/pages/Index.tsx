
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { VideoGrid } from "@/components/VideoGrid";
import { searchVideos } from "@/lib/api";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSocialMediaStats, formatSubscriberCount } from "@/lib/socialMedia";
import { NewsTicker } from "@/components/NewsTicker";
import { AppHeader } from "@/components/AppHeader";
import { useTranslation } from "@/hooks/use-translation";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { youtube, tiktok, instagram, isLoading: statsLoading } = useSocialMediaStats(10000); // Update every 10 seconds
  const [isDarkMode, setIsDarkMode] = useState(true); // Always dark mode as default
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "blue");
  const [newsItems, setNewsItems] = useState<string[]>([
    "Welcome to KimMiso's channel!", 
    "New videos every Friday", 
    "Subscribe for more content"
  ]);
  
  // Load news items and apply theme settings
  useEffect(() => {
    // Load news items
    const storedNews = localStorage.getItem('newsTickerItems');
    if (storedNews) {
      try {
        const parsedNews = JSON.parse(storedNews);
        if (Array.isArray(parsedNews)) {
          setNewsItems(parsedNews);
        }
      } catch (e) {
        console.error("Error parsing news ticker data:", e);
      }
    }
    
    // Load theme color
    const color = localStorage.getItem("themeColor");
    if (color) {
      setThemeColor(color);
    }
    
    // Listen for theme changes from admin panel
    const handleStorageChange = () => {
      const updatedColor = localStorage.getItem("themeColor");
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
    <div className="min-h-screen bg-gray-950 text-white">
      {/* News Ticker */}
      <NewsTicker news={newsItems} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <AppHeader
          youtube={youtube}
          tiktok={tiktok}
          instagram={instagram}
          statsLoading={statsLoading}
          borderColorClass={borderColorClass}
          isDarkMode={isDarkMode}
          formatSubscriberCount={formatSubscriberCount}
        />
        
        {/* Search Bar */}
        <div className="w-full md:max-w-xl mx-auto mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        
        {/* Video Grid */}
        <VideoGrid videos={videos} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
