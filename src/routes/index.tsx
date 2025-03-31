import SectionFive from "@/components/purfect/section-five";
import SectionFour from "@/components/purfect/section-four";
import SectionOne from "@/components/purfect/section-one";
import SectionSeven from "@/components/purfect/section-seven";
import SectionSix from "@/components/purfect/section-six";
import SectionThree from "@/components/purfect/section-three";
import SectionTwo from "@/components/purfect/section-two";
import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  // Removed meta property as it is not recognized
});

function RouteComponent() {
  return (
    <MainLayout>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
    </MainLayout>
  );
}
