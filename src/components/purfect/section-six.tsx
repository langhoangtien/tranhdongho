import { Link } from "@tanstack/react-router";

const effects = [
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_10.png?v=1712073082",
    description:
      "Seamoss provides an array of essential minerals vital for overall bodily functions, supporting everything from bone health to enzyme activity.",
    title: "Mineral Support",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_11.png?v=1712073082",
    description:
      "Shilajit facilitates the regulation of hormonal balance, particularly",
    title: "Cellular Vitality",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_15.png?v=1712073082",
    description: "Enjoy the benefits of an enhanced life",
    title: "Immune Boost",
  },
  {
    image:
      "https://cdn.shopify.com/s/files/1/0840/0158/7493/files/Layer_14_be8453cb-dd7d-494f-b994-a1436677e67a.png?v=1712107180",
    description:
      "Ashwagandha aids in stress reduction and supports cognitive function, enhancing focus and mental clarity.",
    title: "Testosterone Boost",
  },
];
export default function SectionSix() {
  return (
    <div className="w-full mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Left: Product Images */}
        <div
          style={{ backgroundImage: "url('/purfect/blog1.jpg')" }}
          className="flex gap-6 min-h-full h-[80vh] bg-cover items-end"
        ></div>

        {/* Right: Text Content */}
        <div className="space-y-6 md:p-16 p-8 bg-[url(https://cdn.shopify.com/s/files/1/0840/0158/7493/files/hgkuj.png?v=1712106922)] text-white">
          <h1 className="text-5xl font-bold">
            Your new ‘Herculean’ starter kit.
          </h1>
          <p className="text-lg">
            Sea moss is real, and it has 50+ of the 102 minerals our body
            desperately needs but can’t attain through a regular diet. Shilajit
            on the other hand, increases testosterone by up to 30% in lab
            studies.
          </p>

          <div className="flex gap-8 text-center text-primary mt-6">
            {effects.map((effect) => (
              <div
                key={effect.title}
                className="flex flex-col space-y-2 items-center"
              >
                <img
                  src={effect.image}
                  alt={effect.title}
                  loading="lazy"
                  className="w-16 h-16 object-contain"
                />
                <h1 className="text-base font-bold">{effect.title}</h1>
              </div>
            ))}
            <div></div>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              to="/products/purfect-fuel-blend"
              className="bg-primary text-white px-6 py-4 rounded-full text-lg font-medium shadow-lg"
            >
              Start your PurfectFuel™ Today →
            </Link>
            <p className="mt-4 text-base font-semibold">
              Love it or your money back, guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
