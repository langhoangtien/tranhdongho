import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./auth";
import { ThemeProvider } from "./components/theme-provider";
import { CartProvider } from "./cart";
import FacebookPixel from "./components/facebook-pixcel";
import { useVisitorTracker } from "./hooks/use-visitor-tracker";

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}

function InnerApp() {
  const auth = useAuth();

  // Tạo router bên trong component để truyền context động
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    context: { auth },
  });

  return <RouterProvider router={router} />;
}

function App() {
  useVisitorTracker();
  return (
    <AuthProvider>
      <FacebookPixel />
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <CartProvider>
          <InnerApp />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
