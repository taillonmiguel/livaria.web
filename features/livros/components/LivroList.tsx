"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useLivroStore } from "../store/livroStore";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/shared/components/ConfirmModal";
import "@/shared/styles/TableStyle.css";

export function LivroList() {
  const { livros, carregarLivros, removerLivro } = useLivroStore();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const router = useRouter();

  // estado para controlar modal
  const [modalVisible, setModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState<{
    id: string;
    titulo: string;
  } | null>(null);

  useEffect(() => {
    carregarLivros();
  }, [carregarLivros]);

  // paginação
  const totalPages = Math.ceil(livros.length / pageSize);
  const start = (page - 1) * pageSize;
  const paged = livros.slice(start, start + pageSize);

  // abre modal
  const askDelete = (id: string, titulo: string) => {
    setToDelete({ id, titulo });
    setModalVisible(true);
  };

  // confirma exclusão
  const confirmDelete = async () => {
    if (toDelete) {
      await removerLivro(toDelete.id);
      setModalVisible(false);
      setToDelete(null);
    }
  };

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paged.map((l) => (
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.descricao}</td>
              <td>
                <button onClick={() => router.push(`/livros/${l.id}`)}>
                  <FaEdit />
                </button>
                <button onClick={() => askDelete(l.id, l.titulo)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {paged.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                Nenhum livro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={i + 1 === page ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        {totalPages > 7 && <span>... {totalPages}</span>}
      </div>

      <ConfirmModal
        visible={modalVisible}
        itemName={toDelete?.titulo || ""}
        onConfirm={confirmDelete}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
}
