'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './EditProduct.css';

interface Product {
  id: number;
  name: string;
  lot: string;
  purchase: number;
  selling: number;
  manufacturer: string;
  image: string;
  fornecedorId: number;
}

interface EditProductProps {
  productId: number;
}

const EditProduct: React.FC<EditProductProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product>({
    id: productId,
    name: "",
    lot: "123456",
    purchase: 0,
    selling: 0,
    manufacturer: "",
    image: "",
    fornecedorId: 0,
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7208/api/Medicamentos/${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProduct({
          id: data.medicamento.id,
          name: data.medicamento.nomeComercial,
          lot: "123456",
          purchase: data.medicamento.precoCusto,
          selling: data.medicamento.precoVenda,
          fornecedorId: data.fornecedor.id,
          manufacturer: data.fornecedor.nomeFantasia,
          image: `data:image/png;base64,${data.medicamento.imagem}`,
        });
      } else {
        console.error("Erro ao buscar os dados do medicamento");
      }
    } catch (error) {
      console.error("Erro de rede ou no servidor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "purchase" || name === "selling" ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setProduct({ ...product, image: "" });
  };

  const handleSave = async () => {
    const confirmed = window.confirm("Tem certeza que deseja salvar as alterações?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://localhost:7208/api/Medicamentos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: product.id,
          nomeComercial: product.name,
          precoCusto: product.purchase,
          precoVenda: product.selling,
          fornecedorId: product.fornecedorId,
          imagem: product.image.replace(/^data:image\/[a-z]+;base64,/, ''),
        }),
      });

      if (response.ok) {
        setStatusMessage('Produto atualizado com sucesso!');
        router.push('/products');
      } else {
        setStatusMessage('Erro ao atualizar o produto.');
        console.error('Erro na atualização:', response.statusText);
      }
    } catch (error) {
      setStatusMessage('Erro de rede ou no servidor.');
      console.error("Erro de rede ou no servidor:", error);
    }
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="edit-product-container">
      <button onClick={() => router.push('/products')} className="back-button">Voltar</button>
      <h1 className="edit-product-title">Editar Produto</h1>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
      <div className="content-wrapper">
        <div className="image-section">
          {product.image ? (
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="image-buttons">
                <label className="image-edit-button">
                  Trocar Imagem
                  <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                <button onClick={handleImageRemove} className="image-remove-button">Excluir</button>
              </div>
            </div>
          ) : (
            <label className="image-upload-placeholder">
              <span>Upload de Imagem</span>
              <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
          )}
        </div>
        <div className="product-info">
          <div className="product-info-display">
            <p><strong>Nome do Produto:</strong> {product.name}</p>
            <p><strong>Lote:</strong> {product.lot}</p>
            <p><strong>Preço Custo:</strong> {formatCurrency(product.purchase)}</p>
            <p><strong>Preço Venda:</strong> {formatCurrency(product.selling)}</p>
            <p><strong>Fabricante:</strong> {product.manufacturer}</p>
          </div>
        </div>
      </div>
      <div className="form-section">
        <div className="form-group">
          <label className="label">Nome do Produto</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Lote</label>
          <input
            type="text"
            name="lot"
            value={product.lot}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Fabricante</label>
          <input
            type="text"
            name="manufacturer"
            value={product.manufacturer}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Preço de Custo</label>
          <input
            type="number"
            name="purchase"
            value={product.purchase}
            onChange={handleInputChange}
            className="input"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label className="label">Preço de Venda</label>
          <input
            type="number"
            name="selling"
            value={product.selling}
            onChange={handleInputChange}
            className="input"
            step="0.01"
          />
        </div>
        <button onClick={handleSave} className="save-button">Salvar</button>
      </div>
    </div>
  );
};

export default EditProduct;
