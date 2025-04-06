import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { formatVNCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCheckIcon } from "lucide-react";
import { useCart } from "@/cart";
import { Link, useNavigate } from "@tanstack/react-router";

import { API_URL } from "@/config";
enum CheckoutStep {
  SHIPPING = "shipping",
  PAYMENT = "payment",
  REVIEW = "review",
}
interface ICheckoutForm {
  voucher?: string;
  email: string;
  shippingAddress: IAddress;
  billingAddress?: IAddress;
}

interface IAddress {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
export type OnApproveData = {
  billingToken?: string | null;
  facilitatorAccessToken?: string;
  orderID: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
};

const addressSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string().min(1, { message: "Nhập tên" }).max(50),
    phone: z
      .string()
      .min(7)
      .max(15)
      .regex(/^\+?[0-9\s\-()]{7,15}$/, {
        message: "Số điện thoại không hợp lệ",
      }),
    address: z.string().min(1, "Địa chỉ bắt buộc").max(200),
    city: z.string().min(1, { message: "Nhập quận/huyện" }).max(100),
    state: z.string().min(1, { message: "Nhập tỉnh thành" }).max(200),
    postalCode: z.string(),
    country: z.enum(
      [
        "US",
        "CA",
        "DK",
        "NO",
        "SE",
        "GB",
        "DE",
        "FR",
        "NL",
        "ES",
        "FI",
        "IT",
        "VN",
      ],
      { message: "Country is required" }
    ),
  })
  .refine(
    (data) => {
      const regex = postalCodeRegexMap[data.country];
      return regex ? regex.test(data.postalCode) : true;
    },
    {
      message: "Postal code is invalid for the selected country",
      path: ["postalCode"],
    }
  );

const checkoutSchema = z.object({
  voucher: z.string().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  shippingAddress: addressSchema,
});
const checkoutFullSchema = z.object({
  voucher: z.string().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});
import { COUNTRIES, countryDialingCodes, postalCodeRegexMap } from "@/lib/data";
import { Input, Select } from "./ui/custom-ui";
import { calculateTax } from "@/lib/common";

import { LoadingTable } from "./loading/table-loading";
import Image from "./image";
import { toast } from "sonner";

