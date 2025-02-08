
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { VideoGrid } from "@/components/VideoGrid";
import { searchVideos } from "@/lib/api";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, Share2, Youtube } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
                <Mail className="h-4 w-4" />
                <span>business.kimmiso@gmail.com</span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-300 hover:text-white"
                onClick={() => window.open('https://www.youtube.com/@kimmiso', '_blank')}
              >
                <Youtube className="h-4 w-4 text-red-500" />
                <span>1.4M</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-300 hover:text-white"
                onClick={() => window.open('https://www.tiktok.com/@kimmiso94', '_blank')}
              >
                <Share2 className="h-4 w-4" />
                <span>1.2M</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-gray-300 hover:text-white"
                onClick={() => window.open('https://www.instagram.com/kimmiso1194/', '_blank')}
              >
                <Instagram className="h-4 w-4 text-pink-500" />
                <span>731K</span>
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
