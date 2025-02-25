import { Video } from "@/lib/api";
import { VideoCard } from "./VideoCard";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { useState } from "react";

interface VideoGridProps {
  videos: Video[];
  isLoading: boolean;
}

export const VideoGrid = ({ videos, isLoading }: VideoGridProps) => {
  const [expandedVideoId, setExpandedVideoId] = useState<string | null>(null);

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
      {videos.map((video, index) => (
        <VideoCard 
          key={index} 
          video={video} 
          isExpanded={expandedVideoId === video.url}
          onExpand={(videoUrl) => {
            setExpandedVideoId(videoUrl === expandedVideoId ? null : videoUrl);
          }}
        />
      ))}
    </div>
  );
};