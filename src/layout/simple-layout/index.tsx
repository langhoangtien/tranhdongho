import Header from "./header";

import { ReactNode } from "react";

export default function SimpleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-80 relative h-screen flex flex-col">
      <Header />
      {children}
    </div>
  );
}
