
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Save, ExternalLink, Instagram, RefreshCw } from "lucide-react";
import { updateInstagramConfig, fetchInstagramPosts } from "@/lib/instagram";

interface InstagramConfigAdminProps {
  isDarkMode: boolean;
}

export const InstagramConfigAdmin = ({ isDarkMode }: InstagramConfigAdminProps) => {
  const { toast } = useToast();
  const [instagramUsername, setInstagramUsername] = useState(
    localStorage.getItem("instagramUsername") || "kimmiso1194"
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("instagramAccessToken") || ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<"valid" | "invalid" | "checking" | "idle">("idle");

  useEffect(() => {
    // Automatically set the token if it's not already set
    if (!localStorage.getItem("instagramAccessToken")) {
      // For demonstration - in production, this would come from a secure source
      const defaultToken = ""; // Empty by default
      setAccessToken(defaultToken);
    }

    // Check token status on component mount
    checkTokenStatus();
  }, []);

  const checkTokenStatus = async () => {
    if (!accessToken) {
      setTokenStatus("idle");
      return;
    }
    
    setTokenStatus("checking");
    try {
      const testRequest = await fetch(
        `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
      );
      
      if (testRequest.ok) {
        const data = await testRequest.json();
        if (data.username) {
          setTokenStatus("valid");
          return;
        }
      }
      setTokenStatus("invalid");
    } catch (error) {
      setTokenStatus("invalid");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateInstagramConfig(instagramUsername, accessToken);
      await checkTokenStatus();
      
      toast({
        title: "Success",
        description: "Instagram configuration saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save Instagram configuration",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    try {
      await fetchInstagramPosts(true);
      toast({
        title: "Success",
        description: "Instagram feed refreshed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh Instagram feed",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <div className="flex items-center gap-2 mb-4">
        <Instagram className="text-pink-500" />
        <h2 className="text-lg font-semibold">Instagram Configuration</h2>
      </div>
      
      <form onSubmit={handleSave} className="space-y-4">
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Instagram Username
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              value={instagramUsername}
              onChange={(e) => setInstagramUsername(e.target.value)}
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
              placeholder="kimmiso1194"
              required
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon"
              onClick={() => window.open(`https://www.instagram.com/${instagramUsername}/`, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Instagram Access Token
          </label>
          <div className="relative">
            <Input
              type="password"
              value={accessToken}
              onChange={(e) => {
                setAccessToken(e.target.value);
                setTokenStatus("idle");
              }}
              className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} pr-20`}
              placeholder="Instagram Access Token"
            />
            {tokenStatus === "valid" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-green-500">
                Valid token
              </span>
            )}
            {tokenStatus === "invalid" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500">
                Invalid token
              </span>
            )}
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            An access token is required to fetch real Instagram posts. 
            Without it, placeholder images will be shown.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            type="submit" 
            className="flex-1 flex items-center justify-center gap-2"
            disabled={isSaving}
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Instagram Settings"}
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            disabled={isRefreshing || tokenStatus !== "valid"}
            onClick={handleRefreshFeed}
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Feed
          </Button>
        </div>
        
        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} mt-2`}>
          <p>
            To get an Instagram access token:
          </p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Create a Facebook Developer account</li>
            <li>Create an app in the Facebook Developer console</li>
            <li>Configure Instagram Basic Display API</li>
            <li>Generate an access token for your Instagram account</li>
          </ol>
          <p className="mt-2">
            For more information, visit the{" "}
            <a
              href="https://developers.facebook.com/docs/instagram-basic-display-api/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Instagram API documentation
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
