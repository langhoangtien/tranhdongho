import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

export default function SectionOne() {
  return (
    <div className="flex flex-col">
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full flex h-[80vh] min-h-[420px] bgo-responsive relative items-start  justify-start md:px-40 lg:px-80 sm:px-32  md:items-center aspect-video"
      >
        <div className="absolute inset-0 bg-black/35"></div>
        <div className="flex w-full p-4 md:justify-start justify-center">
          {" "}
          <div className="relative flex flex-col justify-start  text-center md:text-left space-y-4 max-w-lg">
            <p className="md:text-5xl text-3xl font-semibold">
              Complete vitality bundle
            </p>
            <p className="hidden md:block">
              Unlock 50+ essential minerals & optimize vitality with our Seamoss
              & Shilajit bundle. Start your OptiLife ™ Today
            </p>
            <p className="md:hidden">
              Unlock 50+ essential minerals & optimize vitality with our Seamoss
              & Shilajit bundle.{" "}
            </p>
            <div className="flex flex-col space-y-2  md:space-y-4 items-center md:items-start ">
              <Link to={"/products/optilife-blend"}>
                <Button
                  size="lg"
                  className="rounded-full flex items-center justify-between"
                >
                  <span> Start your OptiLife ™ Today</span>
                  <ArrowRightIcon size={24} />
                </Button>
              </Link>
              <div className="flex flex-col  space-y-2">
                <img
                  width={100}
                  height={100}
                  className="hidden w-32 md:block"
                  alt="stars.png_"
                  src="https://cdn.shopify.com/s/files/1/0840/0158/7493/files/stars_139x.png?v=1712073082"
                />
                <img
                  width={100}
                  height={100}
                  className="md:hidden w-28"
                  alt="Rectangle 7-1.png__PID:d090d6a0-10ee-4d8c-85cd-b2f02d3b7299"
                  src="https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Rectangle_7-1_225x.png?v=1712073082"
                />
                <h3>
                  4.9/5 out of 24,340 <u>Verified</u> Reviews
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
