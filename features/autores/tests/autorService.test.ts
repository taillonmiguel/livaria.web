import { describe, it, expect, vi } from "vitest";
import * as service from "../services/autorService";
import api from "@/services/api";

vi.mock("@/services/api");

describe("autorService", () => {
  it("deve retornar lista de autores", async () => {
    const autores = [{ id: "1", nome: "Teste" }];
    (api.get as any).mockResolvedValue({ data: autores });

    const result = await service.getAutores();
    expect(result).toEqual(autores);
  });
});
