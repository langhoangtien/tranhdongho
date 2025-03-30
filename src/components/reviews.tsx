import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image,
  ThumbsUp,
  ShieldCheckIcon,
  RotateCw,
  ChevronsDown,
} from "lucide-react";
import Star from "./icons/star-icon";
import StarIcon from "./icons/star-icon";
import { API_URL } from "@/config";
import StarThreeQuaterIcon from "./icons/star-three-quarter";

interface Review {
  _id: number;
  productId: string;
  customer: string;
  title: string;
  body: string;
  rating: number;
  images: string[];
  videos: string[];
  reply?: string;
  repliedAt?: Date;
  isVerified: boolean;
  country?: string;
  liked: number;
  purchaseVerified: boolean;
  createdAt: string;
}

interface ResponseReviews {
  data: Review[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [filters, setFilters] = useState({
    rating: 0,
    purchaseVerified: false,
    hasMedia: false,
    sort: "createdAt_desc",
  });

  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    const likedIds = JSON.parse(localStorage.getItem("likedIds") || "[]");
    setLikedIds(likedIds);
  }, []);

  const handleLike = (id: number) => {
    setLikedIds((prevLikedIds) => {
      const newLikedIds = prevLikedIds.includes(id)
        ? prevLikedIds.filter((likedId) => likedId !== id)
        : [...prevLikedIds, id];

      localStorage.setItem("likedIds", JSON.stringify(newLikedIds));
      return newLikedIds;
    });
  };

  useEffect(() => {
    fetchReviews(1, true);
  }, [filters]);

  const fetchReviews = async (page: number, reset: boolean = false) => {
    setLoading(true);
    const queryParams = new URLSearchParams(
      Object.entries({
        page: page.toString(),
        limit: "5",
        ...(filters.rating && { rating: filters.rating.toString() }),
        ...(filters.purchaseVerified && { purchaseVerified: "true" }),
        ...(filters.hasMedia && { hasMedia: "true" }),
        ...(filters.sort === "liked_desc"
          ? { sortLiked: "desc" }
          : filters.sort === "createdAt_asc"
            ? { sortCreatedAt: "asc" }
            : { sortCreatedAt: "desc" }),
      }).reduce(
        (acc, [key, value]) => {
          if (value !== undefined) acc[key] = value;
          return acc;
        },
        {} as Record<string, string>
      )
    );

    try {
      const res = await fetch(`${API_URL}/reviews?${queryParams.toString()}`);
      const json: ResponseReviews = await res.json();

      setReviews((prev) => (reset ? json.data : [...prev, ...json.data]));
      setPagination({
        total: json.pagination.total,
        totalPages: json.pagination.totalPages,
      });
      setPage(page);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-center md:justify-between border-b border-border  mx-auto py-8">
        {/* Left Section */}
        <div className="flex flex-col space-y-3">
          <p className="text-3xl">Product review</p>
          <Button>Write a review</Button>
        </div>

        {/* Right Section */}
        <div className="flex space-x-1 ">
          <h3 className="text-6xl  mb-2">4.9</h3>
          <div className="flex flex-col space-y-0.5 justify-center items-start">
            <span className="flex  space-x-1">
              <StarIcon className="text-yellow-400 size-4" />
              <StarIcon className="text-yellow-400 size-4" />
              <StarIcon className="text-yellow-400 size-4" />
              <StarIcon className="text-yellow-400 size-4" />
              <StarThreeQuaterIcon className="text-yellow-400 size-4" />
            </span>
            <span className="text-base text-left text-accent-foreground ">
              17.3k REVIEWS
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between  gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {[5, 4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              onClick={() =>
                handleFilterChange(
                  "rating",
                  filters.rating === rating ? 0 : rating
                )
              }
              variant={filters.rating === rating ? "secondary" : "outline"}
              size="sm"
            >
              {rating} <StarIcon className="text-yellow-400" />
            </Button>
          ))}
          <Button
            onClick={() => handleFilterChange("hasMedia", !filters.hasMedia)}
            className={filters.hasMedia ? "border-primary" : " "}
            variant="outline"
            size="sm"
          >
            <Image strokeWidth={1.25} />
            Photo
          </Button>
        </div>

        <Select
          onValueChange={(value) => handleFilterChange("sort", value)}
          defaultValue="createdAt_desc"
        >
          <SelectTrigger className="w-32 rounded-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xs">
            <SelectItem value="createdAt_desc">Latest</SelectItem>
            <SelectItem value="createdAt_asc">Oldest</SelectItem>
            <SelectItem value="liked_desc">Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-border pb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p className="font-bold flex gap-2 items-center  text-lg">
                  <span className="flex items-center">{review.customer}</span>
                  {!!review.purchaseVerified && (
                    <span className="flex items-center gap-0.5 text-primary font-normal h-full text-xs">
                      <ShieldCheckIcon strokeWidth={1.25} size={12} />
                      <span className="leading-none">Verified Purchase</span>
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
              </div>
              <span className="text-accent-foreground text-sm mt-1 md:mt-0">
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(review.createdAt))}
              </span>
            </div>

            <p className="font-bold mt-2 text-base">{review.title}</p>
            <p className="text-accent-foreground">{review.body}</p>

            {/* Media */}
            {(!!review.images?.length || !!review.videos?.length) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {review.images?.map((url, i) => (
                  <div
                    key={i}
                    className="relative size-16 md:size-20 border border-border rounded-md"
                  >
                    <img
                      src={url}
                      alt="review image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {review.videos?.map((url, i) => (
                  <video
                    key={i}
                    className="relative size-16 md:size-20 border border-border rounded-md"
                    controls
                    preload="none"
                  >
                    <source src={url} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                ))}
              </div>
            )}

            {/* Helpful */}
            <div className="flex items-center space-x-2 mt-3">
              <button onClick={() => handleLike(review._id)}>
                {likedIds.includes(review._id) ? (
                  <ThumbsUp className="w-4 h-4 text-primary" />
                ) : (
                  <ThumbsUp className="w-4 h-4 text-gray-400" />
                )}
              </button>
              <span className="text-gray-400">
                {likedIds.includes(review._id)
                  ? (review.liked || 0) + 1
                  : review.liked || "Helpful?"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        {page < pagination.totalPages && (
          <Button
            onClick={() => fetchReviews(page + 1)}
            disabled={loading}
            className="flex items-center gap-2"
            variant="ghost"
          >
            {loading ? (
              <RotateCw className="mr-1 animate-spin" />
            ) : (
              <ChevronsDown />
            )}
            {loading ? "Loading..." : "See more"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
