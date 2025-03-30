import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const data = [
  {
    title: "How do I use QuitMood ™ products?",
    content:
      "For best results, take the recommended dosage daily with water or food as directed on the product label.",
  },
  {
    title: "What are the effects of QuitMood ™ supplements?",
    content:
      "Our supplements are designed to support overall health, vitality, and well-being. They may help boost energy levels, promote immune function, enhance skin health, and support hormonal balance.",
  },
  {
    title: "How does QuitMood ™ work?",
    content:
      "Our supplements harnesses the power of natural ingredients like sea moss, shilajit, and ashwagandha to provide essential nutrients, support hormone regulation, and promote overall wellness.",
  },
  {
    title: "Are there any side effects?",
    content:
      "Our supplements are formulated with natural ingredients and are generally safe for most individuals. However, it's always recommended to consult with a healthcare professional before starting any new supplement regimen, especially if you have any pre-existing health conditions or are taking medication.",
  },
  {
    title: "Is QuitMood ™ suitable for vegetarians/vegans?",
    content:
      "YOur supplements are formulated with natural ingredients and are generally safe for most individuals. However, it's always recommended to consult with a healthcare professional before starting any new supplement regimen, especially if you have any pre-existing health conditions or are taking medication.",
  },
];
export default function SectionSeven() {
  return (
    <div className="w-full max-w-7xl mx-auto mt-10 ">
      <div className="grid grid-cols-1 p-8 md:grid-cols-2">
        <div className="flex flex-col space-y-4">
          <p className="text-4xl text-primary font-semibold">
            Frequently Asked Questions
          </p>
          <div className="px-4">
            <Accordion type="single" collapsible className="w-full">
              {data.map((item, index) => (
                <AccordionItem key={item.title} value={`item-${index}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="w-full aspect-square ">
          <img
            className="w-full object-contain rounded-md"
            src="/purfect/slide4.webp"
          />
        </div>
      </div>
    </div>
  );
}
