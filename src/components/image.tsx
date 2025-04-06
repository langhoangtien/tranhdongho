import { convertIDToStaticURL } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

export default function Image({
  src,
  dimension,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { dimension?: number }) {
  console.log("src", src);

  const srcConvert =
    convertIDToStaticURL(src || "", dimension) || "/no-img.svg";

  return <img src={srcConvert} {...props} />;
}
