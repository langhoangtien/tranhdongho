import { ServerErrorIllustration } from "@/assets/illustrations";
import { MotionContainer, varBounce } from "@/components/animate";
import { Button } from "@/components/ui/button";
import SimpleLayout from "@/layout/simple-layout";
import { Link } from "@tanstack/react-router";
import { motion as m } from "motion/react";
export default function ServerError() {
  return (
    <SimpleLayout>
      <div className="flex flex-col items-center shrink-0 flex-grow justify-center ">
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <p className="text-3xl font-bold">500 Internal server error</p>
          </m.div>

          <m.div variants={varBounce().in}>
            <p className="text-center text-gray-500">
              There was an error, please try again later.
            </p>
          </m.div>

          <m.div variants={varBounce().in}>
            <ServerErrorIllustration />
          </m.div>

          <Link to="/">
            <Button variant="default">Go to home</Button>
          </Link>
        </MotionContainer>
      </div>
    </SimpleLayout>
  );
}
