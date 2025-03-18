import type { Variants, UseInViewOptions } from 'framer-motion';

import { useRef, useEffect, HTMLProps } from 'react';
import { m, useInView, useAnimation } from 'framer-motion';

import { varFade, varContainer } from './variants';

// ----------------------------------------------------------------------

export const animateTextClasses = {
  root: 'animate-text-root',
  lines: 'animate-text-lines',
  line: 'animate-text-line',
  word: 'animate-text-word',
  char: 'animate-text-char',
  space: 'animate-text-space',
  srOnly: 'sr-only',
  dataIndex: '[data-columns="3"]',
};

export type AnimateTextProps = HTMLProps<HTMLParagraphElement> & {
  variants?: Variants;
  repeatDelay?: number;
  text: string | string[];
  once?: UseInViewOptions['once'];
  amount?: UseInViewOptions['amount'];
};

export function AnimateText({
  text,
  variants,
  once = true,
  amount = 1 / 3,

  repeatDelay = 500, // 1000 = 1s

  className,
  ...other
}: AnimateTextProps) {
  const ref = useRef(null);

  const controls = useAnimation();

  const textArray = Array.isArray(text) ? text : [text];

  const isInView = useInView(ref, { once, amount });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const show = () => {
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start('initial');
          controls.start('animate');
        }, repeatDelay);
      } else {
        controls.start('animate');
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start('initial');
    }

    return () => clearTimeout(timeout);
  }, [controls, isInView, repeatDelay]);

  return (
    <p className={animateTextClasses.root.concat(className ? ` ${className}` : '')} {...other}>
      <span className={animateTextClasses.srOnly}>{textArray.join(' ')}</span>

      <m.span
        ref={ref}
        initial="initial"
        animate={controls}
        exit="exit"
        variants={varContainer()}
        aria-hidden
        className={animateTextClasses.lines}
      >
        {textArray.map((line, lineIndex) => (
          <span
            key={`${line}-${lineIndex}`}
            data-index={lineIndex}
            className={animateTextClasses.line}
          >
            {line.split(' ').map((word, wordIndex) => {
              const lastWordInline = line.split(' ')[line.split(' ').length - 1];

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  data-index={wordIndex}
                  className={animateTextClasses.word}
                >
                  {word.split('').map((char, charIndex) => (
                    <m.span
                      key={`${char}-${charIndex}`}
                      variants={variants ?? varFade().in}
                      data-index={charIndex}
                      className={animateTextClasses.char}
                    >
                      {char}
                    </m.span>
                  ))}

                  {lastWordInline !== word && (
                    <span className={animateTextClasses.space} style={{ display: 'inline-block' }}>
                      &nbsp;
                    </span>
                  )}
                </span>
              );
            })}
          </span>
        ))}
      </m.span>
    </p>
  );
}
