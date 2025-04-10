
import { useEffect, useRef, useState } from "react";

export const GoogleAdComponent = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  // Generate random view count and date
  const [viewCount] = useState(() => Math.floor(Math.random() * 500000) + 50000);
  const [daysAgo] = useState(() => Math.floor(Math.random() * 30) + 1);
  
  useEffect(() => {
    // Create AdSense script and ad elements
    const createAdElements = () => {
      if (adContainerRef.current) {
        try {
          // Clear any existing content
          if (adContainerRef.current.firstChild) {
            adContainerRef.current.innerHTML = '';
          }
          
          // Create script element for AdSense
          const script1 = document.createElement('script');
          script1.async = true;
          script1.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8057061371686914";
          script1.crossOrigin = "anonymous";
          
          // Create ins element for the ad
          const ins = document.createElement('ins');
          ins.className = "adsbygoogle";
          ins.style.display = "block";
          ins.style.textAlign = "center";
          ins.setAttribute("data-ad-layout", "in-article");
          ins.setAttribute("data-ad-format", "fluid");
          ins.setAttribute("data-ad-client", "ca-pub-8057061371686914");
          ins.setAttribute("data-ad-slot", "4922702347");
          
          // Create script to push the ad
          const script2 = document.createElement('script');
          script2.innerHTML = "(adsbygoogle = window.adsbygoogle || []).push({});";
          
          // Append elements to the container
          adContainerRef.current.appendChild(script1);
          adContainerRef.current.appendChild(ins);
          adContainerRef.current.appendChild(script2);
        } catch (error) {
          console.error("Error creating AdSense elements:", error);
        }
      }
    };
    
    // Call the function to create ad elements
    createAdElements();
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
            {/* The AdSense ad will be injected here */}
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
