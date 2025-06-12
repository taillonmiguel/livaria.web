import api from "@/services/api";
import type { AutorModel } from "../models/AutorModel";

export async function getAutores(): Promise<AutorModel[]> {
  const response = await api.get("/Autor/v1");
  return response.data;
}

export async function getAutorById(id: string): Promise<AutorModel> {
  const response = await api.get(`/Autor/v1/${id}`);
  return response.data;
}

export async function createAutor(nome: string): Promise<AutorModel> {
  const response = await api.post("/Autor/v1", { nome });
  return response.data;
}

export async function updateAutor(
  id: string,
  nome: string
): Promise<AutorModel> {
  const response = await api.put(`/Autor/v1/${id}`, { nome });
  return response.data;
}

export async function deleteAutor(id: string): Promise<void> {
  await api.delete(`/Autor/v1/${id}`);
}
