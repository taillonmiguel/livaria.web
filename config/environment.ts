interface Environment {
  API_URL: string;
  NODE_ENV: "development" | "production" | "test";
  APP_VERSION: string;
}

// Default environment variables
const defaultEnv: Environment = {
  API_URL: "http://localhost:5124",
  NODE_ENV: "development",
  APP_VERSION: "1.0.0",
};

// Get environment variables for Next.js
export function getEnvironmentVariables(): Environment {
  return {
    API_URL: process.env.NEXT_PUBLIC_API_URL || defaultEnv.API_URL,
    NODE_ENV:
      (process.env.NODE_ENV as Environment["NODE_ENV"]) || defaultEnv.NODE_ENV,
    APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || defaultEnv.APP_VERSION,
  };
}

// Check if we're in development mode
export const isDevelopment = (): boolean => {
  return getEnvironmentVariables().NODE_ENV === "development";
};

// Check if we're in production mode
export const isProduction = (): boolean => {
  return getEnvironmentVariables().NODE_ENV === "production";
};

// Check if we're in test mode
export const isTest = (): boolean => {
  return getEnvironmentVariables().NODE_ENV === "test";
};
