import { describe, it, expect, vi, beforeEach } from "vitest"
import { useLivroStore } from "../store/livroStore"
import * as livroService from "../services/livroService"

// Mock the livro service
vi.mock("../services/livroService", () => ({
  getLivros: vi.fn(),
  getLivroById: vi.fn(),
  createLivro: vi.fn(),
  updateLivro: vi.fn(),
  deleteLivro: vi.fn(),
}))

describe("livroStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    const store = useLivroStore.getState()
    store.livros = []
    store.loading = false
    store.error = null

    // Clear all mocks
    vi.clearAllMocks()
  })

  it("should load livros successfully", async () => {
    // Mock data
    const mockLivros = [
      { id: "1", titulo: "Livro 1", descricao: "Desc 1", autorId: "a1", generoId: "g1" },
      { id: "2", titulo: "Livro 2", descricao: "Desc 2", autorId: "a2", generoId: "g2" },
    ]

    // Setup mock implementation
    vi.mocked(livroService.getLivros).mockResolvedValue(mockLivros)

    // Get store and call the method
    const store = useLivroStore.getState()
    await store.carregarLivros()

    // Assertions
    expect(livroService.getLivros).toHaveBeenCalledTimes(1)
    expect(store.livros).toEqual(mockLivros)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it("should handle error when loading livros", async () => {
    // Setup mock implementation to throw error
    const errorMessage = "Failed to load livros"
    vi.mocked(livroService.getLivros).mockRejectedValue(new Error(errorMessage))

    // Get store and call the method
    const store = useLivroStore.getState()
    await store.carregarLivros()

    // Assertions
    expect(livroService.getLivros).toHaveBeenCalledTimes(1)
    expect(store.livros).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe(errorMessage)
  })

  it("should add a livro successfully", async () => {
    // Mock data
    const newLivro = { titulo: "Novo Livro", descricao: "Nova Desc", autorId: "a3", generoId: "g3" }
    const mockLivros = [{ id: "1", ...newLivro }]

    // Setup mock implementations
    vi.mocked(livroService.createLivro).mockResolvedValue({ id: "1", ...newLivro })
    vi.mocked(livroService.getLivros).mockResolvedValue(mockLivros)

    // Get store and call the method
    const store = useLivroStore.getState()
    await store.adicionarLivro(newLivro)

    // Assertions
    expect(livroService.createLivro).toHaveBeenCalledWith(newLivro)
    expect(livroService.getLivros).toHaveBeenCalledTimes(1)
    expect(store.livros).toEqual(mockLivros)
  })

  it("should update a livro successfully", async () => {
    // Mock data
    const livroId = "1"
    const updatedLivro = { titulo: "Livro Atualizado", descricao: "Desc Atualizada", autorId: "a1", generoId: "g1" }
    const mockLivros = [{ id: livroId, ...updatedLivro }]

    // Setup mock implementations
    vi.mocked(livroService.updateLivro).mockResolvedValue({ id: livroId, ...updatedLivro })
    vi.mocked(livroService.getLivros).mockResolvedValue(mockLivros)

    // Get store and call the method
    const store = useLivroStore.getState()
    await store.atualizarLivro(livroId, updatedLivro)

    // Assertions
    expect(livroService.updateLivro).toHaveBeenCalledWith(livroId, updatedLivro)
    expect(livroService.getLivros).toHaveBeenCalledTimes(1)
    expect(store.livros).toEqual(mockLivros)
  })

  it("should delete a livro successfully", async () => {
    // Mock data
    const livroId = "1"
    const mockLivros = [] // Empty after deletion

    // Setup mock implementations
    vi.mocked(livroService.deleteLivro).mockResolvedValue(undefined)
    vi.mocked(livroService.getLivros).mockResolvedValue(mockLivros)

    // Get store and call the method
    const store = useLivroStore.getState()
    await store.removerLivro(livroId)

    // Assertions
    expect(livroService.deleteLivro).toHaveBeenCalledWith(livroId)
    expect(livroService.getLivros).toHaveBeenCalledTimes(1)
    expect(store.livros).toEqual(mockLivros)
  })
})
