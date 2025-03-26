"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Martin",
    text: "I've been using this stack for a few weeks, and the difference is night and day. I have so much more energy throughout the day, and my productivity has skyrocketed. Plus, I've been getting a lot more…",
    image:
      "https://img.thesitebase.net/files/10596429/2024/08/10/17232566230d20c5c499.jpeg?width=320&height=0&min_height=0",
    star: 5,
    verify: true,
  },
  {
    name: "James J",
    text: "I'm blown away by how much the stack has changed my daily routine. I'm more alert, my workouts are better, and my overall mood has improved. I've even had better luck with women. Couldn't be happier…",
    image:
      "https://img.thesitebase.net/files/10596429/2024/08/10/1723256576532c3d3c8f.jpeg?width=320&height=0&min_height=0",
    star: 5,
    verify: true,
  },
  {
    name: "Sam Chobani",
    text: "At first, I thought it was all hype, but Fuel stack is the real deal. My workouts are more intense, my muscles are growing faster, and I have way more energy throughout the day. Can't live without it now.",
    image:
      "https://img.thesitebase.net/review-files/10596429/2024/07/22/1721648046769c939cbf.jpeg?width=320&height=0&min_height=0",
    star: 5,
    verify: true,
  },
  {
    name: "Landon Croft",
    text: "Saw it on FB and gave it a try. Been on it for 2 weeks, and saw some CRAZY differences. I expected more energy, better skin quality, and overall wellness, which was delivered. But can we talk about…",
    image:
      "https://img.thesitebase.net/review-files/10596429/2024/07/22/172164890098e62ff02a.jpeg?width=320&height=0&min_height=0",
    star: 5,
    verify: true,
  },
];
const STARS = ["★", "★★", "★★★", "★★★★", "★★★★★"];

export default function ProductReviews() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex w-full mx-auto mt-10 flex-col space-y-8 ">
      {showForm && <ReviewForm setShowForm={setShowForm} />}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">4.9 ★★★★★</h1>
          <p className="text-gray-500">20 customer ratings</p>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <button className="border border-gray-300 px-3 py-1 rounded-lg text-gray-600">
              Stars
            </button>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="w-4 h-4" /> With photos
            </label>
            <label className="flex items-center gap-1">
              <input type="checkbox" className="w-4 h-4" /> Verified purchase
            </label>
          </div>
          <div className="flex gap-4">
            <button className="border border-gray-300 px-3 py-1 rounded-lg text-gray-600">
              View all reviews
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-700 text-white px-4 py-1 rounded-lg"
            >
              Write a review
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={review.image}
                alt={review.name}
                width={400}
                height={400}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{STARS[review.star - 1]}</h3>
                <p className="text-gray-800 mt-1 flex space-x-1 items-center font-semibold text-base">
                  {" "}
                  <span>{review.name}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <rect width="16" height="16" rx="8" fill="white"></rect>
                      <path
                        d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM7 11.4L3.6 8L5 6.6L7 8.6L11 4.6L12.4 6L7 11.4Z"
                        fill="#04B456"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1869_13780">
                        <rect width="16" height="16" rx="8" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </p>
                <p className="text-gray-600 mt-2 text-sm">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface FormData {
  title: string;
  content: string;
  image: FileList;
  name: string;
  email: string;
}

export function ReviewForm({
  setShowForm,
}: {
  setShowForm: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [rating, setRating] = useState<number>(0);

  const onSubmit = (data: FormData) => {
    console.log({ ...data, rating });
    alert("Review submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-6xl w-full p-6 mx-auto border rounded-xl shadow-md"
    >
      <div className="p-6 max-w-xl w-full mx-auto">
        <h1 className="text-center text-2xl font-bold mb-4">
          Write a review and rate product
        </h1>
        <div className="flex justify-center mb-4 space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`text-2xl cursor-pointer ${
                index < rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title of review</label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Title Review"
              maxLength={70}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Content</label>
            <Textarea
              {...register("content", { required: "Content is required" })}
              placeholder="Ex: Best products"
              maxLength={1000}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Upload image</label>
            <Input {...register("image")} type="file" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Your name</label>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Your name"
                maxLength={50}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Your email</label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="Your email"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              onClick={() => setShowForm(false)}
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-700 text-white">
              Submit review
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
