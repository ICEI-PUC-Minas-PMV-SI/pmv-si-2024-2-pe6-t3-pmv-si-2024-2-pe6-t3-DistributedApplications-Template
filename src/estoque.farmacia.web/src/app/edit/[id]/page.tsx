
'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import EditProduct from '../../../components/EditProduct';

const EditPage: React.FC = () => {
  const params = useParams();
  const id = params?.id;

 
  if (!id) {
    return <p>Carregando...</p>;
  }

  return (
    <EditProduct productId={Number(id)} />
  );
};

export default EditPage;
