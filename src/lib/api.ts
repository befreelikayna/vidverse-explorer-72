
export interface Video {
  title: string;
  url: string;
  thumbnail: string;
  uploaderName: string;
  uploaderUrl: string;
  uploaderAvatar: string;
  views: number;
  uploadedDate: string;
}

export interface ChannelResponse {
  videos: Video[];
  nextpage: string | null;
}

export const searchVideos = async (query: string = "", nextpage: string | null = null): Promise<ChannelResponse> => {
  try {
    // If there's a search query, use it, otherwise fetch from the specific channel
    if (query.trim()) {
      const response = await fetch(`https://pipedapi.reallyaweso.me/search?q=${encodeURIComponent(query)}&filter=videos`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      return { 
        videos: Array.isArray(data) ? data : [],
        nextpage: null // Search doesn't support pagination in the current API
      };
    } else {
      // Fetch videos from KIMMISO's channel with pagination support
      const channelId = "UClrGKMnK9lvo83f_vl-O-RQ";
      
      let url = `https://pipedapi.reallyaweso.me/channel/${channelId}`;
      if (nextpage) {
        url = `https://pipedapi.reallyaweso.me/nextpage/channel/${encodeURIComponent(nextpage)}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Channel API Error:', errorData);
        throw new Error('Failed to fetch channel videos');
      }
      
      const data = await response.json();
      return {
        videos: Array.isArray(data.relatedStreams) ? data.relatedStreams : [],
        nextpage: data.nextpage || null
      };
    }
  } catch (error) {
    console.error('Error fetching videos:', error);
    return { videos: [], nextpage: null };
  }
};
