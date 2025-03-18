import { useState } from "react";
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { z } from "zod";
import { useAuth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const fallback = "/dashboard" as const;
export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    console.log("beforeLoad", context);

    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: LoginComponent,
});

function LoginComponent() {
  const auth = useAuth();
  const router = useRouter();
  const isLoading = useRouterState({ select: (s) => s.isLoading });
  const navigate = Route.useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const search = Route.useSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    try {
      e.preventDefault();
      setError(null);
      setIsSubmitting(true);
      await auth.login(username, password);
      await router.invalidate();
      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <div className="flex relative min-h-screen bg-gradient-to-r from-[#00cba9] to-gray-50 dark:from-slate-700 dark:to-slate-900">
      <div className="absolute bottom-0 z-0 w-full text-[#00cba9] dark:text-[#000000]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 320">
          <path
            fill="currentColor"
            fillOpacity="0.4"
            d="M0,96L34.3,122.7C68.6,149,137,203,206,208C274.3,213,343,171,411,133.3C480,96,549,64,617,42.7C685.7,21,754,11,823,42.7C891.4,75,960,149,1029,186.7C1097.1,224,1166,224,1234,192C1302.9,160,1371,96,1406,64L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="absolute w-full h-full flex items-center justify-center z-10">
        <Card className="w-96 shadow-lg">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
