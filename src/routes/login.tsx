import { useState } from "react";
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { z } from "zod";
import { AuthContext, useAuth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";

const fallback = "/admin" as const;
export const Route = createFileRoute("/login")({
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    const authContext = context as { auth: AuthContext };
    if (authContext.auth.isAuthenticated) {
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
    <div className="bg-background">
      <div className="relative bg-white/5">
        <Logo className="absolute z-20 top-4 left-4 w-24 h-24" />
        <div className="absolute inset-[35%] block rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
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
    </div>
  );
}
