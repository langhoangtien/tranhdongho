import { getBlogByIdOrSlug } from "@/lib/api";
import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import { IBlog } from "../admin/blogs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { BlogList } from ".";
import Image from "@/components/image";

export const Route = createFileRoute("/blogs/$blogSlug")({
  component: RouteComponent,
  loader: ({ params }) => getBlogByIdOrSlug(params.blogSlug),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
});

const trending = [
  {
    title: "How Thorne Uses Clinical Trials to Make Products",
    href: "#",
  },
  {
    title: "What Are Phytosomes and How Do They Work?",
    href: "#",
  },
  {
    title: "Zinc and Immune Support: What's the Best Form?",
    href: "#",
  },
];

function RouteComponent() {
  const blog: IBlog = useLoaderData({
    from: "/blogs/$blogSlug",
  });

  const [blogs, setBlogs] = useState<IBlog[]>([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`${API_URL}/blogs?limit=3`);
      if (!res.ok) throw new Error("Can't fetch blogs");
      const data = await res.json();
      const blogsData = data.data;
      setBlogs(blogsData);
    };
    fetchBlogs();
  }, []);
  return (
    <div className="mx-auto pb-6 px-6 bg-white  rounded-lg">
      <div className="mb-16">
        <Image
          src={blog.image}
          alt={blog.title}
          className="w-full aspect-3/1 object-cover  mb-4"
          dimension={800}
        />
      </div>
      <div className="grid mx-auto w-full max-w-7xl grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-5xl font-medium border-b border-border py-4 mb-4">
            {blog.title}
          </h1>
          <div className="text-sm text-gray-600 mb-6">
            By <u>{blog.user?.fullName}</u> | Published on{" "}
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(blog.createdAt))}
          </div>

          <div
            className="tiptap max-w-none space-y-4 mb-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-12 space-y-4">
            <h2 className="text-lg font-medium">Keep Reading</h2>
            <Link to="/" className="inline-block">
              <Badge variant="secondary" className="px-4 py-1">
                Techonogy
              </Badge>
            </Link>
          </div>
        </div>
        <div>
          <div className="space-y-8">
            <Card className="p-6 border">
              <h3 className="font-medium text-base mb-6">
                Sign up for Quit Mood Emails
              </h3>
              <p className="text-sm mb-4">
                Exclusive promotions, personalized product recommendations,
                wellness content from our experts and more, all delivered to
                your inbox.
              </p>
              <div className="flex w-full items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="text-sm"
                />
                <Button
                  className="bg-foreground hover:bg-foreground "
                  size="sm"
                >
                  <ArrowRight />
                </Button>
              </div>
            </Card>

            <div>
              <h3 className="font-medium text-base mb-4">What's Trending</h3>
              <ul className="space-y-2">
                {trending.map((item, index) => (
                  <li key={index}>
                    <Link to={item.href} className="text-sm hover:text-primary">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="p-6 border">
              <h3 className="font-medium text-base mb-2">Get a Monthly Dose</h3>
              <p className="text-sm mb-4">
                News, videos, and Quit Mood stories delivered to your inbox each
                month.
              </p>
              <div className="flex w-full items-center space-x-2">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="text-sm"
                  />
                  <Button
                    className="bg-foreground hover:bg-foreground "
                    size="sm"
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="text-center p-4 text-3xl font-semibold">
            More to explore
          </p>
          <BlogList blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
