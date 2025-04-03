import { useState } from "react";
import {
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

import { Button } from "@/components/ui/button";
import { CircleHelpIcon, Loader2, Lock } from "lucide-react";

import { API_URL } from "@/config";
import { useCart } from "@/cart";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const CUSTOM_CLASS =
  "flex h-12 w-full rounded-md border border-input bg-gray-200 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none text-accent  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";
const INVALID_COLOR = {
  color: "#dc3545",
};

// Example of custom component to handle form submit
export const SubmitPayment = () => {
  const [paying, setPaying] = useState(false);
  const navigate = useNavigate();
  const cart = useCart();
  const { clearCart } = cart;
  const hostedField = usePayPalHostedFields();

  const handleClick = () => {
    const cardHolderName = (
      document.getElementById("card-holder") as HTMLInputElement
    )?.value;
    if (!hostedField?.cardFields) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalHostedFieldsProvider />";
      console.log(childErrorMessage);
      return;
    }
    const isFormInvalid =
      Object.values(hostedField.cardFields.getState().fields).some(
        (field) => !field.isValid
      ) || !cardHolderName;

    if (isFormInvalid) {
      return alert("The payment form is invalid");
    }
    setPaying(true);
    hostedField.cardFields
      .submit({
        cardholderName: cardHolderName,
      })
      .then((data) => {
        // Your logic to capture the transaction
        fetch(`${API_URL}/payment/paypal/${data.orderId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "COMPLETED") {
              clearCart();
              navigate({ to: "/order-complete" });
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          })
          .finally(() => {
            setPaying(false);
          });
      })
      .catch((err) => {
        console.log("Error:", err);

        setPaying(false);
      });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleClick}
        disabled={paying}
        type="submit"
        size="lg"
        className="my-2 w-full h-14 bg-[#0070ba] text-xl border-[#0070ba] text-white hover:bg-[#0070ba]"
      >
        {paying && <Loader2 className="animate-spin" />} Payment
      </Button>
    </div>
  );
};

export default function CardPayment() {
  return (
    <>
      <div className="space-y-2 mt-4 bg-accent px-6 py-4 rounded-md">
        <div>
          <label
            className="block mb-1 text-accent-foreground"
            htmlFor="card-number"
          >
            Card Number
            <span style={INVALID_COLOR}>*</span>
          </label>
          <div className="relative">
            <PayPalHostedField
              style={{ color: "red" }}
              id="card-number"
              className={CUSTOM_CLASS}
              hostedFieldType="number"
              options={{
                selector: "#card-number",
                placeholder: "4111 1111 1111 1111",
              }}
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-1 text-accent-foreground" htmlFor="cvv">
            CVV<span style={INVALID_COLOR}>*</span>
          </label>

          <div className="relative">
            <PayPalHostedField
              id="cvv"
              className={CUSTOM_CLASS}
              hostedFieldType="cvv"
              options={{
                selector: "#cvv",
                placeholder: "123",
                maskInput: true,
              }}
            />
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
              <CircleHelpIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        <div>
          <label
            className="block mb-1 text-accent-foreground"
            htmlFor="expiration-date"
          >
            Expiration Date
            <span style={INVALID_COLOR}>*</span>
          </label>
          <div className="relative">
            <PayPalHostedField
              id="expiration-date"
              className={CUSTOM_CLASS}
              hostedFieldType="expirationDate"
              options={{
                selector: "#expiration-date",
                placeholder: "MM/YYYY",
              }}
            />
          </div>
        </div>
        <div>
          <label
            className="block mb-1 text-accent-foreground"
            htmlFor="card-holder"
            title="This represents the full name as shown in the card"
          >
            Card Holder Name
          </label>
          <input
            id="card-holder"
            className={cn(CUSTOM_CLASS, "text-black")}
            type="text"
            placeholder="Full name"
          />
        </div>
      </div>
    </>
  );
}
