import { describe, it, expect, vi } from "vitest";
import * as service from "../services/livroService";
import api from "@services/api";

vi.mock("@services/api");

describe("livroService", () => {
  it("deve retornar lista de livros", async () => {
    const livros = [
      {
        id: "1",
        titulo: "Dom Casmurro",
        descricao: "Obra clássica",
        autorId: "a1",
        generoId: "g1",
      },
    ];
    (api.get as any).mockResolvedValue({ data: livros });

    const result = await service.getLivros();
    expect(result).toEqual(livros);
  });
});
