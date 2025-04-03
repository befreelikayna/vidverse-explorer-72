
import { useEffect, useRef, useState } from "react";

export const GoogleAdComponent = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  // Generate random view count and date
  const [viewCount] = useState(() => Math.floor(Math.random() * 500000) + 50000);
  const [daysAgo] = useState(() => Math.floor(Math.random() * 30) + 1);
  
  useEffect(() => {
    // Get Google Ads code from localStorage
    const googleAdsCode = localStorage.getItem("googleAdsCode");
    
    if (googleAdsCode && adContainerRef.current) {
      // Create a script element to inject the Google Ads code
      const script = document.createElement('script');
      script.async = true;
      script.innerHTML = googleAdsCode;
      
      // Clear any existing content
      if (adContainerRef.current.firstChild) {
        adContainerRef.current.innerHTML = '';
      }
      
      // Inject the script
      adContainerRef.current.appendChild(script);
    }
  }, []);
  
  return (
    <div className="w-full h-full">
      <div 
        className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      >
        <div className="aspect-video rounded-lg overflow-hidden mb-3">
          <div 
            ref={adContainerRef} 
            className="w-full h-full flex items-center justify-center bg-gray-800 relative"
          >
            {!localStorage.getItem("googleAdsCode") && (
              <div className="text-center p-4">
                <img 
                  src="/lovable-uploads/3dd0dc6b-23f5-4799-a1e9-f3aa4c821d6e.png" 
                  alt="Google Ads" 
                  className="mx-auto max-w-full max-h-full object-contain" 
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <img
            src="/lovable-uploads/539de762-71b5-4183-9e88-1071a8c6ea5c.png"
            alt="KimMiso"
            className="w-9 h-9 rounded-full"
          />
          <div>
            <h3 className="font-medium text-white line-clamp-2 group-hover:text-blue-400">
              Sponsored Content
            </h3>
            <p className="text-sm text-gray-400 mt-1">KimMiso</p>
            <div className="text-sm text-gray-400 flex items-center gap-2">
              <span>{viewCount.toLocaleString()} views</span>
              <span>•</span>
              <span>{daysAgo} {daysAgo === 1 ? 'day' : 'days'} ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-2">Advertisement</div>
    </div>
  );
};
