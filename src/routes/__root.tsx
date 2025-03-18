import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not Foundx</div>,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div></div>
      <Outlet />
    </React.Fragment>
  );
}
