"use client";

import type React from "react";

import { useEffect, useState } from "react";
import type { AutorModel } from "../models/AutorModel";

type Props = {
  onSubmit: (data: { nome: string }) => Promise<void>;
  initialData?: AutorModel | null;
};

export function AutorForm({ onSubmit, initialData }: Props) {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setNome(initialData.nome);
    }
  }, [initialData]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ nome });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handle} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome do Autor *
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome do autor"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
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
            <>{initialData ? "Salvar Alterações" : "Cadastrar Autor"}</>
          )}
        </button>
      </div>
    </form>
  );
}
