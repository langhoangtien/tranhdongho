import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import StarIcon from "../icons/star-icon";
import StarThreeQuaterIcon from "../icons/star-three-quarter";
import { PRODUCT_NAME } from "@/config";

export const StarRating = ({
  className = "flex space-x-1",
  iconSize = "size-5",
}: {
  className?: string;
  iconSize?: string;
}) => (
  <span className={className}>
    <StarIcon className={iconSize} />
    <StarIcon className={iconSize} />
    <StarIcon className={iconSize} />
    <StarIcon className={iconSize} />
    <StarThreeQuaterIcon className={iconSize} />
  </span>
);
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
          <div className="relative flex flex-col text-white justify-start  text-center md:text-left space-y-4 max-w-lg">
            <p className="md:text-5xl text-3xl font-semibold">
              Complete vitality bundle
            </p>
            <p className="hidden md:block">
              Unlock 50+ essential minerals & optimize vitality with our Seamoss
              & Shilajit bundle. Start your {PRODUCT_NAME} ™ Today
            </p>
            <p className="md:hidden">
              Unlock 50+ essential minerals & optimize vitality with our Seamoss
              & Shilajit bundle.{" "}
            </p>
            <div className="flex flex-col space-y-2  md:space-y-4 items-center md:items-start ">
              <Link to={"/products/purfect-fuel-blend"}>
                <Button
                  size="lg"
                  className="h-14 flex items-center justify-between"
                >
                  <span> Start your {PRODUCT_NAME} ™ Today</span>
                  <ArrowRightIcon size={24} />
                </Button>
              </Link>
              <div className="flex flex-col  space-y-2">
                <StarRating />

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
