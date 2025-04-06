import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MainLayout from "@/layout/main-layout";
export const Route = createFileRoute("/faqs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <Faqs />
    </MainLayout>
  );
}

const data = [
  {
    title: "How do I place my order?",
    value: "0",
    content: (
      <div className="space-y-2">
        <p>
          Simply choose your style on the product page then click the “Add To
          Cart” button and follow the simple steps to complete your order.
        </p>
        <p>
          We’ll prepare your order and let you know when it&apos;s on its way!
        </p>
      </div>
    ),
  },
  {
    title: "How long will it take to ship my order?",
    value: "1",
    content:
      "Orders typically ship within 5 to 10 business days. For international orders, transit will take an additional 1 to 2 weeks.",
  },
  {
    title: "My tracking number isn’t working",
    value: "2",
    content:
      "Tracking numbers can take 1-2 days to appear in the shipping carrier's system. Occasionally, the shipping carrier can lose an order. If the tracking number is still not working within a few days, please contact the shipping carrier.",
  },
  {
    title: "I need help with a late order",
    value: "3",
    content: (
      <div className="space-y-2">
        <p>
          Orders typically ship within 5 to 10 business days. For international
          orders, transit will take an additional 1 to 2 weeks.
        </p>
        <p>
          If your order has not arrived after 10 business days (domestic) and 20
          business days (international), please contact our team, we are happy
          to assist.
        </p>
      </div>
    ),
  },
  {
    title: "What type of payments do you accept?",
    value: "4",
    content: "We accept Visa, Mastercard as well as Paypal.",
  },
  {
    title: "When will my card be charged?",
    value: "5",
    content: "Just after your order has been successfully placed.",
  },
  {
    title: "How secure is my personal information?",
    value: "6",
    content: (
      <div className="space-y-2">
        <p>
          We adhere to the highest industry standards to protect your personal
          information when you checkout and purchase.
        </p>
        <p>
          Your credit card information is encrypted during transmission using
          secure socket layer (SSL) technology, which is widely used on the
          Internet for processing payments. Your credit card information is only
          used to complete the requested transaction and is not subsequently
          stored.
        </p>
      </div>
    ),
  },
];
function Faqs() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-left text-3xl font-semibold my-8">FAQs</h2>
      <div className="px-4">
        <Accordion
          type="multiple"
          defaultValue={["0", "1", "2", "3", "4", "5", "6"]}
          className="w-full"
        >
          {data.map((item) => (
            <AccordionItem value={item.value} key={item.title}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
