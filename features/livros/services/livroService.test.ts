import { describe, it, expect, vi, beforeEach } from "vitest";
import * as service from "./livroService";
import api from "@/services/api";

// Mock the API
vi.mock("@/services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("livroService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get all livros", async () => {
    // Mock data
    const mockLivros = [
      {
        id: "1",
        titulo: "Livro 1",
        descricao: "Desc 1",
        autorId: "a1",
        generoId: "g1",
      },
      {
        id: "2",
        titulo: "Livro 2",
        descricao: "Desc 2",
        autorId: "a2",
        generoId: "g2",
      },
    ];

    // Setup mock implementation
    vi.mocked(api.get).mockResolvedValue({ data: mockLivros });

    // Call the service
    const result = await service.getLivros();

    // Assertions
    expect(api.get).toHaveBeenCalledWith("/Livro/v1");
    expect(result).toEqual(mockLivros);
  });

  it("should get a livro by id", async () => {
    // Mock data
    const livroId = "1";
    const mockLivro = {
      id: livroId,
      titulo: "Livro 1",
      descricao: "Desc 1",
      autorId: "a1",
      generoId: "g1",
    };

    // Setup mock implementation
    vi.mocked(api.get).mockResolvedValue({ data: mockLivro });

    // Call the service
    const result = await service.getLivroById(livroId);

    // Assertions
    expect(api.get).toHaveBeenCalledWith(`/Livro/v1/${livroId}`);
    expect(result).toEqual(mockLivro);
  });

  it("should create a new livro", async () => {
    // Mock data
    const newLivro = {
      titulo: "Novo Livro",
      descricao: "Nova Desc",
      autorId: "a3",
      generoId: "g3",
    };
    const createdLivro = { id: "3", ...newLivro };

    // Setup mock implementation
    vi.mocked(api.post).mockResolvedValue({ data: createdLivro });

    // Call the service
    const result = await service.createLivro(newLivro);

    // Assertions
    expect(api.post).toHaveBeenCalledWith("/Livro/v1", newLivro);
    expect(result).toEqual(createdLivro);
  });

  it("should update a livro", async () => {
    // Mock data
    const livroId = "1";
    const updatedLivro = {
      titulo: "Livro Atualizado",
      descricao: "Desc Atualizada",
      autorId: "a1",
      generoId: "g1",
    };
    const resultLivro = { id: livroId, ...updatedLivro };

    // Setup mock implementation
    vi.mocked(api.put).mockResolvedValue({ data: resultLivro });

    // Call the service
    const result = await service.updateLivro(livroId, updatedLivro);

    // Assertions
    expect(api.put).toHaveBeenCalledWith(`/Livro/v1/${livroId}`, updatedLivro);
    expect(result).toEqual(resultLivro);
  });

  it("should delete a livro", async () => {
    // Mock data
    const livroId = "1";

    // Setup mock implementation
    vi.mocked(api.delete).mockResolvedValue({});

    // Call the service
    await service.deleteLivro(livroId);

    // Assertions
    expect(api.delete).toHaveBeenCalledWith(`/Livro/v1/${livroId}`);
  });

  it("should handle errors when getting livros", async () => {
    // Setup mock implementation to throw error
    vi.mocked(api.get).mockRejectedValue(new Error("API Error"));

    // Call the service and expect it to throw
    await expect(service.getLivros()).rejects.toThrow("API Error");
  });
});
