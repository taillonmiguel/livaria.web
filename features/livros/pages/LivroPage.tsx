"use client";

import { FaBook, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { LivroList } from "../components/LivroList";
import { Layout } from "@/shared/components/Layout";

export function LivroPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-md shadow-sm p-6">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaBook className="text-2xl text-cyan-500" />
              <h1 className="text-2xl font-bold text-gray-800">Livros</h1>
            </div>
            <Link
              href="/livros/novo"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <FaPlus size={14} />
              <span>Adicionar</span>
            </Link>
          </header>
          <LivroList />
        </div>
      </div>
    </Layout>
  );
}
