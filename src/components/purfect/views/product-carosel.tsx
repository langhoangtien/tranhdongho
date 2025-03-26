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

export default function ProductDetailCarousel({
  slides,
}: {
  slides: string[];
}) {
  if (!slides || !!slides.length) return <p>g</p>;
  return (
    <div className="bg-transparent md:max-w-[475px] md:mr-8 ">
      <Carousel>
        <div className="relative h-auto group shrink-0 md:max-w-[805px] md:basis-[805px]">
          <CaroselIndex />
          <CarouselContent>
            {slides.map((image: string) => (
              <CarouselItem key={image}>
                <div className="p-1">
                  <CardContent className="flex md:w-[475px] aspect-[1/1] items-center justify-center rounded-xl p-0">
                    <img
                      alt="Product Image"
                      width={800}
                      height={800}
                      src={image}
                      className="object-cover w-full h-full rounded-xl"
                    />
                  </CardContent>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>

        <CarouselThumb slides={slides} />
      </Carousel>
    </div>
  );
}
