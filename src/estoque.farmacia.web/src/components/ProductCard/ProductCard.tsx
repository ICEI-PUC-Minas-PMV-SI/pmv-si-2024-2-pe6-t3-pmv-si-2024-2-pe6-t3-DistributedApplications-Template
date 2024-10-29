import React, { useState } from 'react';
import './ProductCard.css';

interface Product {
  id: number;
  name: string;
  price: number | null;
  supplierName: string;
  supplierContact: string;
  image: string | null; // Base64
}

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export default function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  // Convertendo a imagem Base64 para uma URL de dados
  const imageDataUrl = product.image ? `data:image/png;base64,${product.image}` : '/path/to/placeholder.jpg';

  const handleDeleteClick = () => {
    setShowConfirm(true); // Abre o modal de confirmação
  };

  const handleConfirmDelete = () => {
    onDelete(product.id); // Chama a função de exclusão
    setShowConfirm(false); // Fecha o modal
  };

  const handleCancelDelete = () => {
    setShowConfirm(false); // Fecha o modal sem excluir
  };

  return (
    <div className="product-card">
      <img
        src={imageDataUrl} 
        alt={product.name} 
        className="product-image" 
        onError={(e) => (e.currentTarget.src = '/path/to/placeholder.jpg')} // Se a imagem falhar, exibe uma imagem placeholder
      />
      <div className="product-info-actions">
        <div className="product-details">
          <h3 className="product-info">Nome do Produto: {product.name}</h3>
          <p className="product-info">Preço: R$ {product.price !== null ? product.price.toFixed(2) : "Indisponível"}</p>
          <p className="product-info">Fornecedor: {product.supplierName}</p>
          <p className="product-info">Contato: {product.supplierContact}</p>
        </div>
        <div className="product-actions">
          <button onClick={() => onEdit(product.id)} className="edit-button">Editar</button>
          <button onClick={handleDeleteClick} className="delete-button">Excluir</button>
        </div>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Tem certeza de que deseja excluir este produto?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete} className="confirm-button">Sim</button>
              <button onClick={handleCancelDelete} className="cancel-button">Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
