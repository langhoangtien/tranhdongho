"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, CheckCheckIcon } from "lucide-react";
import { useCart } from "@/cart";
import { Link, useNavigate } from "@tanstack/react-router";

import { API_URL, PAYPAL_CLIENT_ID } from "@/config";
import {
  PayPalHostedFieldsProvider,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import CardPayment, { SubmitPayment } from "./card-payment";
import PaypalButtonPayment from "./button-payment";
import ListPaymentMethod from "./list-payment-method";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import PaypalIcon from "./icons/paypal-icon";
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
interface IBillingAddress extends Omit<IAddress, "firstName" | "lastName"> {
  fullName: string;
}
interface IPayment
  extends Omit<ICheckoutForm, "billingAddress" | "shippingAddress"> {
  products: { id: string; quantity: number }[];
  billingAddress: IBillingAddress;
  shippingAddress: IBillingAddress;
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

const addressSchema = z.object({
  firstName: z.string(),
  lastName: z.string().max(50),
  phone: z.string().min(7).max(15),
  address: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  state: z.string().min(1, { message: "State is required" }).max(200),
  postalCode: z.string().max(20),
  country: z.string(),
});
const checkoutSchema = z.object({
  voucher: z.string().optional(),
  email: z.string().email(),
  shippingAddress: addressSchema,
});
const checkoutFullSchema = z.object({
  voucher: z.string().optional(),
  email: z.string().email(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});
import { COUNTRIES } from "@/lib/data";
import { Input, Select } from "./ui/custom-ui";
import { calculateTax } from "@/lib/common";

import { LoadingTable } from "./loading/table-loading";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import Image from "./image";

export function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart();
  const [isSameShipping, setIsSameShipping] = useState(true);
  const navigate = useNavigate();
  const [step, setStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [clientToken, setClientToken] = useState(null);

  const [formData, setFormData] = useState<ICheckoutForm>({
    email: "",
    shippingAddress: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "US",
    },
    billingAddress: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "US",
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

  useEffect(() => {
    const form = localStorage.getItem("checkout-form");
    if (form) {
      const formJson = JSON.parse(form);
      setFormData(formJson.formData);
      setIsSameShipping(formJson.isSameShipping);
    }
    const generateClientToken = async () => {
      const response = await (
        await fetch(`${API_URL}/payment/paypal2/generate-client-token`)
      ).json();
      setClientToken(response?.clientToken || null);
    };
    generateClientToken();
  }, []);

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

  const handleShippingSubmit = () => {
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

  const createOrder = async () => {
    const shippingPayment = {
      ...formData.shippingAddress,
      fullName: `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`,
    };
    const bfullName = isSameShipping
      ? `${formData.shippingAddress.firstName} ${formData.shippingAddress.lastName}`
      : `${formData.billingAddress?.firstName} ${formData.billingAddress?.lastName}`;
    const billingPayment = formData.billingAddress
      ? {
          ...formData.billingAddress,
          fullName: bfullName,
        }
      : shippingPayment;

    const order: IPayment = {
      ...formData,
      products: items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
      shippingAddress: shippingPayment,
      billingAddress: billingPayment,
    };

    try {
      const response = await fetch(`${API_URL}/payment/paypal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use the "body" param to optionally pass additional order information
        // like product ids and quantities
        body: JSON.stringify(order),
      });

      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onApprove = async (data: OnApproveData, actions: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}/payment/paypal/${data.orderID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const orderData = await response.json();
      // Three cases to handle:
      //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
      //   (2) Other non-recoverable errors -> Show a failure message
      //   (3) Successful transaction -> Show confirmation or thank you message

      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
        clearCart();

        navigate({
          to: "/order-complete",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
    } finally {
      setIsLoading(false);
    }
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
                Shipping
              </TabsTrigger>
              <TabsTrigger
                value={CheckoutStep.PAYMENT}
                onClick={() =>
                  step !== CheckoutStep.SHIPPING &&
                  setStep(CheckoutStep.PAYMENT)
                }
                disabled={step === CheckoutStep.SHIPPING}
              >
                Payment
              </TabsTrigger>
            </TabsList>

            <TabsContent value={CheckoutStep.SHIPPING}>
              <div className="bg-card rounded-lg shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    Shipping Information
                  </h2>
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
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
                          placeholder="Last Name*"
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
                          placeholder="Email Address*"
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
                          placeholder="Phone Number"
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
                          placeholder="Address*"
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
                          placeholder="City"
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
                          label="State/Region*"
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
                      <div>
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
                      <div>
                        <Select
                          id="country"
                          name="country"
                          label="Country*"
                          className="text-foreground"
                          value={formData.shippingAddress.country}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              shippingAddress: {
                                ...prev.shippingAddress,
                                country: e.target.value,
                              },
                            }))
                          }
                        >
                          {COUNTRIES.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
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
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 mb-6">
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
                            aria-invalid={!!errors["shippingAddress.address"]}
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
                        <div>
                          <Select
                            id="bcountry"
                            name="country"
                            label="Country*"
                            className="bg-accent"
                            value={formData.billingAddress?.country}
                            onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                billingAddress: {
                                  ...prev.shippingAddress,
                                  country: e.target.value,
                                },
                              }))
                            }
                          >
                            {COUNTRIES.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.name}
                              </option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex px-6 py-4 justify-end">
                <Button onClick={handleShippingSubmit} type="submit">
                  Continue to Payment
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value={CheckoutStep.PAYMENT}
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

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

              <h2 className="text-xl font-bold mb-4">Payment Information</h2>
              {!!message && (
                <Alert className="my-4" variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              {clientToken ? (
                <PayPalScriptProvider
                  options={{
                    clientId: PAYPAL_CLIENT_ID,
                    components: "buttons,hosted-fields",
                    dataClientToken: clientToken,
                    intent: "capture",
                    vault: false,
                  }}
                >
                  <PayPalHostedFieldsProvider
                    styles={{
                      ".valid": { color: "#28a745" },
                      ".invalid": { color: "#dc3545" },
                      input: {
                        "font-family": "monospace",
                        "font-size": "16px",
                      },
                    }}
                    createOrder={createOrder}
                  >
                    <RadioGroup
                      defaultValue="card"
                      onValueChange={setPaymentMethod}
                    >
                      <div
                        className={`rounded-md ${
                          paymentMethod === "paypal"
                            ? "bg-background "
                            : "bg-accent"
                        }`}
                      >
                        <label
                          htmlFor="radio-card"
                          className={`flex space-x-2 justify-between border border-gray-200 p-4 rounded-lg cursor-pointer items-center ${
                            paymentMethod === "paypal" ? "bg-background " : ""
                          }`}
                        >
                          <div className="flex space-x-2 items-center">
                            <RadioGroupItem
                              className="rounded-full"
                              id="radio-card"
                              value="card"
                            />
                            <span>Credit Card</span>
                          </div>
                          <ListPaymentMethod />
                        </label>
                        <div
                          className={
                            paymentMethod === "card" ? "block" : "hidden"
                          }
                        >
                          <CardPayment />
                        </div>
                      </div>

                      <label
                        htmlFor="radio-paypal"
                        className={`flex space-x-2 justify-between border border-gray-200 p-4 rounded-lg cursor-pointer items-center ${
                          paymentMethod === "card"
                            ? "bg-background "
                            : "bg-accent"
                        }`}
                      >
                        <div className="flex space-x-2 items-center">
                          <RadioGroupItem
                            className="rounded-full"
                            id="radio-paypal"
                            value="paypal"
                          />
                          <span>Paypal</span>
                        </div>
                        <span>
                          <PaypalIcon />
                        </span>
                      </label>
                    </RadioGroup>
                    <div
                      className={paymentMethod === "card" ? "block" : "hidden"}
                    >
                      <SubmitPayment />
                    </div>
                  </PayPalHostedFieldsProvider>
                  <div
                    className={
                      paymentMethod === "paypal" ? "block w-full" : "hidden"
                    }
                  >
                    {" "}
                    <PaypalButtonPayment
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </div>
                </PayPalScriptProvider>
              ) : (
                <div>Loading...</div>
              )}
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
                        {formatCurrency(item.price)} x {item.quantity}
                      </p>
                      <p className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 py-3 border-t">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(getCartTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>
                  {formatCurrency(
                    getCartTotal() *
                      calculateTax(
                        formData.shippingAddress.country,
                        formData.shippingAddress.state
                      )
                  )}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <span>
                  {formatCurrency(
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
                  Your order qualifies for free shipping!h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
