import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function ReviewForm({
  setShowForm,
}: {
  setShowForm: (value: boolean) => void;
}) {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null as File | null,
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (
      !formData.email.trim() ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)
    )
      newErrors.email = "Invalid email address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log({ ...formData, rating });
    alert("Review submitted successfully!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl w-full p-6 mx-auto border rounded-xl shadow-md"
    >
      <div className="p-6 max-w-xl w-full mx-auto">
        <h1 className="text-center text-2xl font-bold mb-4">
          Write a review and rate product
        </h1>
        <div className="flex justify-center mb-4 space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`text-2xl cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-300"}`}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Title of review</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title Review"
              maxLength={70}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Content</label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Ex: Best products"
              maxLength={1000}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Upload image</label>
            <Input type="file" onChange={handleFileChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Your name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                maxLength={50}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Your email</label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
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
