"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselDot,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const reviews = [
  {
    name: "Ray O. | 31",
    review:
      "7 months of use and I'm amazed! Consistency pays off, seeing undeniable results.",
    before: "/products/review-1-before.png",
    after: "/products/review-1-after.png",
  },
  {
    name: "Alyssa I. | 46",
    review:
      "Tired of my widening part, I tried this device. 6 months later, my hair is stronger and thicker. Worth every penny!",
    before: "/products/review-2-before.png",
    after: "/products/review-2-after.png",
  },
  {
    name: "David H. | 39",
    review:
      "Tried numerous solutions for thinning crown. Nordic Laser Cap is the answer! Thrilled with progress so far.",
    before: "/products/review-3-before.png",
    after: "/products/review-3-after.png",
  },
  {
    name: "Joanne R. | 49",
    review:
      "Tried it all, but Nordic® Laser Cap the charm! Watching my hair return is a dream come true. Thankful!",
    before: "/products/review-4-before.png",
    after: "/products/review-4-after.png",
  },
  {
    name: "Rick L. | 36",
    review:
      "Confidence booster! Delighted with my thicker hair. The Nordic® Laser Cap is a reliable solution for receding hairlines.",
    before: "/products/review-5-before.png",
    after: "/products/review-5-after.png",
  },
  {
    name: "Jason Y. | 48",
    review:
      "This laser cap deserves applause! Revived my hair in 6 months. Finally, a solution that lives up to its promises.",
    before: "/products/review-6-before.png",
    after: "/products/review-6-after.png",
  },
  {
    name: "Stephane B. | 39",
    review:
      "Impressive results! This cap  effectively restored my hair! Convenient to use and non-invasive.",
    before: "/products/review-7-before.png",
    after: "/products/review-7-after.png",
  },
];

export function ReviewsCarosel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
      className="max-w-7xl mb-10 mx-auto px-4 group pb-[70px]"
    >
      <div className="relative md:px-10 ">
        <CarouselContent>
          {reviews.map((review) => (
            <CarouselItem
              key={review.name}
              className="basis-full md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col space-y-4 bg-gray-100  items-center p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="w-full">
                        {" "}
                        <Image
                          className="object-cover w-full rounded-t-md "
                          alt="Before"
                          src={review.before}
                          width={150}
                          height={150}
                        />
                        <p className="uppercase text-center text-sm font-semibold rounded-b-md text-white bg-black p-1">
                          before
                        </p>
                      </div>
                      <div className="w-full">
                        {" "}
                        <Image
                          className="object-cover w-full rounded-t-md"
                          alt="After"
                          src={review.after}
                          width={150}
                          height={150}
                        />
                        <p className="uppercase text-center text-sm font-semibold text-white bg-blue-500 rounded-b-md p-1">
                          during
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.review}</p>
                    <p className="text-lg w-full text-left font-semibold">
                      {review.name}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200 text-black hover:bg-white size-16 [&_svg]:size-8 absolute left-[-2rem] transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:left-0" />

        <CarouselNext className="bg-gray-200 text-black hover:bg-white size-16 [&_svg]:size-8 absolute right-[-2rem] transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:right-0" />
      </div>
      <CarouselDot />
    </Carousel>
  );
}
