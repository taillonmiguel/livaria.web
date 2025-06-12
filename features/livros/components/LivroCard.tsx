"use client";

import Link from "next/link";
import { FaEdit, FaBook } from "react-icons/fa";
import type { LivroModel } from "../models/LivroModel";

interface LivroCardProps {
  livro: LivroModel;
  autorNome: string;
  generoNome: string;
}

export function LivroCard({ livro, autorNome, generoNome }: LivroCardProps) {
  return (
    <div className="flex">
      <div className="w-[120px] h-[150px] bg-cyan-100 flex items-center justify-center">
        <FaBook className="text-cyan-500 text-3xl" />
      </div>

      <div className="flex-1 pl-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {livro.titulo}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {livro.descricao}
        </p>

        <div className="text-sm text-gray-500 mb-1">
          <span className="font-medium">Autor:</span> {autorNome}
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">Gênero:</span> {generoNome}
        </div>

        <div className="mt-2">
          <Link
            href={`/livros/${livro.id}`}
            className="text-cyan-500 hover:text-cyan-700"
          >
            <FaEdit className="inline mr-1" />
            <span>Editar</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
