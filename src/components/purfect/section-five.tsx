import { Link } from "@tanstack/react-router";
import StarIcon from "../icons/star-icon";

const reviews = [
  {
    name: "Matt J. ",
    time: "20 in 1 Bundle",
    content:
      "PurfectFuel ™ truly lives up to its name! Since starting the Dynamic Vitality Bundle, I've noticed a significant boost in my energy levels and overall vitality. Highly recommended!",
  },
  {
    name: "David S. ",
    time: "15 in 1 Blend",
    content:
      "As a fitness guy, I'm always looking for ways to optimize my performance. This bundle has become an essential part of my routine, helping me push past my limits and achieve my goals",
  },
  {
    name: "Michael B. ",
    time: "20 in 1 Bundle",
    content:
      "I've struggled with fatigue and low energy for years, but Sea moss has been a game-changer for me. I feel more energized and focused than ever before. Thank you, Hercules!",
  },
];
export default function SectionFive() {
  return (
    <section className="pt-16  relative">
      {/* Container chính */}
      <div
        className="h-20"
        style={{
          backgroundImage:
            "url(https://cdn.shopify.com/s/files/1/0840/0158/7493/files/gjhh.png?v=1712097559)",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="mx-auto bg-[#bedeb5] pt-6 pb-16 sm:px-8 px-4  md:px-20">
        {/* Hàng hiển thị rating */}
        <div className="flex items-center my-4 text-primary justify-center space-x-4">
          <StarIcon className="size-8 " />
          <StarIcon className="size-8" />
          <StarIcon className="size-8 " />
          <StarIcon className="size-8" />
          <StarIcon className="size-8" />
        </div>
        {/* Tiêu đề chính và mô tả */}
        <div className="text-center text-primary  font-sans mb-16">
          <h2 className="text-3xl font-semibold ">
            The best supplement ever; according to 114k+ 5 star reviews
          </h2>
          <p className="text-lg font-semibold  mt-2">
            People love PurfectFuel — read why 98% of PurfectFuel customers
            would shop with us again.
          </p>
        </div>

        {/* Phần nội dung chính */}
        <div className="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 p-4 gap-8 lg:gap-16 ">
          {/* Cột bên trái (thống kê) */}

          {reviews.map((review) => (
            <div key={review.name} className="pt-16">
              <div className="bg-accent p-8 rounded-2xl space-y-2 shadow-md relative">
                <img
                  src="/purfect/img9.avif"
                  className="w-20 h-20 object-contain rounded-full absolute -top-10 right-6"
                ></img>
                <span className="flex items-center space-x-1 text-primary">
                  <StarIcon className="size-5 " />
                  <StarIcon className="size-5 " />
                  <StarIcon className="size-5 " />
                  <StarIcon className="size-5 " />
                  <StarIcon className="size-5 " />
                </span>

                <p className="text-base font-semibold text-left  italic mb-4">
                  “{review.content}”
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-base font-bold ">{review.name}</p>
                    <p className="text-base ">{review.time}</p>
                  </div>
                  <Link
                    to="/products/purfect-fuel-blend"
                    className="mt-4 py-1 px-3 text-base underline  rounded-md font-sans text-primary"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="pt-16 order-first md:order-last">
            <div className="p-8  rounded-2xl shadow-md h-full flex flex-col space-y-2 bg-primary text-white text-left  justify-center">
              <h3 className="text-2xl font-bold ">
                Don’t just take our word for it
              </h3>
              <p className=" text-base mb-4">Over 4,000 five star reviews</p>
              <p className="text-base mb-2">4.9 Average</p>
              <p className=" text-base">833 reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
