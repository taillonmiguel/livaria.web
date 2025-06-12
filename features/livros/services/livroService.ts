import api from "@/services/api";
import type { LivroModel } from "../models/LivroModel";

export async function getLivros(): Promise<LivroModel[]> {
  const response = await api.get("/Livro/v1");
  console.log("Livros recebidos:", response.data);
  return response.data;
}

export async function getLivroById(id: string): Promise<LivroModel> {
  const response = await api.get(`/Livro/v1/${id}`);
  return response.data;
}

export async function createLivro(
  livro: Omit<LivroModel, "id">
): Promise<LivroModel> {
  const response = await api.post("/Livro/v1", livro);
  return response.data;
}

export async function updateLivro(
  id: string,
  livro: Omit<LivroModel, "id">
): Promise<LivroModel> {
  const response = await api.put(`/Livro/v1/${id}`, livro);
  return response.data;
}

export async function deleteLivro(id: string): Promise<void> {
  await api.delete(`/Livro/v1/${id}`);
}
