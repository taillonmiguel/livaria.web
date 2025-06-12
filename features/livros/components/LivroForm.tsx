"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { LivroModel } from "../models/LivroModel";
import { useAutorStore } from "@/features/autores/store/autorStore";
import { useGeneroStore } from "@/features/generos/store/generoStore";

type Props = {
  onSubmit: (data: Omit<LivroModel, "id">) => Promise<void>;
  initialData?: LivroModel | null;
};

export function LivroForm({ onSubmit, initialData }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [autorId, setAutorId] = useState("");
  const [generoId, setGeneroId] = useState("");
  const [loading, setLoading] = useState(false);

  const { autores, carregarAutores } = useAutorStore();
  const { generos, carregarGeneros } = useGeneroStore();

  useEffect(() => {
    carregarAutores();
    carregarGeneros();
  }, [carregarAutores, carregarGeneros]);

  useEffect(() => {
    if (initialData) {
      setTitulo(initialData.titulo);
      setDescricao(initialData.descricao);
      setAutorId(initialData.autorId);
      setGeneroId(initialData.generoId);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !descricao.trim() || !autorId || !generoId) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
        autorId,
        generoId,
      });
    } catch (error) {
      console.error("Erro no formulário:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Título *
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Digite o título do livro"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição *
        </label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Digite a descrição do livro"
          required
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Autor *
          </label>
          <select
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">Selecione um autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gênero *
          </label>
          <select
            value={generoId}
            onChange={(e) => setGeneroId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          >
            <option value="">Selecione um gênero</option>
            {generos.map((genero) => (
              <option key={genero.id} value={genero.id}>
                {genero.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Salvando...
            </>
          ) : (
            <>{initialData ? "Salvar Alterações" : "Cadastrar Livro"}</>
          )}
        </button>
      </div>
    </form>
  );
}
