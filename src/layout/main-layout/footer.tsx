import ListPaymentMethod from "@/components/list-payment-method";
import { LogoWithLink } from "@/components/logo";
import { COMPANY_NAME, CONTACT_EMAIL } from "@/config";
import { Link } from "@tanstack/react-router";

const MENU = [
  {
    title: "MORE INFO",
    items: [
      { title: "Order Tracking", link: "/track-order" },
      { title: "About Us", link: "/about-us" },
      { title: "Blogs", link: "/blogs" },
      { title: "Contact", link: "/contact-us" },
      { title: "FAQs", link: "/faqs" },
    ],
  },
  {
    title: "POLICY",
    items: [
      { title: "Terms of Service", link: "/terms-of-service" },
      { title: "Privacy Policy", link: "/privacy-policy" },
      { title: "Shipping Policy", link: "/shipping-policy" },
      {
        title: "Return and Refund Policy",
        link: "/refund-and-cancellation-policy",
      },
      {
        title: "Billing Terms and Conditions",
        link: "/billing-terms-and-conditions",
      },
      { title: "Disclaimer", link: "/disclaimer" },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="border-t bg-accent border-border  py-8 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="space-y-4">
          <LogoWithLink className="w-32 h-16" />

          <h2 className="text-2xl font-bold">{COMPANY_NAME} LLC.</h2>
          <p className="text-sm mt-2">Email: {CONTACT_EMAIL}</p>
          {/* <div className="flex space-x-4 mt-4 text-xl">
          <FaFacebookF className="cursor-pointer hover:text-blue-500" />
          <FaYoutube className="cursor-pointer hover:text-red-500" />
          <FaTiktok className="cursor-pointer hover:text-black" />
        </div> */}
        </div>

        {/* More Info */}
        {MENU.map((item) => (
          <div key={item.title}>
            <h3 className="text-lg mb-2 font-semibold">{item.title}</h3>
            <ul className="mt-2 space-y-4  text-base">
              {item.items.map((subItem) => (
                <li
                  key={subItem.title}
                  className="hover:underline cursor-pointer"
                >
                  <Link to={subItem.link} key={subItem.title}>
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Policy */}
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t pt-4 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.34em"
              height="1em"
              viewBox="0 0 640 480"
            >
              <path fill="#bd3d44" d="M0 0h640v480H0" />
              <path
                stroke="#fff"
                strokeWidth="37"
                d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
              />
              <path fill="#192f5d" d="M0 0h364.8v258.5H0" />
              <marker id="flagUs4x30" markerHeight="30" markerWidth="30">
                <path fill="#fff" d="m14 0l9 27L0 10h28L5 27z" />
              </marker>
              <path
                fill="none"
                markerMid="url(#flagUs4x30)"
                d="m0 0l16 11h61h61h61h61h60L47 37h61h61h60h61L16 63h61h61h61h61h60L47 89h61h61h60h61L16 115h61h61h61h61h60L47 141h61h61h60h61L16 166h61h61h61h61h60L47 192h61h61h60h61L16 218h61h61h61h61h60z"
              />
            </svg>
          </span>
          <span>English (EN) | USD</span>
        </div>

        <div className="flex space-x-2 mt-2 md:mt-0">
          <p className="mt-2 md:mt-0 text-gray-400">
            Powered by {COMPANY_NAME}
          </p>
          <ListPaymentMethod />
        </div>
      </div>
    </footer>
  );
}
