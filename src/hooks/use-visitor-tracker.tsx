import { API_URL } from "@/config";
import { useEffect } from "react";
export const VISIT_TRACKER_KEY = "visitor-tracked";
export function useVisitorTracker() {
  useEffect(() => {
    // Nếu đã gửi rồi trong session này thì bỏ qua
    if (sessionStorage.getItem(VISIT_TRACKER_KEY)) return;

    const getLocation = async () => {
      try {
        const response = await fetch("https://ipwho.is/");
        const data = await response.json();

        const payload = {
          country: data.country_code,
          city: data.region || "Unknown",
        };

        await fetch(`${API_URL}/client/track-visit`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        // Đánh dấu đã gửi
        sessionStorage.setItem(VISIT_TRACKER_KEY, JSON.stringify(payload));
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    getLocation();
  }, []);
}
