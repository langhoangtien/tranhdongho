/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from "@/config";
import { useEffect } from "react";

const FacebookPixel = () => {
  useEffect(() => {
    const initFacebookPixel = async () => {
      try {
        const settings = await fetch(`${API_URL}/settings/client`);
        const settingsJson = await settings.json();
        const fbpId = settingsJson.facebookPixelId;
        if (!fbpId) {
          console.log("Facebook Pixel ID not found in settings.");
          return;
        }
        const fbq = (window as any).fbq;

        if (fbq) return;

        (window as any).fbq = function () {
          (window as any).fbq.callMethod
            ? (window as any).fbq.callMethod.apply(
                (window as any).fbq,
                arguments
              )
            : (window as any).fbq.queue.push(arguments);
        };

        (window as any).fbq.push = (window as any).fbq;
        (window as any).fbq.loaded = true;
        (window as any).fbq.version = "2.0";
        (window as any).fbq.queue = [];

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://connect.facebook.net/en_US/fbevents.js";

        const noscript = document.createElement("noscript");
        const img = document.createElement("img");
        img.height = 1;
        img.width = 1;
        img.style.display = "none";
        img.src = `https://www.facebook.com/tr?id=${fbpId}&ev=PageView&noscript=1`;

        noscript.appendChild(img);

        document.body.appendChild(script);
        document.body.appendChild(noscript);

        (window as any).fbq("init", fbpId);
        (window as any).fbq("track", "PageView");
        console.log("Facebook Pixel loaded successfully.", fbpId);
      } catch (error) {
        console.log("Cannot load Facebook Pixel script.", error);
      }
    };
    initFacebookPixel();
  }, []);

  return null;
};

export default FacebookPixel;
