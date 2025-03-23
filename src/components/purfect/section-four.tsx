import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import React from "react";
import StarIcon from "../icons/star-icon";
import { StarRating } from "./section-one";
const works = [
  {
    image: "/purfect/img8.avif",
    description: "Take your dosage",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/handsome-man-with-medicines-and-glass-of-water-is-2023-11-27-05-00-36-utc_copy_2.png?v=1712073082",
    description: "Absortion & nutrient delivery",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Hue_Saturation_2.png?v=1712073082",
    description: "Biological effects",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/happy-shirtless-guy-smiling-while-posing-with-cott-2023-11-27-05-20-03-utc.png?v=1712073082",
    description: "Enjoy the benefits of an enhanced life",
  },
];
const sources = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_18.png?v=1712073082",
    description:
      "Seamoss provides an array of essential minerals vital for overall bodily functions, supporting everything from bone health to enzyme activity.",
    title: "Mineral Support",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_20.png?v=1712073082",
    description:
      "Shilajit facilitates the regulation of hormonal balance, particularly in the male testosterone levels, contributing to well-being and equilibrium",
    title: "Testosterone Enhancement",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/ashwagandha-2023-11-27-04-59-36-utc_485d58ec-3eca-4b3b-bfd6-8e2b0f4979b7.png?v=1712085430",
    description:
      "Ashwagandha aids in stress reduction and supports cognitive function, enhancing focus and mental clarity.",
    title: "Stress & Cognitive Support",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Fresh_Ginseng_Root.J14.2k.png?v=1712073083",
    description:
      "Ginseng boosts energy levels and reduces fatigue, supporting endurance and stamina throughout the day... and night.",
    title: "Energy Booster",
  },
];
interface ProductCardProps {
  image: string;
  rating: string;
  reviews: string;
  title: string;
  description: string;
  benefits: string[];
  buttonColor: string;
  checkColor: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  rating,
  reviews,
  title,
  description,
  benefits,
  buttonColor,
  checkColor,
}) => {
  return (
    <div className="p-4 border rounded-lg space-y-4 ">
      <div className="flex justify-center">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full aspect-square rounded-lg"
        />
      </div>
      <div className="flex items-center space-x-2 justify-center">
        <StarRating className="flex space-x-1 text-primary" iconSize="size-5" />
        <span>({rating})</span>
        <a href="#" className="text-accent-foreground underline">
          {reviews}
        </a>
      </div>
      <h2 className="text-2xl font-bold text-foreground text-center">
        {title}
      </h2>
      <p className="text-center">{description}</p>
      <ul className="space-y-2 ">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center text-lg space-x-2">
            <Check strokeWidth={3.5} className={checkColor} size={28} />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <Link
          to="/products/purfect-fuel-blend"
          className={`md:px-16 px-6 py-4 ${buttonColor} text-white rounded-full text-lg font-medium hover:opacity-90 transition`}
        >
          Try Now
        </Link>
        <Link
          to="/products/purfect-fuel-blend"
          className="text-primary hover:text-primary px-2 hover:border-primary font-semibold border-b-2"
        >
          Learn <br /> more
        </Link>
      </div>
    </div>
  );
};

export default function SectionFour() {
  return (
    <div className="w-full flex flex-col space-y-16 max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 md:p-6">
        <ProductCard
          image="/purfect/img5.avif"
          rating="4.9"
          reviews="30,405"
          title="24 in 1 - Dynamic Vitality Bundle"
          description="Crafted with precision, our Dynamic Vitality Bundle is formulated to provide you with a comprehensive solution for optimal health and vitality. Here's what it includes:"
          benefits={[
            "Promotes overall wellness",
            "Enhances energy levels",
            "Boosts immune system",
          ]}
          buttonColor="bg-primary"
          checkColor="text-primary"
        />
        <ProductCard
          image="/purfect/img7.avif"
          rating="4.8"
          reviews="12,839"
          title="16 In 1 - Sea Moss Bundle"
          description="Our Sea Moss Bundle combines the power of nature's superfoods to support your health and well-being. Here's what it offers:"
          benefits={[
            "Promotes overall wellness",
            "Supports healthy glowing skin",
            "Supports Healthy Testosterone",
          ]}
          buttonColor="bg-black"
          checkColor="text-accent-foreground"
        />
      </div>
      <div className="w-full max-w-xl flex flex-col space-y-6 justify-center items-center mx-auto">
        <p className="text-xl italic font-sans  ">
          “I’m a guy who struggled with low testosterone and this stuff gives me
          an unreal kick to life”
        </p>
        <img
          className="size-18 object-contain rounded-full "
          src="https://cdn.shopify.com/s/files/1/0840/0158/7493/files/gfsd.png?v=1712073082"
        />
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold text-center  ">Mark W.</h2>
          <div className=" flex flex-row space-x-1 items-center text-primary">
            {" "}
            <StarIcon strokeWidth={1.25} className="size-4" />
            <StarIcon strokeWidth={1.25} className="size-4" />
            <StarIcon strokeWidth={1.25} className="size-4" />
            <StarIcon strokeWidth={1.25} className="size-4" />
            <StarIcon strokeWidth={1.25} className="size-4" />
            <span className="text-accent-foreground">5.0/5 Rating</span>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col space-y-8 mx-auto">
        <p className="text-5xl text-left">Here's how PurfectFuel ™ works</p>
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-4 gap-8">
          {works.map((item) => (
            <div
              key={item.image}
              className="flex flex-col items-center space-y-4 m-4 md:m-2 font-semibold "
            >
              <img
                className="rounded-full w-full aspect-square"
                src={item.image}
              />
              <p>Promotes overall wellness and vitality</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col space-y-8 mx-auto">
        <p className="text-5xl text-left ">
          Sourced from the earth’s most powerful superfoods
        </p>
        <p className="text-xl text-left ">
          Harnessing the power of nature, our supplements provide a natural
          source of essential minerals and nutrients for optimal health and
          vitality.
        </p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          {sources.map((item) => (
            <div
              key={item.image}
              className="flex flex-col rounded-3xl bg-accent items-center space-y-4 font-semibold "
            >
              <img
                className="rounded-t-xl w-full object-cover aspect-3/2"
                src={item.image}
              />
              <div className="flex flex-col p-4 space-y-2 text-left">
                <h2 className="text-2xl text-accent-foreground">
                  {item.title}
                </h2>
                <p className="">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
