import {
  CaroselIndex,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselThumb,
} from "@/components/ui/carousel";

import { CardContent } from "@/components/ui/card";
import Image from "@/components/image";

export default function ProductDetailCarousel({
  slides,
}: {
  slides: string[];
}) {
  if (!slides || !slides.length) return null;
  return (
    <div className="bg-transparent  md:mr-8 ">
      <Carousel>
        <div className="relative h-auto group shrink-0 md:max-w-[805px] md:basis-[805px]">
          <CaroselIndex />
          <CarouselContent>
            {slides.map((image: string) => (
              <CarouselItem key={image}>
                <div className="p-1">
                  <CardContent className="flex md:w-full aspect-[1/1] items-center justify-center rounded-md p-0">
                    <Image
                      alt="Product Image"
                      width={800}
                      height={800}
                      src={image}
                      className="object-cover w-full h-full rounded-md"
                      dimension={800}
                    />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="opacity-0 group-hover:opacity-100 hover:opacity-100 transition-all duration-500" />
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>

        <CarouselThumb slides={slides} />
      </Carousel>
    </div>
  );
}
