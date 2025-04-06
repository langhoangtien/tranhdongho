/* eslint-disable @typescript-eslint/no-explicit-any */

import { PayPalButtons } from "@paypal/react-paypal-js";

interface PaymentProps {
  createOrder: (data: any, actions: any) => Promise<string>;
  onApprove: (data: any, actions: any) => Promise<void>;
}

export default function PaypalButtonPayment({
  createOrder,
  onApprove,
}: PaymentProps) {
  return (
    <div className="w-full py-4">
      <PayPalButtons
        style={{
          shape: "rect",
          layout: "vertical",
          color: "blue",
          label: "checkout",
          disableMaxWidth: true,
        }}
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </div>
  );
}
