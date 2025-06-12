"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LivroForm } from "./LivroForm"
import { useLivroStore } from "../store/livroStore"
import { Layout } from "@/shared/components/Layout"

interface LivroFormPageProps {
  id?: string
}

export function LivroFormPage({ id }: LivroFormPageProps) {
  const router = useRouter()
  const { buscarLivroPorId, adicionarLivro, atualizarLivro } = useLivroStore()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(!!id)

  useEffect(() => {
    if (id) {
      setLoading(true)
      buscarLivroPorId(id)
        .then(setInitialData)
        .finally(() => setLoading(false))
    }
  }, [id, buscarLivroPorId])

  const handleSave = async (data: Omit<any, "id">) => {
    try {
      if (id) {
        await atualizarLivro(id, data)
      } else {
        await adicionarLivro(data)
      }
      router.push("/livros")
    } catch (error) {
      console.error("Erro ao salvar livro:", error)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <button onClick={() => router.back()} className="mb-4 text-gray-600 hover:text-gray-800 transition-colors">
            ← Voltar
          </button>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">{id ? "Editar Livro" : "Novo Livro"}</h1>
          <LivroForm onSubmit={handleSave} initialData={initialData} />
        </div>
      </div>
    </Layout>
  )
}
