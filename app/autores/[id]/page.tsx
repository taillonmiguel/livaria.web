import { AutorFormPage } from "@/features/autores/pages/AutorFormPage";

interface Props {
  params: {
    id: string;
  };
}

export default function EditarAutor({ params }: Props) {
  return <AutorFormPage id={params.id} />;
}
