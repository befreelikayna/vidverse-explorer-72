
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { VideoGrid } from "@/components/VideoGrid";
import { searchVideos } from "@/lib/api";
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSocialMediaStats, formatSubscriberCount } from "@/lib/socialMedia";
import { NewsTicker } from "@/components/NewsTicker";
import { AppHeader } from "@/components/AppHeader";
import { useTranslation } from "@/hooks/use-translation";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["videos", searchQuery, null],
    queryFn: () => searchVideos(searchQuery),
    onSuccess: (data) => {
      setAllVideos(data.videos || []);
      setNextPageToken(data.nextpage);
    },
    select: (data) => {
      if (!data.videos || !Array.isArray(data.videos)) {
        console.error("Received non-array data:", data);
        return { videos: [], nextpage: null };
      }
      return data;
    },
  });

  const loadMoreVideos = useCallback(async () => {
    if (!nextPageToken || loadingMore) return;
    
    setLoadingMore(true);
    try {
      const moreData = await searchVideos(searchQuery, nextPageToken);
      setAllVideos(prev => [...prev, ...(moreData.videos || [])]);
      setNextPageToken(moreData.nextpage);
    } catch (err) {
      console.error("Error loading more videos:", err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load more videos. Please try again.",
      });
    } finally {
      setLoadingMore(false);
    }
  }, [nextPageToken, searchQuery, loadingMore, toast]);

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
        <VideoGrid 
          videos={allVideos} 
          isLoading={isLoading}
          onLoadMore={loadMoreVideos}
          hasMoreVideos={!!nextPageToken}
          loadingMore={loadingMore}
        />
      </div>
    </div>
  );
};

export default Index;
