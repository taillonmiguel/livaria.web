import { describe, it, expect, vi } from "vitest";
import * as service from "../services/generoService";
import api from "@/services/api";

vi.mock("@services/api");

describe("generoService", () => {
  it("deve retornar lista de gêneros", async () => {
    const generos = [{ id: "1", nome: "Romance" }];
    (api.get as any).mockResolvedValue({ data: generos });

    const result = await service.getGeneros();
    expect(result).toEqual(generos);
  });
});
