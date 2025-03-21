import { motion as m } from "motion/react";

import { HTMLProps } from "react";
import { Logo } from "../logo";

// ----------------------------------------------------------------------

export type AnimateLogoProps = HTMLProps<HTMLDivElement> & {
  logo?: React.ReactNode;
};

export function AnimateLogo1({ logo, ...other }: AnimateLogoProps) {
  return (
    <div
      className="relative inline-flex h-[120px] w-[120px] items-center justify-center"
      {...other}
    >
      <m.div
        className="inline-flex"
        animate={{ scale: [1, 0.9, 0.9, 1, 1], opacity: [1, 0.48, 0.48, 1, 1] }}
        transition={{
          duration: 2,
          repeatDelay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {logo ?? <Logo />}
      </m.div>

      <m.div
        animate={{
          scale: [1.6, 1, 1, 1.6, 1.6],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        className="absolute h-[calc(100%-20px)] w-[calc(100%-20px)] border-[3px] border-primary/70"
      />

      <m.div
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ["25%", "25%", "50%", "50%", "25%"],
        }}
        transition={{ ease: "linear", duration: 3.2, repeat: Infinity }}
        className="absolute h-full w-full border-8 border-primary/70"
      />
    </div>
  );
}

// ----------------------------------------------------------------------

export function AnimateLogo2({ logo, ...other }: AnimateLogoProps) {
  return (
    <div
      // alignItems="center"
      // justifyContent="center"
      // sx={{
      //   width: 96,
      //   height: 96,
      //   position: 'relative',
      //   alignItems: 'center',
      //   display: 'inline-flex',
      //   justifyContent: 'center',
      //   ...sx,
      // }}
      className="relative inline-flex h-24 w-24 items-center justify-center"
      {...other}
    >
      {logo ?? <Logo />}

      <m.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        // sx={{
        //   width: 1,
        //   height: 1,
        //   opacity: 0.16,
        //   borderRadius: '50%',
        //   position: 'absolute',
        //   transition: (theme) =>
        //     theme.transitions.create(['opacity'], {
        //       easing: theme.transitions.easing.easeInOut,
        //       duration: theme.transitions.duration.shorter,
        //     }),
        //   background: (theme) =>
        //     `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 50%, ${theme.vars.palette.primary.main} 100%)`,
        // }}
        className="absolute h-[1px] w-[1px] rounded-[50%] bg-gradient-to-br from-transparent to-primary opacity-[0.16]"
      />
    </div>
  );
}
