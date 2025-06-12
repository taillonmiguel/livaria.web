"use client";

import { useEffect, useState } from "react";
import { useLivroStore } from "@/features/livros/store/livroStore";
import { useAutorStore } from "@/features/autores/store/autorStore";
import { useGeneroStore } from "@/features/generos/store/generoStore";
import { FaSearch } from "react-icons/fa";
import { Layout } from "@/shared/components/Layout";
import { LivroCard } from "@/features/livros/components/LivroCard";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";

export function HomePage() {
  const { livros, carregarLivros, loading } = useLivroStore();
  const { autores, carregarAutores } = useAutorStore();
  const { generos, carregarGeneros } = useGeneroStore();

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroAutorId, setFiltroAutorId] = useState("");
  const [filtroGeneroId, setFiltroGeneroId] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 6;

  // Load data on component mount
  useEffect(() => {
    carregarLivros();
    carregarAutores();
    carregarGeneros();
  }, [carregarLivros, carregarAutores, carregarGeneros]);

  // Filter and search logic
  const livrosFiltrados = livros.filter((livro) => {
    // Filter by title
    if (
      searchTerm &&
      !livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Filter by author
    if (filtroAutorId && livro.autorId !== filtroAutorId) {
      return false;
    }

    // Filter by genre
    if (filtroGeneroId && livro.generoId !== filtroGeneroId) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalPaginas = Math.ceil(livrosFiltrados.length / itensPorPagina);
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const livrosPaginados = livrosFiltrados.slice(
    inicio,
    inicio + itensPorPagina
  );

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFiltroAutorId("");
    setFiltroGeneroId("");
  };

  // Get author and genre names for display
  const getAutorNome = (id: string) => {
    return autores.find((a) => a.id === id)?.nome || "Desconhecido";
  };

  const getGeneroNome = (id: string) => {
    return generos.find((g) => g.id === id)?.nome || "Desconhecido";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center mb-8 bg-white p-4 rounded-md shadow-sm">
          <div className="text-cyan-500 text-2xl mr-3">📚</div>
          <h1 className="text-2xl font-bold text-gray-800">Livraria Digital</h1>
        </header>

        <div className="bg-white p-6 rounded-md shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Filtros</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por título"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Autor
              </label>
              <select
                value={filtroAutorId}
                onChange={(e) => setFiltroAutorId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Todos os Autores</option>
                {autores.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gênero
              </label>
              <select
                value={filtroGeneroId}
                onChange={(e) => setFiltroGeneroId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Todos os Gêneros</option>
                {generos.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={resetFilters}
              className="text-cyan-500 hover:text-cyan-700 text-sm"
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="bg-white p-6 rounded-md shadow-sm">
              <h2 className="text-xl font-bold mb-6">Catálogo de Livros</h2>

              {livrosFiltrados.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
                    {livrosPaginados.map((livro) => (
                      <LivroCard
                        key={livro.id}
                        livro={livro}
                        autorNome={getAutorNome(livro.autorId)}
                        generoNome={getGeneroNome(livro.generoId)}
                      />
                    ))}
                  </div>

                  <div className="flex justify-center mt-6">
                    <button
                      onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
                      disabled={paginaAtual === 1}
                      className="px-3 py-1 border border-gray-300 rounded-md mr-2 disabled:opacity-50"
                    >
                      «
                    </button>

                    <button className="px-3 py-1 bg-cyan-500 text-white rounded-md">
                      {paginaAtual}
                    </button>

                    <button
                      onClick={() =>
                        setPaginaAtual((p) => Math.min(p + 1, totalPaginas))
                      }
                      disabled={paginaAtual === totalPaginas}
                      className="px-3 py-1 border border-gray-300 rounded-md ml-2 disabled:opacity-50"
                    >
                      »
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">
                    Nenhum livro encontrado com os filtros selecionados.
                  </p>
                  <button
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-md transition-colors"
                    onClick={resetFilters}
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
