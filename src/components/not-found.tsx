import { motion as m } from "motion/react";
import PageNotFoundIllustration from "@/assets/illustrations/page-not-found-illustration";

import { MotionContainer } from "@/components/animate/motion-container";
import { varBounce } from "@/components/animate/variants/bounce";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-80 h-screen">
      <MotionContainer>
        <m.div variants={varBounce().in}>
          <p className="text-3xl font-bold">Sorry, page not found!</p>
        </m.div>

        <m.div variants={varBounce().in}>
          <p className="text-center text-gray-500">
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? rrr Be sure to check your spelling.
          </p>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration />
        </m.div>

        <Link to={"."}>
          <Button variant="default">Go to home</Button>
        </Link>
      </MotionContainer>
    </div>
  );
}
