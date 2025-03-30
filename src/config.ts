import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
};

// ----------------------------------------------------------------------
export const API_URL = import.meta.env.VITE_SERVER_URL ?? "";
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? "";
export const CONFIG: ConfigValue = {
  appName: packageJson.name,
  appVersion: packageJson.version,
  serverUrl: API_URL,
};
export const PRODUCT_NAME = "QuitMood ™";
export const COMPANY_NAME = "Quit Mood";
export const CONTACT_EMAIL = "contact@quitmood.net";
export const CONTACT_PHONE = "+1 302 590 6135";
export const CONTACT_ADDRESS =
  "1111B S Governors Ave STE 28573 Dover Daleware 19904";
export const CONTACT_WEBSITE = "https://www.quitmood.net";
