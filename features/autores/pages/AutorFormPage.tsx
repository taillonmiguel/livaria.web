"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AutorForm } from "../components/AutorForm";
import { useAutorStore } from "../store/autorStore";
import { Layout } from "@/shared/components/Layout";

interface AutorFormPageProps {
  id?: string;
}

export function AutorFormPage({ id }: AutorFormPageProps) {
  const router = useRouter();
  const { buscarAutorPorId, adicionarAutor, atualizarAutor } = useAutorStore();
  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      buscarAutorPorId(id)
        .then(setInitialData)
        .finally(() => setLoading(false));
    }
  }, [id, buscarAutorPorId]);

  const handleSave = async (data: { nome: string }) => {
    try {
      if (id) {
        await atualizarAutor(id, data.nome);
      } else {
        await adicionarAutor(data.nome);
      }
      router.push("/autores");
    } catch (error) {
      console.error("Erro ao salvar autor:", error);
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
                onClick={() => router.push("/autores")}
                className="text-cyan-500 hover:text-cyan-700 mb-2 flex items-center gap-2"
              >
                ← Voltar para Autores
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {id ? "Editar Autor" : "Novo Autor"}
              </h1>
            </div>
          </div>
          <AutorForm onSubmit={handleSave} initialData={initialData} />
        </div>
      </div>
    </Layout>
  );
}
