import * as React from "react";
import { CONFIG } from "./config";
import { User } from "./routes/admin/users";
import SpinerLoading from "./components/loading/spiner-loading";

export interface ResponseLogin {
  token: string;
  user: User;
}

export interface AuthContext {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<ResponseLogin>;
  logout: () => void;
  user: User | null;
  initialize: () => Promise<void>;
}

export const STORAGE_KEY = "token";

const INIT_AUTH_CONTEXT: AuthContext = {
  isAuthenticated: false,
  login: async () => {
    throw new Error("AuthProvider not yet loading");
  },
  logout: () => {
    throw new Error("AuthProvider not yet loading");
  },
  user: null,
  initialize: async () => {},
};

const AuthContext = React.createContext<AuthContext>(INIT_AUTH_CONTEXT);

const key = STORAGE_KEY;

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
  const [loading, setLoading] = React.useState(false);

  const isAuthenticated = !!user;

  const initialize = React.useCallback(async () => {
    if (user) return;
    setLoading(true);
    const storedUser = await getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, [user]);

  const login = React.useCallback(
    async (username: string, password: string) => {
      const response = await fetch(`${CONFIG.serverUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || "Invalid credentials");
      }

      const data: ResponseLogin = await response.json();
      setStoredUser(data.token);
      setUser(data.user);

      return data;
    },
    []
  );

  const logout = React.useCallback(() => {
    setStoredUser(null);
    setUser(null);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center w-full justify-center h-screen">
        <SpinerLoading />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, initialize }}
    >
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
