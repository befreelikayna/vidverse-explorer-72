
import { useState, useEffect } from "react";

interface SocialMediaStats {
  youtube: number;
  tiktok: number;
  instagram: number;
  isLoading: boolean;
  error: Error | null;
}

// Format subscriber counts (e.g., 1400000 -> 1.4M)
export const formatSubscriberCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

// Mock function to fetch YouTube subscribers
// In a real implementation, this would call the YouTube API
const fetchYouTubeSubscribers = async (): Promise<number> => {
  // For demo purposes, we're returning a value close to the expected 1.4M
  // with slight variations to simulate live updates
  const baseCount = 1400000;
  const variance = Math.floor(Math.random() * 10000) - 5000; // +/- 5000
  return baseCount + variance;
};

// Mock function to fetch TikTok subscribers
const fetchTikTokSubscribers = async (): Promise<number> => {
  // Base around 1.2M
  const baseCount = 1200000;
  const variance = Math.floor(Math.random() * 8000) - 4000;
  return baseCount + variance;
};

// Mock function to fetch Instagram subscribers
const fetchInstagramSubscribers = async (): Promise<number> => {
  // Base around 731K
  const baseCount = 731000;
  const variance = Math.floor(Math.random() * 5000) - 2500;
  return baseCount + variance;
};

// Custom hook to fetch and refresh social media stats
export const useSocialMediaStats = (refreshInterval = 30000): SocialMediaStats => {
  const [stats, setStats] = useState<SocialMediaStats>({
    youtube: 1400000, // Initial values to prevent UI flicker
    tiktok: 1200000,
    instagram: 731000,
    isLoading: true,
    error: null
  });

  const fetchStats = async () => {
    try {
      const [youtube, tiktok, instagram] = await Promise.all([
        fetchYouTubeSubscribers(),
        fetchTikTokSubscribers(),
        fetchInstagramSubscribers()
      ]);
      
      setStats({
        youtube,
        tiktok,
        instagram,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error("Error fetching social media stats:", error);
      setStats(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error : new Error("Unknown error")
      }));
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    fetchStats();
    
    // Set up interval for periodic refreshing
    const intervalId = setInterval(fetchStats, refreshInterval);
    
    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return stats;
};
