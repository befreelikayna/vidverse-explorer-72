
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdCode {
  id: string;
  name: string;
  code: string;
}

export const AdsManagementAdmin = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [adCodes, setAdCodes] = useState<AdCode[]>([
    {
      id: "banner",
      name: "Banner Ad",
      code: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8057061371686914" crossorigin="anonymous"></script>
<!-- watch ad  banner kim -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-8057061371686914"
     data-ad-slot="8217221150"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    },
    {
      id: "in-article",
      name: "In-Article Ad",
      code: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8057061371686914" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-8057061371686914"
     data-ad-slot="4922702347"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    },
    {
      id: "fluid",
      name: "Fluid Ad",
      code: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8057061371686914" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-6t+ed+2i-1n-4w"
     data-ad-client="ca-pub-8057061371686914"
     data-ad-slot="1561750259"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>`
    }
  ]);

  useEffect(() => {
    // Load ad codes from localStorage
    const storedAdCodes = localStorage.getItem('adCodes');
    if (storedAdCodes) {
      try {
        const parsedAdCodes = JSON.parse(storedAdCodes);
        if (Array.isArray(parsedAdCodes)) {
          setAdCodes(parsedAdCodes);
        }
      } catch (e) {
        console.error("Error parsing ad codes data:", e);
      }
    }
  }, []);

  const handleAdCodeChange = (id: string, newCode: string) => {
    setAdCodes(prevCodes => 
      prevCodes.map(code => 
        code.id === id ? { ...code, code: newCode } : code
      )
    );
  };

  const handleSaveAdCodes = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage
      localStorage.setItem('adCodes', JSON.stringify(adCodes));
      
      toast({
        title: "Success",
        description: "Ad codes saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save ad codes",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <h2 className="text-lg font-semibold mb-4">Google AdSense Management</h2>
      
      <Tabs defaultValue="banner" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="banner">Banner Ad</TabsTrigger>
          <TabsTrigger value="in-article">In-Article Ad</TabsTrigger>
          <TabsTrigger value="fluid">Fluid Ad</TabsTrigger>
        </TabsList>
        
        {adCodes.map((adCode) => (
          <TabsContent key={adCode.id} value={adCode.id} className="space-y-4">
            <div className="space-y-2">
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {adCode.name} Code
              </label>
              <Textarea
                value={adCode.code}
                onChange={(e) => handleAdCodeChange(adCode.id, e.target.value)}
                className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'} h-64 font-mono text-sm`}
                placeholder={`Paste your ${adCode.name} code here`}
              />
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                This ad will appear on the site according to its placement settings
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <Button 
        onClick={handleSaveAdCodes} 
        className="w-full mt-6 flex items-center justify-center gap-2"
        disabled={isSaving}
      >
        <Save className="h-4 w-4" />
        {isSaving ? "Saving..." : "Save All Ad Codes"}
      </Button>
      
      <div className={`mt-4 p-4 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <h3 className="text-sm font-medium mb-2">About Google AdSense</h3>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          These ad codes are embedded directly in the HTML. After saving, the changes will take effect on the next page reload.
          You can modify the ad codes here to update your AdSense implementation.
        </p>
      </div>
    </div>
  );
};
