import * as Portal from "@radix-ui/react-portal";
import { Logo } from "../logo";

// ----------------------------------------------------------------------

export function UKOSplashScreen() {
  return (
    <Portal.Root>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999999] flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div>
          <div className="relative">
            <div className="uko-loading-screen absolute left-[-2px] top-[-2px] h-[104px] w-[104px] rounded-full opacity-65 blur-[30px]"></div>
            <div className="uko-loading-screen absolute left-[-2px] top-[-2px] h-[104px] w-[104px] rounded-full"></div>
            <div className="relative z-10 box-border grid h-[100px] w-[100px] place-content-center overflow-hidden rounded-full bg-background p-8">
              <Logo width={60} height={60} />
            </div>
          </div>
        </div>
      </div>
    </Portal.Root>
  );
}
