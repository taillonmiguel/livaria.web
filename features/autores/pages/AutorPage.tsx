"use client";

import { FaUser, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { AutorList } from "../components/AutorList";
import { Layout } from "@/shared/components/Layout";

export function AutorPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-md shadow-sm p-6">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaUser className="text-2xl text-cyan-500" />
              <h1 className="text-2xl font-bold text-gray-800">Autores</h1>
            </div>
            <Link
              href="/autores/novo"
              className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md font-medium transition-colors shadow-sm hover:shadow-md"
            >
              <FaPlus size={14} />
              <span>Adicionar</span>
            </Link>
          </header>
          <AutorList />
        </div>
      </div>
    </Layout>
  );
}
