import type { NextConfig } from "next";
import config from "./config";

const nextConfig: NextConfig = {
  env: {
    DB_URI: config.DB_URI,
    API: config.API,
  },
};

export default nextConfig;
