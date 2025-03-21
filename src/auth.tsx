import * as React from "react";
import { UKOSplashScreen } from "./components/loading/uko-loading";
import { CONFIG } from "./config";

type User = {
  _id: string;
  username: string;
  email: string;
  fullName: string;
};

export interface ResponseLogin {
  token: string;
  user: User;
}

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<ResponseLogin>;
  logout: () => void;
  user: User | null;
}
const INIT_AUTH_CONTEXT: AuthContext = {
  isAuthenticated: false,
  login: async () => {
    throw new Error("AuthProvider not yet initialized");
  },
  logout: () => {
    throw new Error("AuthProvider not yet initialized");
  },
  user: null,
};
const AuthContext = React.createContext<AuthContext>(INIT_AUTH_CONTEXT);
const key = "token";

async function getStoredUser(): Promise<User | null> {
  const token = localStorage.getItem(key);
  if (!token) return null;

  try {
    const response = await fetch(`${CONFIG.serverUrl}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      localStorage.removeItem(key);
      return null;
    }

    const user = await response.json();
    console.log("user", user);

    return user;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}

function setStoredUser(token: string | null) {
  if (token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true); // <-- Thêm trạng thái loading
  const isAuthenticated = !!user;

  React.useEffect(() => {
    async function initialize() {
      const storedUser = await getStoredUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    }
    initialize();
  }, []);

  const login = React.useCallback(
    async (username: string, password: string) => {
      const response = await fetch(`${CONFIG.serverUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data: ResponseLogin = await response.json();
      setStoredUser(data.token);
      setUser(data.user);
      return data; // Trả về để sử dụng trong component
    },
    []
  );

  const logout = React.useCallback(() => {
    setStoredUser(null);
    setUser(null);
  }, []);

  if (isLoading) return <UKOSplashScreen />;
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
