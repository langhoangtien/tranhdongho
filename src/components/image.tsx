import { convertIDToURL } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

export default function Image({
  src,
  dimension,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { dimension?: number }) {
  const srcConvert = convertIDToURL(src || "", dimension) || "/no-img.svg";
  console.log("Image srcConvert", srcConvert);

  return <img src={srcConvert} {...props} />;
}
