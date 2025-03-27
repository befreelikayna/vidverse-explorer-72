
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  updateSocialMediaLinks, 
  updateBusinessEmail 
} from "@/lib/socialMedia";
import { LogOut, Save, ExternalLink } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/@kimmiso");
  const [tiktokUrl, setTiktokUrl] = useState("https://www.tiktok.com/@kimmiso94");
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/kimmiso1194/");
  const [businessEmail, setBusinessEmail] = useState("business.kimmiso@gmail.com");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin");
  };

  const handleSaveLinks = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateSocialMediaLinks(youtubeUrl, tiktokUrl, instagramUrl);
      toast({
        title: "Success",
        description: "Social media links updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update social media links",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateBusinessEmail(businessEmail);
      toast({
        title: "Success",
        description: "Business email updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update business email",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {/* Social Media Links Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
            <form onSubmit={handleSaveLinks} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">YouTube URL</label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    placeholder="YouTube URL"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(youtubeUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">TikTok URL</label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    placeholder="TikTok URL"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(tiktokUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Instagram URL</label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Instagram URL"
                    required
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => window.open(instagramUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Links"}
              </Button>
            </form>
          </div>
          
          {/* Business Contact Section */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Business Contact</h2>
            <form onSubmit={handleSaveEmail} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-400">Business Email</label>
                <Input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="Business Email"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Email"}
              </Button>
            </form>
          </div>
          
          {/* Subscriber Stats Info */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Subscriber Statistics</h2>
            <p className="text-gray-400 mb-2">
              The subscriber counts on the homepage are automatically updated every 5 seconds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-red-400">YouTube</h3>
                <p className="text-xl mt-2">1.49M subscribers</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-white">TikTok</h3>
                <p className="text-xl mt-2">1.3M followers</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-pink-400">Instagram</h3>
                <p className="text-xl mt-2">843K followers</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Note: The actual counts are mocked in this version. In a production environment, 
              these would be fetched from the respective platform APIs.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
