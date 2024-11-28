'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '../../components/ProductCard/ProductCard';
import SearchAndFilterBar from '../../components/SearchAndFilter/SearchAndFilter';
import Pagination from '../../components/Pagination/Pagination';
import './page.css';

interface Product {
  id: number;
  name: string;
  lote: string | null;
  loteId: number | null;
  validade: string | null;
  supplierName: string;
  image: string | null;
}

export default function Medicines() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus) {
      setIsAuthenticated(true);
      fetchProducts();
    } else {
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (isEdited) {
      fetchProducts();
      setIsEdited(false);
    }
  }, [isEdited]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Medicamentos`
      );
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }
      const data = await response.json();

      const formattedProducts = await Promise.all(
        data.map(async (item: any) => {
          const loteResponse = await fetch(
            `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes?medicamentoId=${item.medicamento.id}`
          );
          const loteData = await loteResponse.json();
          const lote = loteData.find((l: any) => l.medicamentoId === item.medicamento.id);

          return {
            id: item.medicamento.id,
            name: item.medicamento.nomeComercial,
            lote: lote ? `Lote ${lote.id}` : 'Não disponível',
            loteId: lote ? lote.id : null,
            validade: lote ? new Date(lote.dataValidade).toLocaleDateString() : 'Não disponível',
            supplierName: item.fornecedor.nomeFantasia,
            image: item.medicamento.imagem ?? '',
          };
        })
      );

      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, loteId: number | null) => {
    setLoading(true);
    try {
      if (loteId !== null) {
        const updateLoteResponse = await fetch(
          `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes/${loteId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ medicamentoId: null }),
          }
        );
        if (!updateLoteResponse.ok) {
          throw new Error(`Erro ao atualizar o lote! Status: ${updateLoteResponse.status}`);
        }
      }

      const deleteResponse = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Medicamentos/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!deleteResponse.ok) {
        throw new Error(`Erro ao deletar produto! Status: ${deleteResponse.status}`);
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido ao deletar produto.';
      console.error('Erro ao deletar produto:', errorMessage);
      alert(`Erro ao deletar produto: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/edit/${id}`);
    setIsEdited(true);
  };

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      if (filter === 'asc') return a.name.localeCompare(b.name);
      if (filter === 'desc') return b.name.localeCompare(a.name);
      return 0;
    });

    const searchedProducts = sortedProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(searchedProducts);
  }, [search, filter, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isAuthenticated === false) {
    return null;
  }

  return (
    <div className='page-container'>
      <h1 className='product-title'>Medicamentos</h1>
      <SearchAndFilterBar onSearch={setSearch} onFilter={setFilter} />

      {loading ? (
        <div className='loading'>Carregando...</div>
      ) : filteredProducts.length > 0 ? (
        <div>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={() => handleDelete(product.id, product.loteId)}
              onEdit={handleEdit}
            />
          ))}
          {filteredProducts.length > productsPerPage && (
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filteredProducts.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          )}
        </div>
      ) : (
        <div className='no-products'>
          <p>Produto não encontrado.</p>
        </div>
      )}
    </div>
  );
}
