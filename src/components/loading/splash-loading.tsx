import * as Portal from "@radix-ui/react-portal";

import { Logo } from "../logo";
// ----------------------------------------------------------------------

export function SplashScreen() {
  return (
    <Portal.Root>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999999] flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div>
          <div className="relative inline-flex h-[120px] w-[120px] items-center justify-center">
            <div className="logo-animate inline-flex">
              <Logo disableLink width={64} height={64} />
            </div>

            <div className="inner-circle absolute h-[calc(100%-20px)] w-[calc(100%-20px)] border-[3px] border-primary/70" />

            <div className="outer-circle absolute h-full w-full border-8 border-primary/70" />
          </div>
        </div>
      </div>
    </Portal.Root>
  );
}
