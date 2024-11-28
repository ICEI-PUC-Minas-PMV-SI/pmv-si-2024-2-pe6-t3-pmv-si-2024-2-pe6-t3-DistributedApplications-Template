// /app/edit/[id]/page.tsx
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import EditProduct from '../../components/EditProduct';

const EditPage: React.FC = () => {
  const params = useParams();
  const { id } = params; // Captura o ID da URL

  // Verifica se o ID é válido antes de renderizar o componente
  if (!id) {
    return <p>Carregando...</p>;
  }

  return (
    <EditProduct productId={Number(id)} />
  );
};

export default EditPage;
