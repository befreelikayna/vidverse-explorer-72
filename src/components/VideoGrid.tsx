
import { Video } from "@/lib/api";
import { VideoCard } from "./VideoCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useState, useEffect } from "react";
import { GoogleAdComponent } from "./GoogleAdComponent";
import { Button } from "./ui/button";
import { useInView } from "react-intersection-observer";

interface VideoGridProps {
  videos: Video[];
  isLoading: boolean;
  onLoadMore: () => void;
  hasMoreVideos: boolean;
  loadingMore: boolean;
}

export const VideoGrid = ({ 
  videos, 
  isLoading, 
  onLoadMore, 
  hasMoreVideos, 
  loadingMore 
}: VideoGridProps) => {
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);
  const [videosWithAds, setVideosWithAds] = useState<(Video | { isAd: true })[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });
  
  // Load more content when scrolled to bottom
  useEffect(() => {
    if (inView && hasMoreVideos && !loadingMore) {
      console.log("Loading more videos - intersection observed");
      onLoadMore();
    }
  }, [inView, hasMoreVideos, onLoadMore, loadingMore]);

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

  if (isLoading && videos.length === 0) {
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
      
      {/* Infinite scroll trigger point */}
      {hasMoreVideos && (
        <div 
          ref={ref} 
          className="col-span-full flex justify-center p-8"
        >
          {loadingMore && (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-400"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
