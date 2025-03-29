
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Save, Plus, X } from "lucide-react";

export const NewsTickerAdmin = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { toast } = useToast();
  const [newsItems, setNewsItems] = useState<string[]>([
    "Welcome to KimMiso's channel!", 
    "New videos every Friday", 
    "Subscribe for more content"
  ]);
  const [newItem, setNewItem] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load news items from localStorage
    const storedNews = localStorage.getItem('newsTickerItems');
    if (storedNews) {
      try {
        const parsedNews = JSON.parse(storedNews);
        if (Array.isArray(parsedNews)) {
          setNewsItems(parsedNews);
        }
      } catch (e) {
        console.error("Error parsing news ticker data:", e);
      }
    }
  }, []);

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    
    setNewsItems([...newsItems, newItem.trim()]);
    setNewItem("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...newsItems];
    updatedItems.splice(index, 1);
    setNewsItems(updatedItems);
  };

  const handleSaveItems = () => {
    setIsSaving(true);
    
    try {
      localStorage.setItem('newsTickerItems', JSON.stringify(newsItems));
      
      toast({
        title: "Success",
        description: "News ticker items saved successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save news ticker items",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} p-6 rounded-lg shadow-md`}>
      <h2 className="text-lg font-semibold mb-4">News Ticker Settings</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a new ticker item"
            className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'}`}
          />
          <Button 
            onClick={handleAddItem} 
            size="icon"
            disabled={!newItem.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {newsItems.map((item, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-2 rounded ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <span className="truncate">{item}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveItem(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {newsItems.length === 0 && (
            <p className={`text-center py-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              No news items added yet
            </p>
          )}
        </div>
        
        <Button 
          onClick={handleSaveItems} 
          className="w-full flex items-center justify-center gap-2"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save News Ticker"}
        </Button>
      </div>
    </div>
  );
};
