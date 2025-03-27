
import { useEffect, useRef } from "react";

export const GoogleAdComponent = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  
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
    <div className="w-full h-full flex items-center justify-center">
      <div 
        ref={adContainerRef} 
        className="aspect-video w-full rounded-lg overflow-hidden flex items-center justify-center bg-gray-800 relative"
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
      <div className="mt-2 text-xs text-gray-400">Advertisement</div>
    </div>
  );
};
