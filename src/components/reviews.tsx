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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Star from "./icons/star-icon";
import StarIcon from "./icons/star-icon";
import { API_URL } from "@/config";
import StarThreeQuaterIcon from "./icons/star-three-quarter";
import { z } from "zod";
import { Input } from "./ui/custom-ui";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

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

const reviewSchema = z.object({
  customer: z.string().min(1, "Name is required").max(50, "Name is too long"),
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be between 1 and 5"),
  email: z.string().email("Invalid email address"),
  title: z.string().min(5, "Tiltle is required").max(100, "Title is too long"),
  body: z
    .string()
    .min(10, "Content is too short")
    .max(1000, "Content is too long"),
});

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [numberReview, setNumberReview] = useState<number>(0);
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    rating: 5,
    title: "",
    body: "",
    productId: "purfect-fuel-blend",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const result = reviewSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [filters, setFilters] = useState({
    rating: 5,
    purchaseVerified: false,
    hasMedia: false,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [likedIds, setLikedIds] = useState<number[]>([]);

  useEffect(() => {
    const likedIds = JSON.parse(localStorage.getItem("likedIds") || "[]");
    const numberReview = localStorage.getItem("numberReview") || "0";
    setNumberReview(Number(numberReview));
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

    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: "10",
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.rating && { rating: String(filters.rating) }),
        ...(filters.hasMedia && { hasMedia: String(filters.hasMedia) }),
        ...(filters.purchaseVerified && {
          purchaseVerified: String(filters.purchaseVerified),
        }),
      });
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

  const handleSubmit = async () => {
    if (numberReview >= 5) {
      toast.error("You have reached the maximum number of reviews allowed.");
      return;
    }
    if (!validateForm()) return;
    // Submit the form data to the server or perform any other action
    try {
      const response = await fetch(`${API_URL}/reviews/client-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await response.json();
      if (response.ok) {
        setOpen(false);
        setFormData({
          customer: "",
          email: "",
          rating: 5,
          title: "",
          body: "",
          productId: "purfect-fuel-blend",
        });
        toast.success("Review submitted successfully!");

        localStorage.setItem("numberReview", String(numberReview + 1));
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again later.");
    }
  };
  const handleChangeSort = (value: string) => {
    const [sortBy, sortOrder] = value.split("_");
    setFilters((prev) => ({ ...prev, sortBy, sortOrder }));
    setPage(1);
  };
  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-center md:justify-between border-b border-border  mx-auto py-8">
        {/* Left Section */}
        <div className="flex flex-col space-y-3">
          <p className="text-3xl">Product review</p>
          <Button onClick={() => setOpen(true)} className="w-full">
            Write a review
          </Button>
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
              variant="outline"
              className={
                filters.rating === rating ? "border-primary" : "border-border"
              }
              size="sm"
            >
              <span className="flex items-center gap-0.5">
                {rating} <StarIcon className="text-yellow-400" />
              </span>
            </Button>
          ))}
          <Button
            onClick={() => handleFilterChange("hasMedia", !filters.hasMedia)}
            className={filters.hasMedia ? "border-primary" : " "}
            variant="outline"
            size="sm"
          >
            <Image strokeWidth={1.5} />
            Photo
          </Button>
        </div>

        <Select onValueChange={handleChangeSort} defaultValue="createdAt_desc">
          <SelectTrigger className="w-32 rounded-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xs">
            <SelectItem value="createdAt_desc">Latest</SelectItem>
            <SelectItem value="createdAt_asc">Oldest</SelectItem>
            <SelectItem value="liked_desc">Helpful</SelectItem>
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

      <div className="text-center flex justify-center mt-4 w-full">
        {page < pagination.totalPages && (
          <Button
            onClick={() => fetchReviews(page + 1)}
            disabled={loading}
            className="flex items-center gap-2"
            variant="default"
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle className="text-center text-3xl my-4">
                Write Review
              </DialogTitle>
              <DialogDescription>
                Share your thoughts about the product. Your review will help
                other customers make better choices.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-0.5">
                {[1, 2, 3, 4, 5].map((i) => {
                  return (
                    <StarIcon
                      key={i}
                      onClick={() => setFormData({ ...formData, rating: i })}
                      className={`${
                        formData.rating >= i
                          ? "text-yellow-400"
                          : "text-gray-400"
                      } cursor-pointer size-5`}
                    />
                  );
                })}
              </div>
              <div>
                <Input
                  type="text"
                  id="customer"
                  name="customer"
                  onChange={handleChange}
                  value={formData.customer}
                  aria-invalid={!!errors.customer}
                  placeholder="Name*"
                />
                {errors.customer && (
                  <p className="text-destructive text-sm">{errors.customer}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="email"
                  id="email"
                  aria-invalid={!!errors.email}
                  onChange={handleChange}
                  value={formData.email}
                  placeholder="Email*"
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email}</p>
                )}
              </div>
              <div>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  aria-invalid={!!errors.title}
                  onChange={handleChange}
                  value={formData.title}
                  placeholder="Title*"
                />
                {errors.title && (
                  <p className="text-destructive text-sm">{errors.title}</p>
                )}
              </div>
              <div>
                <Textarea
                  name="body"
                  id="body"
                  aria-invalid={!!errors.body}
                  onChange={handleChange}
                  value={formData.body}
                  placeholder="Content*"
                />
                {errors.body && (
                  <p className="text-destructive text-sm">{errors.body}</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewList;
