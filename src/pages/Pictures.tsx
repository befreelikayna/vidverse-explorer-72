
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import { AppHeader } from "@/components/AppHeader";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  permalink: string;
}

export default function Pictures() {
  const { t } = useTranslation();
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Placeholder stats for AppHeader
  const stats = {
    youtube: 1490000,
    instagram: 843000,
    tiktok: 1300000
  };
  
  useEffect(() => {
    // This would be replaced with actual Instagram API integration
    // For now, using placeholder data
    const fetchInstagramPosts = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch from Instagram API
        // For now, simulating a delay and returning placeholder data
        setTimeout(() => {
          const placeholderPosts = Array(12).fill(null).map((_, index) => ({
            id: `post-${index}`,
            mediaUrl: `https://picsum.photos/500/500?random=${index}`,
            caption: `Instagram post caption ${index}`,
            timestamp: new Date().toISOString(),
            permalink: `https://instagram.com/p/placeholder-${index}`
          }));
          setInstagramPosts(placeholderPosts);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  const formatSubscriberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-900 text-white">
      <AppHeader
        youtube={stats.youtube}
        instagram={stats.instagram}
        tiktok={stats.tiktok}
        statsLoading={false}
        borderColorClass="border-pink-500"
        isDarkMode={true}
        formatSubscriberCount={formatSubscriberCount}
      />
      
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <Instagram className="mr-2 text-pink-500" />
          Instagram Pictures
        </h1>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array(12).fill(null).map((_, index) => (
              <div key={index} className="h-64 w-full">
                <LoadingSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {instagramPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden bg-gray-800 border-gray-700">
                <CardContent className="p-0 relative">
                  <a 
                    href={post.permalink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img 
                      src={post.mediaUrl} 
                      alt={post.caption} 
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <Instagram className="h-8 w-8 text-white" />
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        <p className="text-center mt-8 text-sm text-gray-400">
          To display actual Instagram content, an Instagram API integration needs to be set up in the admin panel.
        </p>
      </div>
    </div>
  );
}
