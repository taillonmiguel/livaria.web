import { LivroFormPage } from "@/features/livros/pages/LivroFormPage";

interface Props {
  params: {
    id: string;
  };
}

export default function EditarLivro({ params }: Props) {
  return <LivroFormPage id={params.id} />;
}
