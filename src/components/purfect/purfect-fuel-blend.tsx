import { useLoaderData } from "@tanstack/react-router";
import ProductDetailCarousel from "./views/product-carosel";
import { AddToCartPurfectSection } from "./views/add-to-cart-purfect";

import { Heart, TruckIcon, Undo2Icon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerCustom,
} from "@/components/ui/accordion";

import ListPaymentMethod from "../list-payment-method";
import { IProduct, IVariant } from "@/routes/admin/products";
import StarIcon from "../icons/star-icon";
import ReviewList from "../reviews";
interface IData extends IProduct {
  images: string[];
  variants: IVariant[];
}
const data = [
  {
    title: "Description",
    content:
      "Unleash the power of the ocean with our Organic Sea Moss and Shilajit, featuring highly potent clinically dosed formulas. This comprehensive formula combines 24 essential nutrients in 2 tablets, designed to enhance your overall health and vitality. Perfect for those seeking a powerful boost to their daily wellness regimen.",
  },
  {
    title: "Health Benefits",
    content:
      "Our Organic Sea Moss and Shilajit are designed to support a range of health functions, enhancing your overall well-being. From boosting your immune system to supporting thyroid function and improving skin health, these supplements are your gateway to a healthier life. Additional benefits include energy enhancement, stress reduction, and support for weight management, all contributing to a more vibrant and healthier you.",
  },
  {
    title: "How to Use",
    content: (
      <p>
        {" "}
        As a dietary supplement, take 2 tablets of Organic Sea Moss and 1
        tablets of Shilajit per day. For the best results, take with a meal and
        an 8oz glass of water or as directed by your healthcare professional.{" "}
        <br /> You may take both supplements together or take 1 in the morning
        and 1 in the evening depending on preference.{" "}
      </p>
    ),
  },
  {
    title: "Product Guarantee",
    content:
      "Experience the benefits of our Dynamic Vitality Duo risk-free with our 30-day money-back guarantee. If you’re not fully satisfied with your wellness improvement, simply return the product within 30 days for a full refund",
  },
];
export default function PufectPage() {
  const productData = useLoaderData({
    from: "/products/purfect-fuel-blend",
  });

  const product: IData = {
    ...productData,
    variants: productData.variants.map((variant: IVariant, i: number) => ({
      ...variant,
      title: variant.attributes.map((i) => i.value).join(", "),
      image: variant.image || productData.image || productData.images[0] || "",
      description: `${(i + 1) * 2} bottle`,
    })),
  };
  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hình ảnh */}
        <div>
          <ProductDetailCarousel slides={product.images} />
        </div>

        {/* Nội dung */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-start space-x-2 text-gray-600  text-lg">
            <span className="text-primary flex space-x-1 text-lg mr-2">
              <StarIcon className="size-4 text-primary" />
              <StarIcon className="size-4 text-primary" />
              <StarIcon className="size-4 text-primary" />
              <StarIcon className="size-4 text-primary" />
              <StarIcon className="size-4 text-primary" />
            </span>
            <span>
              4.9 stars <strong className="text-green-700">100,000+</strong>{" "}
              members
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl  font-bold text-gray-800">
            <span className="text-primary">QuitMood</span> Blend®
            <span className="bg-destructive rounded-md text-white text-sm mx-2 p-1 align-top font-semibold">
              Today Only!
            </span>
          </h2>
          <p className="p1">
            <span>Discover the power of </span>
            <strong>
              <span style={{ color: "rgb(0, 80, 39)" }}>
                Sea Moss and Shilajit
              </span>
            </strong>
            <span> in convenient potent </span>
            supplement
            <span> – your </span>
            <strong>
              <span style={{ color: "rgb(0, 80, 39)" }}>all-in-one</span>
            </strong>
            <span> wellness solution.</span>
          </p>

          <div className="mt-4 rounded-lg">
            <p className="text-4xl flex space-x-2 ">
              <span className="font-normal "> ${product.minPrice}</span>
              <span className="line-through  ">
                ${product.minCompareAtPrice ?? ""}
              </span>{" "}
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <p> 🔥 24-In-1 Supplement Superblend</p>

            <p>✅ Boosts energy</p>
            <p>✅ Enhances focus</p>
            <p>✅ 2024 best seller</p>
            <p>✅ Natural ingredients</p>
          </div>
          <div className="mt-6">
            <AddToCartPurfectSection product={product} />
          </div>

          <div className="mx-2 flex items-center space-x-4 md:space-x-8 text-accent-foreground font-semibold    justify-around sm:text-sm">
            <span className="flex items-center space-y-2 flex-col  justify-center text-center">
              <Heart strokeWidth={1.5} size={30} />
              <span>Customer Favorite</span>
            </span>
            <span className="flex items-center space-y-2 flex-col justify-center text-center">
              <Undo2Icon strokeWidth={1.5} size={30} />
              <span>Money-back Guarantee</span>
            </span>
            <span className="flex items-center space-y-2 flex-col  justify-center text-center">
              <TruckIcon strokeWidth={1.5} size={30} />
              <span>Fast Shipping</span>
            </span>
          </div>
          <ListPaymentMethod />
          <div>
            <Accordion type="single" collapsible className="w-full">
              {data.map((item, index) => (
                <AccordionItem key={item.title} value={`item-${index}`}>
                  <AccordionTriggerCustom>{item.title}</AccordionTriggerCustom>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        {" "}
        <ReviewList />
      </div>
    </div>
  );
}
