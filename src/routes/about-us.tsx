import {
  COMPANY_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/config";
import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <AboutUs />
    </MainLayout>
  );
}

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-center text-3xl font-semibold my-8">About Us</h2>
      <div>
        <p>
          Welcome to <strong>{COMPANY_NAME}</strong>, where we harness the power
          of nature to boost your wellness. Our journey is inspired by the
          belief that nature holds the key to optimal health, and we are
          committed to bringing you its most potent gifts through our premium
          supplements.
        </p>
        <h3 className="text-2xl font-semibold">
          <strong>Our Mission</strong>
        </h3>
        <p>
          Our mission at <strong>{COMPANY_NAME}</strong> is to empower your
          wellness journey with high-quality, natural supplements. We are
          dedicated to enhancing your health and vitality by providing products
          that support balance, healing, and strength from within.
        </p>
        <h3 className="text-2xl font-semibold">
          <strong>Our Products</strong>
        </h3>
        <ul className="list-disc px-8">
          <li>
            <p>
              <strong>Shilajit &amp; Sea Moss:</strong> Dive into nature&apos;s
              potency with shilajit, known for its enriching mineral content and
              energy-boosting properties, and sea moss, which supports thyroid
              function and boosts immunity with its rich mineral profile.
            </p>
          </li>
          <li>
            <p>
              <strong>Ashwagandha:</strong> Experience the calming effects of
              ashwagandha, an ancient herb that reduces stress, enhances
              stamina, and improves mental clarity.
            </p>
          </li>
          <li>
            <p>
              <strong>Black Seed Oil:</strong> Explore the therapeutic benefits
              of black seed oil, known for its antioxidant properties that
              support digestive health, reduce inflammation, and strengthen the
              immune system.
            </p>
          </li>
          <li>
            <p>
              <strong>Burdock Root:</strong> Tap into the detoxifying powers of
              burdock root to purify the blood, promote liver health, and
              improve skin conditions.
            </p>
          </li>
          <li>
            <p>
              <strong>Iodine:</strong> Ensure proper thyroid function and
              metabolic health with our sourced iodine, crucial for cognitive
              development and overall bodily functions.
            </p>
          </li>
          <li>
            <p>
              <strong>Chlorophyll:</strong> Embrace the lifeblood of plants with
              chlorophyll, which detoxifies the body, promotes healing, and
              fights fatigue.
            </p>
          </li>
          <li>
            <p>
              <strong>&amp; More:</strong> Alongside these key ingredients, our
              blend includes other powerful supplements designed to enhance
              absorption, maximize benefits, and support your journey to optimal
              health.
            </p>
          </li>
        </ul>
        <h3 className="text-2xl font-semibold">
          <strong>Our Promise</strong>
        </h3>
        <p>
          At <strong>{COMPANY_NAME}</strong>, we ensure that each product is
          crafted with the highest standards of purity and potency. We are
          committed to sustainability and ethical sourcing, ensuring that our
          supplements are free from harmful additives and are environmentally
          friendly.
        </p>
        <h3 className="text-2xl font-semibold">
          <strong>Join Our Community</strong>
        </h3>
        <p>
          Join the <strong>{COMPANY_NAME}</strong> family and connect with a
          community of wellness enthusiasts. We offer educational resources,
          interactive workshops, and a supportive online community to enhance
          your holistic health journey.
        </p>
        <p>
          Discover the power of nature with {COMPANY_NAME}.{" "}
          <strong>Awaken your inner {COMPANY_NAME} and thrive!</strong>
        </p>
        <p>
          <strong>{COMPANY_NAME} LLC</strong>
        </p>
        <p>
          <strong>Address:&nbsp;{CONTACT_ADDRESS}, United States</strong>
        </p>
        <p>
          <strong>Email:&nbsp;</strong>
          <a
            target="_blank"
            rel="noopener noreferrer nofollow"
            title=""
            role="url"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            <strong>{CONTACT_EMAIL}</strong>
          </a>
        </p>
        <p>
          <strong>Phone:&nbsp;{CONTACT_PHONE}</strong>
        </p>
      </div>
    </div>
  );
}
