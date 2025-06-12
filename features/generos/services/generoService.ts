import api from "@/services/api";
import type { GeneroModel } from "../models/GeneroModel";

export async function getGeneros(): Promise<GeneroModel[]> {
  const response = await api.get("/Genero/v1");
  return response.data;
}

export async function getGeneroById(id: string): Promise<GeneroModel> {
  const response = await api.get(`/Genero/v1/${id}`);
  return response.data;
}

export async function createGenero(nome: string): Promise<GeneroModel> {
  const response = await api.post("/Genero/v1", { nome });
  return response.data;
}

export async function updateGenero(
  id: string,
  nome: string
): Promise<GeneroModel> {
  const response = await api.put(`/Genero/v1/${id}`, { nome });
  return response.data;
}

export async function deleteGenero(id: string): Promise<void> {
  await api.delete(`/Genero/v1/${id}`);
}
