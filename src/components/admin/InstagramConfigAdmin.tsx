
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Save, ExternalLink, Instagram } from "lucide-react";
import { updateInstagramConfig } from "@/lib/instagram";

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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateInstagramConfig(instagramUsername, accessToken);
      
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
          <Input
            type="password"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
            placeholder="Instagram Access Token"
          />
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
            An access token is required to fetch real Instagram posts. 
            Without it, placeholder images will be shown.
          </p>
        </div>
        
        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Instagram Settings"}
        </Button>
        
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
