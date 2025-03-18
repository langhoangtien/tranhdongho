import type { UseInViewOptions } from 'framer-motion';

import { useRef, useEffect, HTMLProps } from 'react';
import { m, animate, useInView, useTransform, useMotionValue } from 'framer-motion';

// ----------------------------------------------------------------------

export type AnimateCountUpProps = HTMLProps<HTMLParagraphElement> & {
  to: number;
  from?: number;
  toFixed?: number;
  duration?: number;
  unit?: 'k' | 'm' | 'b' | string;
  once?: UseInViewOptions['once'];
  amount?: UseInViewOptions['amount'];
};

export function AnimateCountUp({
  to,
  from = 0,
  toFixed = 0,
  once = true,
  duration = 2,
  amount = 0.5,
  unit: unitProp,
  ...other
}: AnimateCountUpProps) {
  const ref = useRef(null);

  const shortNumber = shortenNumber(to);

  const startCount = useMotionValue<number>(from);

  const endCount = shortNumber ? shortNumber.value : to;

  const unit = unitProp ?? shortNumber?.unit;

  const inView = useInView(ref, { once, amount });

  const rounded = useTransform(startCount, (latest) =>
    latest.toFixed(isFloat(latest) ? toFixed : 0)
  );

  useEffect(() => {
    if (inView) {
      animate(startCount, endCount, { duration });
    }
  }, [duration, endCount, inView, startCount]);

  return (
    <p className="m-0 inline-flex p-0" {...other}>
      <m.span ref={ref}>{rounded}</m.span>
      {unit}
    </p>
  );
}

// ----------------------------------------------------------------------

function isFloat(n: number | string) {
  return typeof n === 'number' && !Number.isInteger(n);
}

function shortenNumber(num: number): { unit: string; value: number } | undefined {
  if (num >= 1e9) {
    return { unit: 'b', value: num / 1e9 };
  }
  if (num >= 1e6) {
    return { unit: 'm', value: num / 1e6 };
  }
  if (num >= 1e3) {
    return { unit: 'k', value: num / 1e3 };
  }
  return undefined;
}
