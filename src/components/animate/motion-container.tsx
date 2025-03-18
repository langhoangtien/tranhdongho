import type { MotionProps } from "motion/react";

import { motion as m } from "motion/react";
import { forwardRef, HTMLProps } from "react";

import { varContainer } from "./variants";

// ----------------------------------------------------------------------

export type MotionContainerProps = HTMLProps<HTMLDivElement> &
  MotionProps & {
    animate?: boolean;
    action?: boolean;
  };

export const MotionContainer = forwardRef<HTMLDivElement, MotionContainerProps>(
  ({ animate, action = false, children, ...other }, ref) => {
    const commonProps = {
      ref,
      variants: varContainer(),
      initial: action ? false : "initial",
      animate: action ? (animate ? "animate" : "exit") : "animate",
      exit: action ? undefined : "exit",
      ...other,
    };

    return (
      <m.div
        className="flex max-w-sm flex-col items-center justify-center space-y-4 md:space-y-12"
        {...commonProps}
      >
        {children}
      </m.div>
    );

    MotionContainer.displayName = "MotionContainer";
  }
);