export function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const [isSameShipping, setIsSameShipping] = useState(true);
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<ICheckoutForm>({
    email: "",
    shippingAddress: {
      firstName: "",
      lastName: "",
      phone: "+84",
      address: "",
      city: "",
      postalCode: "12345",
      state: "",
      country: "VN",
    },
    billingAddress: {
      firstName: "",
      lastName: "",
      phone: "+84",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "VN",
    },
  });
  const validateForm = () => {
    const result = isSameShipping
      ? checkoutSchema.safeParse(formData)
      : checkoutFullSchema.safeParse(formData);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path.join(".")] = err.message;
      });
      setErrors(errorMap);
      console.log(errorMap);

      return false;
    }
    setErrors({});
    return true;
  };

  const handleOrder = async () => {
    setIsLoading(true);
    try {
      const fullName =
        `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`.trim();
      const shippingAddress = {
        ...formData.shippingAddress,
        fullName,
      };
      const products = items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));
      const data = {
        products,
        email: formData.email || undefined,
        shippingAddress: shippingAddress,
        billingAddress: shippingAddress,
      };
      const response = await fetch(`${API_URL}/payment/cod`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        clearCart();
        navigate({
          to: "/order-complete",
        });
        return;
      }
      toast.error("Có lỗi xảy ra trong quá trình đặt hàng");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra trong quá trình đặt hàng");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    const dialCode = countryDialingCodes[selectedCountry];
    if (
      !formData.shippingAddress.phone ||
      !formData.shippingAddress.phone.startsWith("+")
    ) {
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          country: selectedCountry,
          state: "",
          phone: dialCode + " ",
        },
      });
    } else {
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          country: selectedCountry,
          state: "",
        },
      });
    }
  };
  const handleBillingCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (!formData.billingAddress) return;
    const selectedCountry = e.target.value;
    const dialCode = countryDialingCodes[selectedCountry];
    if (
      !formData.billingAddress.phone ||
      !formData.billingAddress.phone.startsWith("+")
    ) {
      setFormData({
        ...formData,
        billingAddress: {
          ...formData.billingAddress,
          country: selectedCountry,
          phone: dialCode + " ",
          state: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        billingAddress: {
          ...formData.billingAddress,
          country: selectedCountry,
          state: "",
        },
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleChangeshippingAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      shippingAddress: { ...prev.shippingAddress, [name]: value },
    }));
  };

  //

  const handleChangeBillingAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isSameShipping) return;
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      billingAddress: prev.billingAddress
        ? { ...prev.billingAddress, [name]: value }
        : undefined,
    }));
  };

  // Form states

  useEffect(() => {
    if (isSubmitting) validateForm();
  }, [formData]);

  const handleShippingSubmit = () => {
    setIsSubmitting(true);
    if (!validateForm()) return;
    const form = isSameShipping
      ? { ...formData, billingAddress: formData.shippingAddress }
      : formData;
    localStorage.setItem(
      "checkout-form",
      JSON.stringify({
        formData: form,
        step: CheckoutStep.PAYMENT,
        isSameShipping,
      })
    );
    if (isSameShipping) {
      setFormData(form);
    }
    setStep(CheckoutStep.PAYMENT);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {isLoading && <LoadingTable />}
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Process */}
        <div className="w-full lg:w-2/3">
          <Tabs value={step} className="w-full">
            <TabsList className="grid w-full h-12 grid-cols-2 mb-8">
              <TabsTrigger
                value={CheckoutStep.SHIPPING}
                onClick={() => setStep(CheckoutStep.SHIPPING)}
                disabled={
                  step !== CheckoutStep.SHIPPING &&
                  step !== CheckoutStep.PAYMENT &&
                  step !== CheckoutStep.REVIEW
                }
              >
                Vận chuyển
              </TabsTrigger>
              <TabsTrigger
                value={CheckoutStep.PAYMENT}
                onClick={() =>
                  step !== CheckoutStep.SHIPPING &&
                  setStep(CheckoutStep.PAYMENT)
                }
                disabled={step === CheckoutStep.SHIPPING}
              >
                Thanh toán
              </TabsTrigger>
            </TabsList>

            <TabsContent
              className="rounded-lg shadow-md p-4"
              value={CheckoutStep.SHIPPING}
            >
              <div>
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    Shipping Information
                  </h2>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="md:col-span-2">
                        <Select
                          disabled
                          aria-invalid={!!errors["shippingAddress.country"]}
                          id="country"
                          name="country"
                          label="Country*"
                          className="text-foreground"
                          value={formData.shippingAddress.country}
                          onChange={handleCountryChange}
                        >
                          {COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </Select>
                        {errors["shippingAddress.country"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.country"]}
                          </p>
                        )}
                      </div>
                      <div className="hidden">
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Họ"
                          aria-invalid={!!errors["shippingAddress.firstName"]}
                          value={formData.shippingAddress.firstName}
                          onChange={handleChangeshippingAddress}
                        />
                        {errors["shippingAddress.firstName"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.firstName"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Họ Tên*"
                          aria-invalid={!!errors["shippingAddress.lastName"]}
                          value={formData.shippingAddress.lastName}
                          onChange={handleChangeshippingAddress}
                        />
                        {errors["shippingAddress.lastName"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.lastName"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          id="email"
                          name="email"
                          placeholder="Email (Không bắt buộc)"
                          aria-invalid={!!errors["email"]}
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {errors["email"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["email"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Số điện thoại*"
                          aria-invalid={!!errors["shippingAddress.phone"]}
                          value={formData.shippingAddress.phone}
                          onChange={handleChangeshippingAddress}
                        />
                        {errors["shippingAddress.phone"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.phone"]}
                          </p>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Input
                          id="address"
                          name="address"
                          placeholder="Địa chỉ*"
                          aria-invalid={!!errors["shippingAddress.address"]}
                          value={formData.shippingAddress.address}
                          onChange={handleChangeshippingAddress}
                        />
                        {errors["shippingAddress.address"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.address"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Quận/Huyện/Thị xã"
                          aria-invalid={!!errors["shippingAddress.city"]}
                          value={formData.shippingAddress.city}
                          onChange={handleChangeshippingAddress}
                        />
                        {errors["shippingAddress.city"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.city"]}
                          </p>
                        )}
                      </div>
                      <div>
                        <Select
                          label="Tỉnh*"
                          id="state"
                          name="state"
                          aria-invalid={!!errors["shippingAddress.state"]}
                          value={formData.shippingAddress.state}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                state: e.target.value,
                              },
                            }))
                          }
                        >
                          <option value="">Select State/Region</option>
                          {COUNTRIES.find(
                            (i) => i.code === formData.shippingAddress.country
                          )?.states.map((state) => (
                            <option key={state.code} value={state.code}>
                              {state.name}
                            </option>
                          ))}
                        </Select>

                        {errors["shippingAddress.state"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.state"]}
                          </p>
                        )}
                      </div>
                      <div className="hidden">
                        <Input
                          id="postalCode"
                          name="postalCode"
                          placeholder="ZIP/Postal Code*"
                          aria-invalid={!!errors["shippingAddress.postalCode"]}
                          value={formData.shippingAddress.postalCode}
                          onChange={handleChangeshippingAddress}
                        />
                        {errors["shippingAddress.postalCode"] && (
                          <p className="text-destructive text-sm mt-0.5">
                            {errors["shippingAddress.postalCode"]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden">
                  <h2 className="text-xl font-bold mb-4 px-6">
                    Billing Information
                  </h2>
                  <div>
                    <label
                      htmlFor="radio-yes"
                      className={`flex md:space-x-2 space-x-1  justify-between p-4  cursor-pointer items-center ${isSameShipping ? " bg-accent" : ""} `}
                    >
                      <div className="flex space-x-2 items-center">
                        <input
                          type="radio"
                          onChange={() => setIsSameShipping(true)}
                          className="rounded-full"
                          id="radio-yes"
                          checked={isSameShipping}
                        />
                        <span>Same as shipping address</span>
                      </div>
                    </label>
                    <label
                      htmlFor="radio-no"
                      className={`flex md:space-x-2 space-x-1  justify-between px-4 pt-4  cursor-pointer items-center ${!isSameShipping ? " bg-accent" : "pb-4"} `}
                    >
                      <div className="flex space-x-2 items-center">
                        <input
                          type="radio"
                          className="rounded-full"
                          onChange={() => setIsSameShipping(false)}
                          id="radio-no"
                          checked={!isSameShipping}
                        />
                        <span>Use a different billing address</span>
                      </div>
                    </label>
                  </div>
                  <div className="bg-accent">
                    {!isSameShipping && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-6 mb-6">
                        <div className="md:col-span-2">
                          <Select
                            id="bcountry"
                            name="country"
                            label="Country*"
                            className="bg-accent"
                            value={formData.billingAddress?.country}
                            onChange={handleBillingCountryChange}
                            aria-invalid={!!errors["billingAddress.country"]}
                          >
                            {COUNTRIES.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </Select>
                          {errors["billingAddress.country"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.country"]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            id="bFirstName"
                            name="firstName"
                            placeholder="First Name"
                            aria-invalid={!!errors["billingAddress.firstName"]}
                            value={formData.billingAddress?.firstName}
                            onChange={handleChangeBillingAddress}
                          />
                          {errors["billingAddress.firstName"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.firstName"]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            id="bLastName"
                            name="lastName"
                            placeholder="Last Name*"
                            aria-invalid={!!errors["billingAddress.lastName"]}
                            value={formData.billingAddress?.lastName}
                            onChange={handleChangeBillingAddress}
                          />
                          {errors["billingAddress.lastName"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.lastName"]}
                            </p>
                          )}
                        </div>

                        <div>
                          <Input
                            id="bPhone"
                            name="phone"
                            placeholder="Phone Number"
                            aria-invalid={!!errors["billingAddress.phone"]}
                            value={formData.billingAddress?.phone}
                            onChange={handleChangeBillingAddress}
                          />
                          {errors["billingAddress.phone"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.phone"]}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Input
                            id="bAddress"
                            name="address"
                            placeholder="Address*"
                            aria-invalid={!!errors["billingAddress.address"]}
                            value={formData.billingAddress?.address}
                            onChange={handleChangeBillingAddress}
                          />
                          {errors["billingAddress.address"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.address"]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            id="bcity"
                            name="city"
                            placeholder="City"
                            aria-invalid={!!errors["billingAddress.city"]}
                            value={formData.billingAddress?.city}
                            onChange={handleChangeBillingAddress}
                          />
                          {errors["billingAddress.city"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.city"]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Select
                            label="State/Region*"
                            id="bstate"
                            name="state"
                            className="bg-accent"
                            aria-invalid={!!errors["billingAddress.state"]}
                            value={formData.billingAddress?.state}
                            onChange={(e) => {
                              if (isSameShipping) return;
                              const { name, value } = e.target;
                              setFormData((prev) => ({
                                ...prev,
                                billingAddress: prev.billingAddress
                                  ? { ...prev.billingAddress, [name]: value }
                                  : undefined,
                              }));
                            }}
                          >
                            <option value="">Select State/Region</option>
                            {COUNTRIES.find(
                              (i) => i.code === formData.billingAddress?.country
                            )?.states.map((state) => (
                              <option key={state.code} value={state.code}>
                                {state.name}
                              </option>
                            ))}
                          </Select>
                          {errors["billingAddress.state"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.state"]}
                            </p>
                          )}
                        </div>
                        <div>
                          <Input
                            id="bpostalCode"
                            name="postalCode"
                            placeholder="ZIP/Postal Code*"
                            aria-invalid={!!errors["billingAddress.postalCode"]}
                            value={formData.billingAddress?.postalCode}
                            onChange={handleChangeBillingAddress}
                          />
                          {errors["billingAddress.postalCode"] && (
                            <p className="text-destructive text-sm mt-0.5">
                              {errors["billingAddress.postalCode"]}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleShippingSubmit} type="submit">
                  Continue to Payment
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value={CheckoutStep.PAYMENT}
              className="rounded-lg shadow-md p-4"
            >
              <div>
                <h2 className="text-xl font-bold mb-4">Địa chỉ nhận hàng</h2>

                <div className="space-y-6 mb-8">
                  <div className="bg-accent p-4 rounded text-sm">
                    <p>
                      {formData.shippingAddress.firstName}{" "}
                      {formData.shippingAddress.lastName}
                    </p>
                    <p>{formData.shippingAddress.address}</p>
                    <p>
                      {formData.shippingAddress.city},{" "}
                      {formData.shippingAddress.state}{" "}
                      {formData.shippingAddress.postalCode}
                    </p>
                    <p>{formData.email}</p>
                    {formData.shippingAddress.phone && (
                      <p>{formData.shippingAddress.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
              <p>COD</p>
              <Button onClick={handleOrder}>Đặt hàng</Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="bg-accent p-6 rounded-lg shadow-sm sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="max-h-96 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex py-3 border-b">
                  <div className="w-16 h-16 relative flex-shrink-0 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="object-cover size-16"
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="font-medium">{item.name}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-sm">
                        {formatVNCurrency(item.price)} x {item.quantity}
                      </p>
                      <p className="font-medium">
                        {formatVNCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-3 border-t">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{formatVNCurrency(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Thuế</span>
                <span>
                  {formatVNCurrency(
                    getCartTotal() *
                      calculateTax(
                        formData.shippingAddress.country,
                        formData.shippingAddress.state
                      )
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Tổng</span>
                <span>
                  {formatVNCurrency(
                    getCartTotal() *
                      (1 +
                        calculateTax(
                          formData.shippingAddress.country,
                          formData.shippingAddress.state
                        ))
                  )}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-card p-3 rounded">
                <p className="text-sm text-primary flex items-center">
                  <CheckCheckIcon
                    strokeWidth={1}
                    className="h-4 w-4 mr-2 flex-shrink-0"
                  />
                  Đơn hàng của bạn đủ điều kiện miễn phí vận chuyển
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
