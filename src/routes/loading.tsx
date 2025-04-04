import { SplashScreen } from "@/components/loading/splash-loading";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/loading")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SplashScreen />; // Replace with your loading component
}
