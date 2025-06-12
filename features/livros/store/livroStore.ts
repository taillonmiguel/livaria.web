import { create } from "zustand";
import type { LivroModel } from "../models/LivroModel";
import {
  getLivros,
  getLivroById,
  createLivro,
  updateLivro,
  deleteLivro,
} from "../services/livroService";

interface LivroStore {
  livros: LivroModel[];
  loading: boolean;
  error: string | null;
  carregarLivros: () => Promise<void>;
  buscarLivroPorId: (id: string) => Promise<LivroModel>;
  adicionarLivro: (livro: Omit<LivroModel, "id">) => Promise<void>;
  atualizarLivro: (id: string, livro: Omit<LivroModel, "id">) => Promise<void>;
  removerLivro: (id: string) => Promise<void>;
}

export const useLivroStore = create<LivroStore>((set, get) => ({
  livros: [],
  loading: false,
  error: null,

  carregarLivros: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getLivros();
      set({ livros: data, loading: false });
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
      set({
        error:
          error instanceof Error ? error.message : "Erro ao carregar livros",
        loading: false,
      });
    }
  },

  buscarLivroPorId: async (id) => {
    try {
      set({ loading: true, error: null });
      const livro = await getLivroById(id);
      set({ loading: false });
      return livro;
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
      set({
        error: error instanceof Error ? error.message : "Erro ao buscar livro",
        loading: false,
      });
      throw error;
    }
  },

  adicionarLivro: async (livro) => {
    try {
      set({ loading: true, error: null });
      console.log("Adicionando livro:", livro);
      await createLivro(livro);
      await get().carregarLivros();
      console.log("Livro adicionado com sucesso");
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      set({
        error:
          error instanceof Error ? error.message : "Erro ao adicionar livro",
        loading: false,
      });
      throw error;
    }
  },

  atualizarLivro: async (id, livro) => {
    try {
      set({ loading: true, error: null });
      console.log("Atualizando livro:", id, livro);
      await updateLivro(id, livro);
      await get().carregarLivros();
      console.log("Livro atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      set({
        error:
          error instanceof Error ? error.message : "Erro ao atualizar livro",
        loading: false,
      });
      throw error;
    }
  },

  removerLivro: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteLivro(id);
      await get().carregarLivros();
    } catch (error) {
      console.error("Erro ao remover livro:", error);
      set({
        error: error instanceof Error ? error.message : "Erro ao remover livro",
        loading: false,
      });
      throw error;
    }
  },
}));
