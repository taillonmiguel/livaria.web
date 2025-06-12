"use client";

import { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useGeneroStore } from "../store/generoStore";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/shared/components/ConfirmModal";
import "@/shared/styles/TableStyle.css";

export function GeneroList() {
  const { generos, carregarGeneros, removerGenero } = useGeneroStore();
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [toDelete, setToDelete] = useState<{ id: string; nome: string } | null>(
    null
  );

  useEffect(() => {
    carregarGeneros();
  }, [carregarGeneros]);

  const askDelete = (id: string, nome: string) => {
    setToDelete({ id, nome });
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (toDelete) {
      await removerGenero(toDelete.id);
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
          {generos.map((g) => (
            <tr key={g.id}>
              <td>{g.nome}</td>
              <td>
                <button onClick={() => router.push(`/generos/${g.id}`)}>
                  <FaEdit />
                </button>
                <button onClick={() => askDelete(g.id, g.nome)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
          {generos.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Nenhum gênero encontrado.
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
