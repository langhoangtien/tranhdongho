import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  serverUrl: string;
};

type BranchType = "quitmood" | "optilife";
// ----------------------------------------------------------------------
export const API_URL = import.meta.env.VITE_SERVER_URL ?? "";
export const BRANCH: BranchType =
  import.meta.env.VITE_BRANCH ?? "langtranhdongho"; // e.g. "main" or "dev"
export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? "";
export const CONFIG: ConfigValue = {
  appName: packageJson.name,
  appVersion: packageJson.version,
  serverUrl: API_URL,
};
export const SETTING = {
  PRODUCT_NAME: "QuitMood ™",
  COMPANY_NAME: "Quit Mood",
  CONTACT_EMAIL: "contact@quitmood.net",
  CONTACT_PHONE: "+1 302 590 6135",
  CONTACT_ADDRESS: "1111B S Governors Ave STE 28573 Dover Daleware 19904",
  CONTACT_WEBSITE: "https://www.quitmood.net",
};
export const PRODUCT_NAME = SETTING.PRODUCT_NAME;
export const COMPANY_NAME = SETTING.COMPANY_NAME;
export const CONTACT_EMAIL = SETTING.CONTACT_EMAIL;
export const CONTACT_PHONE = SETTING.CONTACT_PHONE;
export const CONTACT_ADDRESS = SETTING.CONTACT_ADDRESS;
export const CONTACT_WEBSITE = SETTING.CONTACT_WEBSITE;
