import SectionOne from "@/components/purfect/section-one";
import SectionThree from "@/components/purfect/section-three";
import SectionTwo from "@/components/purfect/section-two";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
    </div>
  );
}
