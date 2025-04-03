/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/config";
import { useEffect } from "react";

const useFacebookPixel = () => {
  useEffect(() => {
    const loadFacebookPixel = async () => {
      console.log("Loading Facebook Pixel...");

      try {
        const settingsData = localStorage.getItem("settingsClient");
        let settings = settingsData ? JSON.parse(settingsData) : null;
        if (!settings) {
          const settingsJson = await fetch(`${API_URL}/settings/client`);
          settings = await settingsJson.json();

          localStorage.setItem("settingsClient", JSON.stringify(settings));
        }
        if (!settings.facebookPixelId) {
          console.log("Facebook Pixel ID not found in settings.");
          return;
        }
        const script = document.createElement("script");
        script.src = "https://connect.facebook.net/en_US/fbevents.js";
        script.async = true;
        document.body.appendChild(script);

        (window as any).fbq = (window as any).fbq || [];
        (window as any).fbq.push(["init", settings.facebookPixelId]);
        (window as any).fbq.push(["track", "PageView"]);
        console.log(
          "Facebook Pixel loaded successfully.",
          settings.facebookPixelId
        );
      } catch (error) {
        console.log("Error loading Facebook Pixel:", error);
      }
    };

    loadFacebookPixel();
  }, []);
};

export default useFacebookPixel;
