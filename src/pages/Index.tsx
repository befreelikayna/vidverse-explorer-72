
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { VideoGrid } from "@/components/VideoGrid";
import { searchVideos } from "@/lib/api";
import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-blue-500">
                <AvatarImage src="/lovable-uploads/539de762-71b5-4183-9e88-1071a8c6ea5c.png" alt="KIMMISO" />
                <AvatarFallback>KM</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">@KimMiso1194</span>
                <span className="text-sm text-gray-400">🍀 Business Inquiries ⬇️</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
                onClick={() => window.open('mailto:business.kimmiso@gmail.com')}
              >
                <span>business.kimmiso@gmail.com</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gray-200 hover:text-white"
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
                className="flex items-center gap-2 text-gray-300 hover:text-white relative group"
                onClick={() => window.open('https://www.youtube.com/@kimmiso', '_blank')}
              >
                <Youtube className="h-4 w-4 text-red-500" />
                <span className="flex items-center">
                  {statsLoading ? "1.4M" : formatSubscriberCount(youtube)}
                  <span className="ml-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {!statsLoading && "live"}
                  </span>
                </span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-300 hover:text-white relative group"
                onClick={() => window.open('https://www.tiktok.com/@kimmiso94', '_blank')}
              >
                <TikTokIcon className="h-4 w-4" />
                <span className="flex items-center">
                  {statsLoading ? "1.2M" : formatSubscriberCount(tiktok)}
                  <span className="ml-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {!statsLoading && "live"}
                  </span>
                </span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-300 hover:text-white relative group"
                onClick={() => window.open('https://www.instagram.com/kimmiso1194/', '_blank')}
              >
                <Instagram className="h-4 w-4 text-pink-500" />
                <span className="flex items-center">
                  {statsLoading ? "731K" : formatSubscriberCount(instagram)}
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
