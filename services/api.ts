import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { getEnvironmentVariables } from "@/config/environment";

const env = getEnvironmentVariables();

console.log("Configurando API com URL:", env.API_URL);

const api = axios.create({
  baseURL: env.API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      "Fazendo requisição:",
      config.method?.toUpperCase(),
      config.url
    );
    return config;
  },
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("Resposta recebida:", response.status, response.data);
    return response;
  },
  (error: AxiosError) => {
    const errorMessage = getErrorMessage(error);
    console.error("Erro na resposta:", errorMessage, error);
    return Promise.reject(error);
  }
);

// Helper function to extract error message
function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    const data = error.response.data as any;
    if (data?.message) return data.message;
    if (typeof data === "string") return data;

    return `Erro ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    return "Sem resposta do servidor. Verifique sua conexão.";
  } else {
    return error.message || "Ocorreu um erro desconhecido";
  }
}

export default api;
