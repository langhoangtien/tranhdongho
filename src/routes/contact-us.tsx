import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import MainLayout from "@/layout/main-layout";
import { Input, Select } from "@/components/ui/custom-ui";
import { CheckCheck } from "lucide-react";
import { CONTACT_ADDRESS, CONTACT_EMAIL } from "@/config";

export const Route = createFileRoute("/contact-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <ContactForm />
    </MainLayout>
  );
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  issueType: string;
  attachments: File[];
}

const issueOptions = [
  "I have not received my order",
  "I want to claim my order",
  "I want to cancel my order",
  "I want to update my order",
  "I have a question about a product/collection",
  "I have not received my confirmation email",
  "Other reasons",
];

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    issueType: "",
    attachments: [],
  });
  const [errors, setErrors] = useState<
    Partial<FormData & { attachmentsError?: string }>
  >({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData & { attachmentsError?: string }> = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.phone && !/^\d{7,15}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 7-15 digits";
    if (!formData.message) newErrors.message = "Message is required";
    if (formData.attachments.length > 10)
      newErrors.attachmentsError = "Maximum 10 files allowed";
    if (formData.attachments.some((file) => file.size > 3 * 1024 * 1024))
      newErrors.attachmentsError = "Each file must be under 3MB";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Clear error when input is valid
    const newErrors = { ...errors };
    if (name === "email" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      delete newErrors.email;
    }
    if (name === "phone" && /^\d{7,15}$/.test(value)) {
      delete newErrors.phone;
    }
    if (name === "name" && value.trim()) {
      delete newErrors.name;
    }
    if (name === "message" && value.trim()) {
      delete newErrors.message;
    }

    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // Clear error when attachments are valid
      const newErrors = { ...errors };
      if (
        fileArray.length <= 10 &&
        fileArray.every((file) => file.size <= 3 * 1024 * 1024)
      ) {
        delete newErrors.attachments;
      }

      setFormData({ ...formData, attachments: fileArray });
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 flex flex-col gap-8">
      <h2 className="text-2xl font-semibold ">Contact Us</h2>
      {submitted ? (
        <p className="text-primary flex items-center space-x-0.5">
          <CheckCheck className="size-5" />{" "}
          <span>Your message has been sent</span>
          successfully!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4 grid-cols-2  ">
          <div className="col-span-2 md:col-span-1">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && (
              <p className="text-destructive text-sm">{errors.name}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              type="text"
              name="phone"
              placeholder="Phone (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-destructive text-sm">{errors.phone}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Select
              name="issueType"
              label="Reason for Contact"
              id="issueType"
              value={formData.issueType}
              onChange={handleChange}
            >
              {issueOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          <div className="col-span-2">
            <Textarea
              className="col-span-2 md:text-base"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            {errors.message && (
              <p className="text-destructive text-sm">{errors.message}</p>
            )}
          </div>
          <div className="col-span-2 md:col-span-1">
            <Input
              className="col-span-2"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {errors.attachmentsError && (
              <p className="text-destructive text-sm">
                {errors.attachmentsError}
              </p>
            )}
          </div>
          <div className="col-span-2">
            <Button type="submit">Send Message</Button>
          </div>
        </form>
      )}

      <div>
        <p className="p2">
          If you have any questions about our products or would like to discuss
          a custom design, please do not hesitate to contact us. Our customer
          service team is available to assist you and provide you with the
          information you need.{" "}
        </p>
        <p>
          <strong>Headquarters</strong>: {CONTACT_ADDRESS}
          <br />
          <strong>Email</strong>:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            title=""
            role="url"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
          <br />
          <strong>Phone</strong>: +1 302 590 6135
        </p>
      </div>
    </div>
  );
}
