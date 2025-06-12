"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GeneroForm } from "../components/GeneroForm";
import { useGeneroStore } from "../store/generoStore";
import { Layout } from "@/shared/components/Layout";
import type { GeneroModel } from "../models/GeneroModel";

interface GeneroFormPageProps {
  id?: string;
}

export function GeneroFormPage({ id }: GeneroFormPageProps) {
  const router = useRouter();
  const { buscarGeneroPorId, adicionarGenero, atualizarGenero } =
    useGeneroStore();
  const [initialData, setInitialData] = useState<GeneroModel | null>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      buscarGeneroPorId(id)
        .then(setInitialData)
        .catch((error) => {
          console.error("Erro ao buscar gênero:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [id, buscarGeneroPorId]);

  const handleSave = async (data: { nome: string }) => {
    try {
      if (id) {
        await atualizarGenero(id, data.nome);
      } else {
        await adicionarGenero(data.nome);
      }
      router.push("/generos");
    } catch (error) {
      console.error("Erro ao salvar gênero:", error);
      alert("Erro ao salvar gênero. Tente novamente.");
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
                onClick={() => router.push("/generos")}
                className="text-cyan-500 hover:text-cyan-700 mb-2 flex items-center gap-2"
              >
                ← Voltar para Gêneros
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {id ? "Editar Gênero" : "Novo Gênero"}
              </h1>
            </div>
          </div>
          <GeneroForm onSubmit={handleSave} initialData={initialData} />
        </div>
      </div>
    </Layout>
  );
}
