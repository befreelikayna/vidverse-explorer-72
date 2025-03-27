
import { Video } from "@/lib/api";
import { VideoCard } from "./VideoCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useState, useEffect } from "react";
import { GoogleAdComponent } from "./GoogleAdComponent";

interface VideoGridProps {
  videos: Video[];
  isLoading: boolean;
}

export const VideoGrid = ({ videos, isLoading }: VideoGridProps) => {
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);
  const [videosWithAds, setVideosWithAds] = useState<(Video | { isAd: true })[]>([]);

  useEffect(() => {
    // Insert Google Ads between videos
    const insertAds = () => {
      if (!videos || videos.length === 0) return [];
      
      // Position to insert the ad (after every 3 videos)
      const adPositions = [3, 7, 11];
      
      const result: (Video | { isAd: true })[] = [];
      
      videos.forEach((video, index) => {
        result.push(video);
        
        // Insert ad after specific positions
        if (adPositions.includes(index)) {
          result.push({ isAd: true });
        }
      });
      
      return result;
    };
    
    setVideosWithAds(insertAds());
  }, [videos]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(12)].map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {videosWithAds.map((item, index) => (
        'isAd' in item ? (
          <div key={`ad-${index}`} className="col-span-1 md:col-span-1 lg:col-span-1">
            <GoogleAdComponent />
          </div>
        ) : (
          <VideoCard 
            key={index} 
            video={item} 
            isExpanded={expandedVideoId === item.url}
            onExpand={(videoUrl) => {
              setExpandedVideoId(videoUrl === expandedVideoId ? null : videoUrl);
            }}
          />
        )
      ))}
    </div>
  );
};
