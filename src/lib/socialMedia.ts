
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

// Real-world function to fetch YouTube subscribers - using mock data with real counts
const fetchYouTubeSubscribers = async (): Promise<number> => {
  // For a real implementation, this would call the YouTube API
  // Using the actual count of 1.49M as requested
  return 1490000;
};

// Real-world function to fetch TikTok subscribers - using mock data with real counts
const fetchTikTokSubscribers = async (): Promise<number> => {
  // For a real implementation, this would call the TikTok API
  // Using the actual count of 1.3M as requested
  return 1300000;
};

// Real-world function to fetch Instagram subscribers - using mock data with real counts
const fetchInstagramSubscribers = async (): Promise<number> => {
  // For a real implementation, this would call the Instagram API
  // Using the actual count of 843K as requested
  return 843000;
};

// Custom hook to fetch and refresh social media stats
export const useSocialMediaStats = (refreshInterval = 5000): SocialMediaStats => {
  const [stats, setStats] = useState<SocialMediaStats>({
    youtube: 1490000, // Initial values with the real counts
    tiktok: 1300000,
    instagram: 843000,
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
    
    // Set up interval for periodic refreshing - using 5 seconds for more frequent updates
    const intervalId = setInterval(fetchStats, refreshInterval);
    
    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, [refreshInterval]);

  return stats;
};

// Authentication for admin panel
export const authenticateAdmin = (username: string, password: string): boolean => {
  return username === "nadinadi" && password === "0644782611";
};

// Mock function to save content updates
export const updateSocialMediaLinks = async (
  youtubeUrl: string, 
  tiktokUrl: string, 
  instagramUrl: string
): Promise<boolean> => {
  // In a real implementation, this would update a database
  console.log("Updated social media links:", { youtubeUrl, tiktokUrl, instagramUrl });
  return true;
};

// Mock function to save business email
export const updateBusinessEmail = async (email: string): Promise<boolean> => {
  // In a real implementation, this would update a database
  console.log("Updated business email:", email);
  return true;
};
