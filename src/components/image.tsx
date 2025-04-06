import { convertIDToStaticURL } from "@/lib/utils";
import { ImgHTMLAttributes } from "react";

export default function Image({
  src,
  dimension,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { dimension?: number }) {
  const srcConvert =
    convertIDToStaticURL(src || "", dimension) || "/no-img.svg";

  return <img src={srcConvert} {...props} />;
}
