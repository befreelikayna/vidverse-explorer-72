
import { AppHeader } from "@/components/AppHeader";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import { useIsMobile } from "@/hooks/use-mobile";
import { GoogleAdComponent } from "@/components/GoogleAdComponent";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [youtube, setYoutube] = useState(1490000);
  const [tiktok, setTiktok] = useState(1300000);
  const [instagram, setInstagram] = useState(843000);

  const formatSubscriberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <AppHeader 
          youtube={youtube}
          tiktok={tiktok}
          instagram={instagram}
          statsLoading={statsLoading}
          borderColorClass={isDarkMode ? 'border-purple-500' : 'border-pink-500'}
          isDarkMode={isDarkMode}
          formatSubscriberCount={formatSubscriberCount}
        />

        <main className="mt-8 mb-24">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 md:p-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="mb-4">
                At kimmiso.kr, accessible from https://kimmiso.kr, we prioritize the privacy of our visitors. This Privacy Policy outlines the types of information we collect and how we use it.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">1. Information We Collect</h2>
              <p className="mb-2">We may collect personal information, such as:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li><strong>Personal Identification Information:</strong> Name, email address, and other contact details when voluntarily submitted by visitors.</li>
                <li><strong>Non-Personal Identification Information:</strong> Browser type, Internet Service Provider (ISP), referring/exit pages, and date/time stamps.</li>
                <li><strong>Cookies and Web Beacons:</strong> To enhance user experience, we use cookies to store information about visitors' preferences and pages they access or visit.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">2. How We Use Collected Information</h2>
              <p className="mb-2">We use the collected information for various purposes, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>To operate and maintain our website.</li>
                <li>To improve user experience by analyzing how visitors use our website.</li>
                <li>To personalize content and advertising.</li>
                <li>To communicate with users, respond to inquiries, and provide support.</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">3. Google AdSense and Third-Party Advertising</h2>
              <p className="mb-4">
                We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on users' prior visits to our website and other sites on the Internet.
              </p>
              <p className="mb-2"><strong>Google's Use of Cookies:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.</p>
              <p className="mb-4"><strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google Ads Settings. Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting www.aboutads.info.</p>
              <p className="mb-4">
                We may also use other third-party advertising networks that utilize cookies to serve ads on our site. We recommend reviewing their respective privacy policies for more information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">4. Third-Party Privacy Policies</h2>
              <p className="mb-4">
                Our Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective privacy policies of these third-party ad servers for more detailed information.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-3">5. Data Protection Rights</h2>
              <p className="mb-2">
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
                <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
              </ul>
            </div>
            
            <div className="mt-8">
              <GoogleAdComponent />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
