import { create } from "zustand"
import type { AutorModel } from "../models/AutorModel"
import { getAutores, getAutorById, createAutor, updateAutor, deleteAutor } from "../services/autorService"

interface AutorStore {
  autores: AutorModel[]
  loading: boolean
  error: string | null
  carregarAutores: () => Promise<void>
  buscarAutorPorId: (id: string) => Promise<AutorModel>
  adicionarAutor: (nome: string) => Promise<void>
  atualizarAutor: (id: string, nome: string) => Promise<void>
  removerAutor: (id: string) => Promise<void>
}

export const useAutorStore = create<AutorStore>((set, get) => ({
  autores: [],
  loading: false,
  error: null,

  carregarAutores: async () => {
    try {
      set({ loading: true, error: null })
      const data = await getAutores()
      set({ autores: data, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao carregar autores",
        loading: false,
      })
    }
  },

  buscarAutorPorId: async (id) => {
    try {
      set({ loading: true, error: null })
      const autor = await getAutorById(id)
      set({ loading: false })
      return autor
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao buscar autor",
        loading: false,
      })
      throw error
    }
  },

  adicionarAutor: async (nome) => {
    try {
      set({ loading: true, error: null })
      await createAutor(nome)
      await get().carregarAutores()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao adicionar autor",
        loading: false,
      })
      throw error
    }
  },

  atualizarAutor: async (id, nome) => {
    try {
      set({ loading: true, error: null })
      await updateAutor(id, nome)
      await get().carregarAutores()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao atualizar autor",
        loading: false,
      })
      throw error
    }
  },

  removerAutor: async (id) => {
    try {
      set({ loading: true, error: null })
      await deleteAutor(id)
      await get().carregarAutores()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Erro ao remover autor",
        loading: false,
      })
      throw error
    }
  },
}))
