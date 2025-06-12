import { GeneroFormPage } from "@/features/generos/pages/GeneroFormPage";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarGenero({ params }: Props) {
  const { id } = await params;
  return <GeneroFormPage id={id} />;
}
