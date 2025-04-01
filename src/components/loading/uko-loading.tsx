import * as Portal from "@radix-ui/react-portal";

// ----------------------------------------------------------------------

export function UKOSplashScreen() {
  return (
    <Portal.Root>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999999] flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <div>
          <div className="relative">
            <div className="loader"></div>
          </div>
        </div>
      </div>
    </Portal.Root>
  );
}
