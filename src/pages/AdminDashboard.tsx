
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { 
  updateSocialMediaLinks, 
  updateBusinessEmail,
  updateThemeSettings,
  updateGoogleAdsCode
} from "@/lib/socialMedia";
import { LogOut, Save, ExternalLink, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/@kimmiso");
  const [tiktokUrl, setTiktokUrl] = useState("https://www.tiktok.com/@kimmiso94");
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/kimmiso1194/");
  const [businessEmail, setBusinessEmail] = useState("business.kimmiso@gmail.com");
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [themeColor, setThemeColor] = useState(localStorage.getItem("themeColor") || "blue");
  const [googleAdsCode, setGoogleAdsCode] = useState(localStorage.getItem("googleAdsCode") || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";
    if (!isAuthenticated) {
      navigate("/admin");
    }
    
    // Set initial theme based on localStorage
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [navigate, isDarkMode]);

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
  
  const handleSaveThemeSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateThemeSettings(isDarkMode, themeColor);
      document.documentElement.classList.toggle("dark", isDarkMode);
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
      localStorage.setItem("themeColor", themeColor);
      
      toast({
        title: "Success",
        description: "Theme settings updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update theme settings",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSaveGoogleAds = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateGoogleAdsCode(googleAdsCode);
      localStorage.setItem("googleAdsCode", googleAdsCode);
      
      toast({
        title: "Success",
        description: "Google Ads code updated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update Google Ads code",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
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
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
            <form onSubmit={handleSaveLinks} className="space-y-4">
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>YouTube URL</label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
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
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>TikTok URL</label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
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
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Instagram URL</label>
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
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
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-lg font-semibold mb-4">Business Contact</h2>
            <form onSubmit={handleSaveEmail} className="space-y-4">
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Business Email</label>
                <Input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
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
          
          {/* Theme Settings */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
            <form onSubmit={handleSaveThemeSettings} className="space-y-4">
              <div className="flex items-center justify-between">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </label>
                <div className="flex items-center space-x-2">
                  <Sun className={`h-4 w-4 ${!isDarkMode ? 'text-yellow-500' : ''}`} />
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                  />
                  <Moon className={`h-4 w-4 ${isDarkMode ? 'text-blue-400' : ''}`} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Theme Color</label>
                <Select
                  value={themeColor}
                  onValueChange={setThemeColor}
                >
                  <SelectTrigger className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}>
                    <SelectValue placeholder="Select theme color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Theme Settings"}
              </Button>
            </form>
          </div>
          
          {/* Google Ads Code */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-lg font-semibold mb-4">Google Ads</h2>
            <form onSubmit={handleSaveGoogleAds} className="space-y-4">
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Google Ads Code</label>
                <Textarea
                  value={googleAdsCode}
                  onChange={(e) => setGoogleAdsCode(e.target.value)}
                  className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} h-40`}
                  placeholder="Paste your Google Ads code here"
                />
                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  Google Ads will appear between videos on the homepage
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Google Ads Code"}
              </Button>
            </form>
          </div>
          
          {/* Subscriber Stats Info */}
          <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md lg:col-span-2`}>
            <h2 className="text-lg font-semibold mb-4">Subscriber Statistics</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
              The subscriber counts on the homepage are automatically updated every 5 seconds.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg`}>
                <h3 className="font-medium text-red-400">YouTube</h3>
                <p className="text-xl mt-2">1.49M subscribers</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg`}>
                <h3 className="font-medium">TikTok</h3>
                <p className="text-xl mt-2">1.3M followers</p>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-lg`}>
                <h3 className="font-medium text-pink-400">Instagram</h3>
                <p className="text-xl mt-2">843K followers</p>
              </div>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'} mt-4`}>
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
