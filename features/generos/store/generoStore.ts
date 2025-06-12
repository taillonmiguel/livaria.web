import { create } from "zustand"
import type { GeneroModel } from "../models/GeneroModel"
import { getGeneros, getGeneroById, createGenero, updateGenero, deleteGenero } from "../services/generoService"

interface GeneroStore {
  generos: GeneroModel[]
  loading: boolean
  error: string | null
  carregarGeneros: () => Promise<void>
  buscarGeneroPorId: (id: string) => Promise<GeneroModel>
  adicionarGenero: (nome: string) => Promise<void>
  atualizarGenero: (id: string, nome: string) => Promise<void>
  removerGenero: (id: string) => Promise<void>
}

export const useGeneroStore = create<GeneroStore>((set, get) => ({
  generos: [],
  loading: false,
  error: null,

  carregarGeneros: async () => {
    try {
      set({ loading: true, error: null })
      const data = await getGeneros()
      set({ generos: data, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao carregar gêneros",
        loading: false,
      })
    }
  },

  buscarGeneroPorId: async (id) => {
    try {
      set({ loading: true, error: null })
      const genero = await getGeneroById(id)
      set({ loading: false })
      return genero
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao buscar gênero",
        loading: false,
      })
      throw error
    }
  },

  adicionarGenero: async (nome) => {
    try {
      set({ loading: true, error: null })
      await createGenero(nome)
      await get().carregarGeneros()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao adicionar gênero",
        loading: false,
      })
      throw error
    }
  },

  atualizarGenero: async (id, nome) => {
    try {
      set({ loading: true, error: null })
      await updateGenero(id, nome)
      await get().carregarGeneros()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao atualizar gênero",
        loading: false,
      })
      throw error
    }
  },

  removerGenero: async (id) => {
    try {
      set({ loading: true, error: null })
      await deleteGenero(id)
      await get().carregarGeneros()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao remover gênero",
        loading: false,
      })
      throw error
    }
  },
}))
