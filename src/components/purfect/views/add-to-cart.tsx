"use client";
const products = [
  {
    name: "Purfect Fuel Blend™️ Sea Moss & Shilajit Power Bundle",
    price: 69.99,
    image: "/purfect/slide1.webp",
    title: "BUY 1 - $69.99",
    quantity: 1,
    id: "67cc656d7a9b26945e230d6a",
    slug: "purfect-fuel-blend",
    attributes: {
      title: "combo 1",
      price: 69.99,
    },
  },
  {
    name: "Purfect Fuel Blend™️ Sea Moss & Shilajit Power Bundle",
    price: 119.99,
    image: "/purfect/slide1.webp",
    title: "BUY 2 - $119.99",
    quantity: 1,
    attributes: {
      title: "combo 2",
      price: 119.99,
    },
    id: "67cc656d7a9b26945e230d6c",
    slug: "purfect-fuel-blend",
  },
  {
    name: "Purfect Fuel Blend™️ Sea Moss & Shilajit Power Bundle",
    price: 199.99,
    image: "/purfect/slide1.webp",
    title: "BUY 3 - $199.99 + 1 FREE",
    quantity: 1,
    attributes: {
      title: "combo 3",
      price: 199.99,
    },
    id: "67cc656d7a9b26945e230d6e",
    slug: "purfect-fuel-blend",
  },
];
import useCart from "@/context/cart/use-cart";
import { Product } from "@/context/cart/cart-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddToCart(product: Product) {
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    console.log("Add to cart", product);

    addToCart(product);
  };
  return (
    <Button
      onClick={handleAddToCart}
      className="w-full rounded-full h-12 text-base font-semibold"
    >
      Add To Cart | 50% OFF ➜
    </Button>
  );
}

export function AddToCartSection() {
  const [product, setProduct] = useState(products[0]);
  const handleProduct = (index: number) => {
    setProduct(products[index]);
  };
  return (
    <div className="mt-6 flex flex-col space-y-4">
      {products.map((item, index) => (
        <Button
          className={`w-full rounded-full h-12 text-base font-normal ${
            item.id === product.id
              ? "border-2 border-gray-800"
              : "border-gray-300"
          }`}
          onClick={() => handleProduct(index)}
          key={item.price}
          variant={"outline"}
        >
          {item.title}
        </Button>
      ))}
      <AddToCart
        name={product.name}
        price={product.price}
        image={product.image}
        quantity={product.quantity}
        id={product.id}
        title={product.title}
      />
    </div>
  );
}
