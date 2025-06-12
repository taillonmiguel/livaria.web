"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useAutorStore } from "../store/autorStore";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/shared/components/ConfirmModal";
import "@/shared/styles/TableStyle.css";

export function AutorList() {
  const { autores, carregarAutores, removerAutor } = useAutorStore();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState<{ id: string; nome: string } | null>(
    null
  );

  useEffect(() => {
    carregarAutores();
  }, [carregarAutores]);

  const askDelete = (id: string, nome: string) => {
    setToDelete({ id, nome });
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await removerAutor(toDelete.id);
      setModalVisible(false);
      setToDelete(null);
    }
  };

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>
                <button onClick={() => router.push(`/autores/${a.id}`)}>
                  <FaEdit />
                </button>
                <button onClick={() => askDelete(a.id, a.nome)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {autores.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Nenhum autor encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmModal
        visible={modalVisible}
        itemName={toDelete?.nome || ""}
        onConfirm={confirmDelete}
        onCancel={() => setModalVisible(false)}
      />
    </>
  );
}
