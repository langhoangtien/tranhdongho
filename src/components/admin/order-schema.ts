import { z } from "zod";

// Định nghĩa enum cho status và paymentMethod sử dụng z.enum
export const OrderStatusEnum = z.enum([
  "PENDING",
  "COMPLETE",
  "REFUNDED",
  "CANCELLED",
]);
export const PaymentMethodEnum = z.enum([
  "paypal",
  "credit_card",
  "bank_transfer",
  "cash_on_delivery",
]);

// Schema cho từng Order Item, sử dụng productId thay vì slug
const orderItemSchema = z.object({
  variantId: z.string().min(1, { message: "Variant ID is required" }), // Giả sử ID được truyền dưới dạng chuỗi
  name: z.string().max(200, { message: "Name must not exceed 200 characters" }),
  productId: z.string().min(1, { message: "Product ID is required" }),
  quantity: z
    .number()
    .int({ message: "Quantity must be an integer" })
    .positive({ message: "Quantity must be a positive number" })
    .max(1000, { message: "Quantity must not exceed 1000" }),
  price: z
    .number()
    .nonnegative({ message: "Price must be a nonnegative number" }),
});

// Schema cho Order
export const orderSchema = z.object({
  products: z
    .array(orderItemSchema)
    .nonempty({ message: "Order must contain at least one product" }),
  voucher: z
    .string()
    .max(200, { message: "Voucher must not exceed 200 characters" })
    .nullable()
    .optional(),
  total: z
    .number()
    .nonnegative({ message: "Total must be a nonnegative number" }),
  email: z.string().email(),
  trackingNumber: z.string().optional(),
  logisticPartner: z.string().optional(),
  isSendEmail: z.boolean().optional(),
  name: z.string().optional(),

  // Nếu có user, có thể là string id (tùy vào cách bạn xử lý ObjectId)
  user: z.string().optional(),
  shippingAddress: z
    .object({
      fullName: z.string().max(200),
      address: z.string().max(200),
      address2: z.string().max(200).optional(),
      city: z.string().max(200),
      state: z.string().max(200).optional(),
      postalCode: z.string().max(200),
      country: z.string().max(2),
      phone: z.string().max(15).optional(),
    })
    .optional(),
  billingAddress: z
    .object({
      fullName: z.string().max(200),
      phone: z.string().max(15).optional(),
      address: z.string().max(200),
      address2: z.string().max(200).optional(),
      city: z.string().max(200),
      state: z.string().max(200).optional(),
      postalCode: z.string().max(200),
      country: z.string().max(2),
    })
    .optional(),
  status: OrderStatusEnum,
  paymentMethod: PaymentMethodEnum,
  // Timestamps có thể được validate nếu cần
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Ví dụ sử dụng:
export type OrderInput = z.infer<typeof orderSchema>;
