import { COMPANY_NAME, CONTACT_EMAIL } from "@/config";
import MainLayout from "@/layout/main-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <PrivacyPoliCy />
    </MainLayout>
  );
}
function PrivacyPoliCy() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="font-semibold text-accent-foreground text-3xl text-center my-8">
        Privacy Policy
      </h2>
      <div className="space-y-4">
        <p>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from
          {COMPANY_NAME} Supplements (the “Site”).
        </p>
        <h4>PERSONAL INFORMATION WE COLLECT</h4>
        <p>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as “Device Information”.
        </p>
        <p>We collect Device Information using the following technologies:</p>
        <ul>
          <li>
            “Cookies” are data files that are placed on your device or computer
            and often include an anonymous unique identifier. For more
            information about cookies, and how to disable cookies, visit
            http://www.allaboutcookies.org.
          </li>
          <li>
            “Log files” track actions occurring on the Site, and collect data
            including your IP address, browser type, Internet service provider,
            referring/exit pages, and date/time stamps.
          </li>
          <li>
            “Web beacons”, “tags”, and “pixels” are electronic files used to
            record information about how you browse the Site.
          </li>
        </ul>
        <p>
          Additionally when you make a purchase or attempt to make a purchase
          through the Site, we collect certain information from you, including
          your name, billing address, shipping address, payment information
          (including credit card numbers), email address, and phone number. We
          refer to this information as “Order Information”.
        </p>
        <p>
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </p>
        <h4>HOW DO WE USE YOUR PERSONAL INFORMATION?</h4>
        <p>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to:
        </p>
        <ul>
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud; and</li>
          <li>
            When in line with the preferences you have shared with us, provide
            you with information or advertising relating to our products or
            services.
          </li>
        </ul>
        <p>
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>
        <h4>SHARING YOUR PERSONAL INFORMATION</h4>
        <p>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. For example, we also
          use Google Analytics to help us understand how our customers use the
          Site -- you can read more about how Google uses your Personal
          Information here:{" "}
          <a href="https://www.google.com/intl/en/policies/privacy">
            https://www.google.com/intl/en/policies/privacy
          </a>{" "}
          You can also opt-out of Google Analytics here:{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">
            https://tools.google.com/dlpage/gaoptout
          </a>
          &nbsp;Finally, we may also share your Personal Information to comply
          with applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful requests for information we receive, or to
          otherwise protect our rights.
        </p>
        <h4>BEHAVIORAL ADVERTISING</h4>
        <p>
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at{" "}
          <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work">
            http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
          </a>
          &nbsp;
        </p>
        <p>You can opt-out of targeted advertising by using the links below:</p>
        <ul>
          <li>
            Facebook:{" "}
            <a href="https://www.facebook.com/settings/?tab=ads">
              https://www.facebook.com/settings/?tab=ads
            </a>
          </li>
          <li>
            Google:{" "}
            <a href="https://www.google.com/settings/ads/anonymous">
              https://www.google.com/settings/ads/anonymous
            </a>
          </li>
          <li>
            Bing:{" "}
            <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads">
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads{" "}
            </a>
          </li>
        </ul>
        <p>
          Additionally, you can opt-out of some of these services by visiting
          the Digital Advertising Alliance’s opt-out portal at{" "}
          <a href="http://optout.aboutads.info">http://optout.aboutads.info</a>
          &nbsp;
        </p>
        <h4>DO NOT TRACK</h4>
        <p>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </p>
        <h4>YOUR RIGHTS</h4>
        <p>
          If you are a European resident, you have the right to access personal
          information we hold about you and to ask that your personal
          information be corrected, updated, or deleted. If you would like to
          exercise this right, please contact us through the contact information
          below.
        </p>
        <p>
          Additionally, if you are a European resident we note that we are
          processing your information in order to fulfill contracts we might
          have with you (for example if you make an order through the Site), or
          otherwise to pursue our legitimate business interests listed above.
          Additionally, please note that your information will be transferred
          outside of Europe, including to Canada and the United States.
        </p>
        <h4>DATA RETENTION</h4>
        <p>
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </p>
        <h4>CHANGES</h4>
        <p>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons.
        </p>
        <h4>CONTACT US</h4>
        <p>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e‑mail at {CONTACT_EMAIL} {COMPANY_NAME} Supplements
        </p>
        <p>[Re: Privacy Compliance Officer]</p>
      </div>
    </div>
  );
}
