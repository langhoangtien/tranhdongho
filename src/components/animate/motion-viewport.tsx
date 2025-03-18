import type { MotionProps } from "framer-motion";

import { motion as m } from "motion/react";
import { forwardRef, HTMLProps } from "react";

import { varContainer } from "./variants";

// ----------------------------------------------------------------------

export type MotionViewportProps = HTMLProps<HTMLDivElement> &
  MotionProps & {
    disableAnimate?: boolean;
  };

export const MotionViewport = forwardRef<HTMLDivElement, MotionViewportProps>(
  ({ children, disableAnimate = true, ...other }, ref) => {
    const smDown = true;

    const disabled = smDown && disableAnimate;

    const props = disabled
      ? {}
      : {
          component: m.div,
          initial: "initial",
          whileInView: "animate",
          variants: varContainer(),
          viewport: { once: true, amount: 0.3 },
        };

    return (
      <div ref={ref} {...props} {...other}>
        {children}
      </div>
    );

    MotionViewport.displayName = "MotionViewport";
  }
);
