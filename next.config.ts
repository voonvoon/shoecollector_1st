import type { NextConfig } from "next";
import config from "./config";

const nextConfig: NextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
    NEXTAUTH_SECRET:config.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID:config.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: config.GOOGLE_CLIENT_SECRET,
    DATABASE_URL:config.DATABASE_URL,
    AUTH_SECRET:config.AUTH_SECRET
  },
};

export default nextConfig;
