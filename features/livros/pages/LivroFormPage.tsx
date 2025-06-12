"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LivroForm } from "../components/LivroForm";
import { useLivroStore } from "../store/livroStore";
import { Layout } from "@/shared/components/Layout";
import type { LivroModel } from "../models/LivroModel";

interface LivroFormPageProps {
  id?: string;
}

export function LivroFormPage({ id }: LivroFormPageProps) {
  const router = useRouter();
  const { buscarLivroPorId, adicionarLivro, atualizarLivro } = useLivroStore();
  const [initialData, setInitialData] = useState<LivroModel | null>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      buscarLivroPorId(id)
        .then(setInitialData)
        .catch((error) => {
          console.error("Erro ao buscar livro:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id, buscarLivroPorId]);

  const handleSave = async (data: Omit<LivroModel, "id">) => {
    try {
      if (id) {
        await atualizarLivro(id, data);
      } else {
        await adicionarLivro(data);
      }
      router.push("/livros");
    } catch (error) {
      console.error("Erro ao salvar livro:", error);
      alert("Erro ao salvar livro. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-md shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => router.push("/livros")}
                className="text-cyan-500 hover:text-cyan-700 mb-2 flex items-center gap-2"
              >
                ← Voltar para Livros
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {id ? "Editar Livro" : "Novo Livro"}
              </h1>
            </div>
          </div>
          <LivroForm onSubmit={handleSave} initialData={initialData} />
        </div>
      </div>
    </Layout>
  );
}
