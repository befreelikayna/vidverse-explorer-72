
interface InstagramPost {
  id: string;
  mediaUrl: string;
  caption: string;
  timestamp: string;
  permalink: string;
}

// Function to fetch Instagram posts using the Instagram Basic Display API
export const fetchInstagramPosts = async (): Promise<InstagramPost[]> => {
  try {
    const instagramUsername = localStorage.getItem("instagramUsername") || "kimmiso1194";
    const accessToken = localStorage.getItem("instagramAccessToken");
    
    if (!accessToken) {
      console.log("No Instagram access token found, using placeholder data");
      // Return placeholder data if no access token is available
      return Array(12).fill(null).map((_, index) => ({
        id: `post-${index}`,
        mediaUrl: `https://picsum.photos/500/500?random=${index}`,
        caption: `Instagram post caption ${index}`,
        timestamp: new Date().toISOString(),
        permalink: `https://www.instagram.com/${instagramUsername}/`
      }));
    }
    
    // Use Instagram Graph API with the access token
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error(`Instagram API returned ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data)) {
      throw new Error("Invalid response format from Instagram API");
    }
    
    return data.data
      .filter((post: any) => post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM")
      .map((post: any) => ({
        id: post.id,
        mediaUrl: post.media_url,
        caption: post.caption || "",
        timestamp: post.timestamp,
        permalink: post.permalink
      }));
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    
    // Return placeholder data in case of error
    const instagramUsername = localStorage.getItem("instagramUsername") || "kimmiso1194";
    return Array(12).fill(null).map((_, index) => ({
      id: `post-${index}`,
      mediaUrl: `https://picsum.photos/500/500?random=${index}`,
      caption: `Instagram post caption ${index}`,
      timestamp: new Date().toISOString(),
      permalink: `https://www.instagram.com/${instagramUsername}/`
    }));
  }
};

// Function to save Instagram configuration
export const updateInstagramConfig = async (
  username: string, 
  accessToken: string
): Promise<boolean> => {
  try {
    localStorage.setItem("instagramUsername", username);
    localStorage.setItem("instagramAccessToken", accessToken);
    return true;
  } catch (error) {
    console.error("Error saving Instagram config:", error);
    return false;
  }
};
