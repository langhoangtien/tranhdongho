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
        className="w-full flex  h-[80vh] min-h-[420px] bg-[url(https://img.thesitebase.net/10596/10596429/products/ver_1/1721785569168.png?width=1200&height=0&min_height=0)]  relative items-start  justify-start md:px-80 md:bg-[url(https://img.thesitebase.net/10596/10596429/products/ver_1/1721785569158.png?width=1200&height=0&min_height=0)] md:items-center aspect-video"
      >
        <div className="absolute inset-0 bg-black/25"></div>
        <div className="flex w-full p-4 md:justify-start justify-center">
          {" "}
          <div className="relative flex flex-col justify-start  text-center md:text-left space-y-4  text-white max-w-lg">
            <p className="md:text-5xl text-3xl font-semibold">
              Complete vitality bundle
            </p>
            <p className="hidden md:block">
              Unlock 50+ essential minerals & optimize vitality with our Seamoss
              & Shilajit bundle. Start your PurfectFuel ™ Today
            </p>
            <p className="md:hidden">
              Unlock 50+ essential minerals & optimize vitality with our Seamoss
              & Shilajit bundle.{" "}
            </p>
            <div className="flex flex-col space-y-2  md:space-y-4 items-center md:items-start ">
              <Link to="/products/purfect-fuel-blend">
                <Button className="rounded-full flex items-center justify-between">
                  <span> Start your PurfectFuel ™ Today</span>
                  <ArrowRightIcon size={24} />
                </Button>
              </Link>
              <div className="flex flex-col  space-y-2">
                <img
                  className="hidden w-32 md:block"
                  alt="stars.png_"
                  src="https://cdn.shopify.com/s/files/1/0840/0158/7493/files/stars_139x.png?v=1712073082"
                />
                <img
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
      <div className=" w-full  mx-auto ">
        <div className="relative h-16 bg-[#46755f] overflow-hidden w-full">
          <div className="flex text-run py-4 space-x-16 ">
            {[
              "Total Wellness In a Bottle",
              "Vegan",
              "Patented Ingredients",
              "Ancient Blend",
              "30 Day Money Back Guarantee",
              "USA Made",
            ].map((item, index) => (
              <span key={index} className="whitespace-nowrap font-semibold">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
