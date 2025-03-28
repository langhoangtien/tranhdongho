import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/billing-terms-and-conditions")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <BillingTermsAndConditions />
    </MainLayout>
  );
}
export default function BillingTermsAndConditions() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="font-semibold text-accent-foreground text-3xl text-center my-8">
        Billing Terms and Conditions
      </h2>
      <div className="space-y-2" data-text-editor-id="content">
        <p>
          Thank you for shopping at <strong>OptiLife</strong>! We strive to
          provide you with a seamless and secure shopping experience. Please
          review our payment policy below:
        </p>
        <p className="p1">
          <strong>Accepted Payment Methods:</strong>
        </p>
        <ul className="list-disc px-8">
          <li>
            <p>
              <strong>Credit Cards:</strong> We accept Visa, MasterCard,
              American Express, and Discover.
            </p>
          </li>
          <li>
            <p>
              <strong>Debit Cards:</strong> We accept debit cards with Visa or
              MasterCard logos.
            </p>
          </li>
          <li>
            <p>
              <strong>Apple Pay:</strong> For convenient checkout using Apple
              devices.
            </p>
          </li>
          <li>
            <p>
              <strong>Google Pay:</strong> For quick and easy payments with
              Google accounts.
            </p>
          </li>
          <li>
            <p>
              <strong>Bank Transfers:</strong> Direct bank transfers are
              accepted for large purchases. Please contact us for more
              information.
            </p>
          </li>
        </ul>
        <p>
          <strong>Currency:</strong> All transactions on OptiLife are processed
          in United States Dollar (USD). Prices displayed on the website are in
          USD by default.
        </p>
        <p>
          <strong>Tax Policy:</strong> Tax will be calculated during checkout if
          applicable based on the shipping address provided. The tax rate will
          vary depending on the destination of the order and the applicable tax
          laws.
        </p>
        <p>
          <strong>Payment Processing:</strong>
        </p>
        <ul className="list-disc px-8">
          <li>
            <p>
              Payments are processed securely through our trusted payment
              gateway.
            </p>
          </li>
          <li>
            <p>
              Your credit/debit card information is encrypted and securely
              processed by our payment partners.
            </p>
          </li>
          <li>
            <p>
              We do not store your payment information on our servers for
              security reasons.
            </p>
          </li>
        </ul>
        <p>
          <strong>Order Confirmation:</strong>
        </p>
        <ul className="list-disc px-8">
          <li>
            <p>
              You will receive an order confirmation email shortly after placing
              your order.
            </p>
          </li>
          <li>
            <p>
              Please review the order details carefully and contact us
              immediately if you notice any discrepancies.
            </p>
          </li>
        </ul>
        <p>
          <strong>Payment Confirmation:</strong>
        </p>
        <ul className="list-disc px-8">
          <li>
            <p>
              Once payment is successfully processed, you will receive a payment
              confirmation email.
            </p>
          </li>
          <li>
            <p>
              If you encounter any issues during the payment process, please
              contact our customer support at{" "}
              <a
                target="_blank"
                rel="noopener noreferrer nofollow"
                title=""
                role="url"
                href="mailto:info@optilifecompany.com"
              >
                info@optilifecompany.com
              </a>{" "}
              for assistance.
            </p>
          </li>
        </ul>
        <p>
          <strong>Order Cancellation:</strong>
        </p>
        <ul className="list-disc px-8">
          <li>
            <p>
              Orders can be canceled within 24 hours of placement by contacting
              our customer support team.
            </p>
          </li>
          <li>
            <p>
              Once an order has been processed and shipped, it cannot be
              canceled. Please refer to our Returns &amp; Refunds Policy for
              further assistance.
            </p>
          </li>
        </ul>
        <p>
          <strong>Payment Security:</strong>
        </p>
        <ul className="list-disc px-8">
          <li>
            <p>We prioritize the security of your payment information.</p>
          </li>
          <li>
            <p>
              Our website is equipped with SSL encryption to ensure secure
              transmission of data.
            </p>
          </li>
          <li>
            <p>
              We comply with industry standards and regulations to safeguard
              your payment details.
            </p>
          </li>
        </ul>
        <p>
          <strong>Contact Information:</strong> If you have any questions or
          concerns regarding our payment policy, please feel free to contact us
          at:
          <br />
          Email:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            title=""
            role="url"
            href="mailto:contact@optilifecompany.com"
          >
            contact@optilifecompany.com
          </a>
        </p>
        <p>
          <strong>Policy Revision:</strong> OptiLife reserves the right to
          update or modify this payment policy at any time without prior notice.
          Please review this policy periodically for any changes.
        </p>
        <p>
          By shopping with OptiLife, you agree to abide by the terms outlined in
          this payment policy. Thank you for choosing OptiLife for your needs!
        </p>
      </div>
    </div>
  );
}
