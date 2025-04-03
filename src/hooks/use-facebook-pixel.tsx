/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/config";
import { useEffect } from "react";

const useFacebookPixel = () => {
  useEffect(() => {
    const loadFacebookPixel = async () => {
      console.log("Loading Facebook Pixel...");

      try {
        const fbpLocal = localStorage.getItem("fbp");
        let fbp = fbpLocal ? fbpLocal : null;
        if (!fbpLocal) {
          const settingsJson = await fetch(`${API_URL}/settings/client`);
          const settings = await settingsJson.json();
          if (!settings.facebookPixelId) {
            console.log("Facebook Pixel ID not found in settings.");
            return;
          }

          fbp = settings.facebookPixelId;
          localStorage.setItem("fbp", settings.facebookPixelId);
        }

        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        script.async = true;
        document.body.appendChild(script);

        (window as any).fbq = (window as any).fbq || [];
        (window as any).fbq.push(["init", fbp]);
        (window as any).fbq.push(["track", "PageView"]);
        console.log("Facebook Pixel loaded successfully.", fbp);
      } catch (error) {
        console.log("Error loading Facebook Pixel:", error);
      }
    };

    loadFacebookPixel();
  }, []);
};

export default useFacebookPixel;
