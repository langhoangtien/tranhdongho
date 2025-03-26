import { useEffect, useState } from "react";
import { z } from "zod";
import {
  createFileRoute,
  redirect,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { AuthContext, useAuth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogoWithLink } from "@/components/logo";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fallback = "/admin" as const;

// 🛠 Schema validation
const loginSchema = z.object({
  username: z.string().min(3, "Username phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Password phải có ít nhất 6 ký tự"),
});

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
  const [error, setError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const search = Route.useSearch();

  // 🛠 Cập nhật form và reset lỗi khi thay đổi giá trị
  const updateLoginForm = (field: string, value: string | boolean) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined })); // Xóa lỗi khi user nhập lại
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); // Reset lỗi trước khi validate

    // 🛠 Validate form
    const validationResult = loginSchema.safeParse(loginForm);
    if (!validationResult.success) {
      // Nếu có lỗi, cập nhật state `errors`
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        username: fieldErrors.username?.[0],
        password: fieldErrors.password?.[0],
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await auth.login(loginForm.username, loginForm.password);
      if (loginForm.rememberMe) {
        localStorage.setItem("savedUsername", loginForm.username);
      } else {
        localStorage.removeItem("savedUsername");
      }
      await router.invalidate();
      await navigate({ to: search.redirect || fallback });
    } catch (error) {
      console.error("Error logging in: ", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername) {
      setLoginForm((prev) => ({
        ...prev,
        username: savedUsername,
        rememberMe: true,
      }));
    }
  }, []);

  const isLoggingIn = isLoading || isSubmitting;

  return (
    <div className="bg-background">
      <div className="relative bg-white/5">
        <LogoWithLink className="absolute z-20 top-4 left-4 w-24 h-24" />
        <div className="absolute inset-[35%] block rounded-full bg-white/15 blur-2xl" />
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center">
          <Card className="w-96 shadow-lg">
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!!error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div>
                  <Input
                    aria-invalid={Boolean(errors.username)}
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) =>
                      updateLoginForm("username", e.target.value)
                    }
                  />
                  {errors.username && (
                    <p className="text-destructive text-sm mt-0.5">
                      {errors.username}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <Input
                      aria-invalid={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) =>
                        updateLoginForm("password", e.target.value)
                      }
                    />
                    <Button
                      size={"icon"}
                      variant={"ghost"}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff strokeWidth={1.25} />
                      ) : (
                        <Eye strokeWidth={1.25} />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-0.5">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={loginForm.rememberMe}
                    onCheckedChange={(value) =>
                      updateLoginForm("rememberMe", Boolean(value))
                    }
                    id="remember"
                  />
                  <label htmlFor="remember" className="text-sm font-medium">
                    Remember me
                  </label>
                </div>

                <Button
                  onClick={handleSubmit}
                  type="submit"
                  className="w-full"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Logging in..." : "Login"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
