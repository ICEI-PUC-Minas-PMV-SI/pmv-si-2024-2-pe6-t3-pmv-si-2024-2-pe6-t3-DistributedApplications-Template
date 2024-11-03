'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EditProduct.module.scss';
import { faFileArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Alert, Snackbar } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  manufactureDate: Dayjs | null;
  expirationDate: Dayjs | null;
  purchase: number;
  selling: number;
  manufacturer: string;
  image: string;
  fornecedorId: number;
  loteId?: number;
}

interface Lote {
  id: number;
  quantidade: number;
  dataFabricacao: string;
  dataValidade: string;
  medicamentoId: number | null;
}

interface Fornecedor {
  id: number;
  nomeFantasia: string;
}

interface EditProductProps {
  productId: number;
}

const EditProduct: React.FC<EditProductProps> = ({ productId }) => {
  const [product, setProduct] = useState<Product>({
    id: productId,
    name: '',
    manufactureDate: null,
    expirationDate: null,
    purchase: 0,
    selling: 0,
    manufacturer: '',
    image: '',
    fornecedorId: 0,
    loteId: undefined,
  });
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [manufactures, setManufactures] = useState<Fornecedor[]>([]);
  const [originalLoteId, setOriginalLoteId] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchProductData();
    loadAvailableLotes();
    loadManufactures();
  }, []);

  const fetchProductData = async () => {
    try {
      const productResponse = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Medicamentos/${productId}`
      );
      if (!productResponse.ok) throw new Error('Erro ao buscar dados do medicamento');
      const productData = await productResponse.json();

      const { id, nomeComercial, precoCusto, precoVenda, fornecedorId, imagem } = productData.medicamento;
      setProduct((prevProduct) => ({
        ...prevProduct,
        id,
        name: nomeComercial,
        purchase: precoCusto,
        selling: precoVenda,
        fornecedorId,
        image: `data:image/png;base64,${imagem}`,
      }));

      const loteResponse = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes?medicamentoId=${id}`
      );
      if (!loteResponse.ok) throw new Error('Erro ao buscar dados do lote');
      const loteData: Lote[] = await loteResponse.json();
      const lote = loteData.find((l) => l.medicamentoId === id);
      if (lote) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          loteId: lote.id,
          manufactureDate: dayjs(lote.dataFabricacao),
          expirationDate: dayjs(lote.dataValidade),
        }));
        setOriginalLoteId(lote.id);
      }

      const supplierResponse = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Fornecedores/${fornecedorId}`
      );
      if (!supplierResponse.ok) throw new Error('Erro ao buscar dados do fornecedor');
      const supplierData: Fornecedor = await supplierResponse.json();
      setProduct((prevProduct) => ({
        ...prevProduct,
        manufacturer: supplierData.nomeFantasia,
      }));
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
  };

  const loadAvailableLotes = async () => {
    try {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes`
      );
      if (!response.ok) throw new Error('Erro ao carregar lotes');
      const data: Lote[] = await response.json();
      setLotes(data.filter((lote) => lote.medicamentoId === null || lote.medicamentoId === productId));
    } catch (error) {
      console.error(error);
    }
  };

  const loadManufactures = async () => {
    try {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Fornecedores`
      );
      if (!response.ok) throw new Error('Erro ao carregar fornecedores');
      const data: Fornecedor[] = await response.json();
      setManufactures(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === 'purchase' || name === 'selling' ? parseFloat(value) : value,
    }));
  };

  const handleLoteChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedLoteId = event.target.value as number;
    const selectedLote = lotes.find((lote) => lote.id === selectedLoteId);
    if (selectedLote) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        loteId: selectedLote.id,
        manufactureDate: dayjs(selectedLote.dataFabricacao),
        expirationDate: dayjs(selectedLote.dataValidade),
      }));
    }
  };

  const handleFornecedorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedFornecedorId = event.target.value as number;
    const selectedFornecedor = manufactures.find((f) => f.id === selectedFornecedorId);
    if (selectedFornecedor) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        fornecedorId: selectedFornecedor.id,
        manufacturer: selectedFornecedor.nomeFantasia,
      }));
    }
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

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();
    const confirmed = window.confirm('Tem certeza que deseja salvar as alterações?');
    if (!confirmed) return;

    try {
      if (originalLoteId && originalLoteId !== product.loteId) {
        const originalLote = lotes.find((lote) => lote.id === originalLoteId);
        await fetch(
          `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes/${originalLoteId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: originalLoteId,
              quantidade: originalLote?.quantidade || 0,
              dataFabricacao: originalLote?.dataFabricacao || '',
              dataValidade: originalLote?.dataValidade || '',
              medicamentoId: null,
            }),
          }
        );
      }

      if (product.loteId) {
        const selectedLote = lotes.find((lote) => lote.id === product.loteId);
        await fetch(
          `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Lotes/${product.loteId}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: product.loteId,
              quantidade: selectedLote?.quantidade || 0,
              dataFabricacao: selectedLote?.dataFabricacao || '',
              dataValidade: selectedLote?.dataValidade || '',
              medicamentoId: product.id,
            }),
          }
        );
      }

      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_PORT}/api/Medicamentos/${productId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: product.id,
            nomeComercial: product.name,
            precoCusto: product.purchase,
            precoVenda: product.selling,
            fornecedorId: product.fornecedorId,
            imagem: product.image.replace(/^data:image\/[a-z]+;base64,/, ''),
          }),
        }
      );

      if (response.ok) {
        setHasError(false);
        setShowNotification(true);
        router.push('/medicines');
      } else {
        setHasError(true);
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Erro de rede ou no servidor:', error);
      setHasError(true);
      setShowNotification(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <section className={styles.register_medicine__container}>
        <div className={styles.register_medicine__header}>
          <h2>Editar Produto</h2>
        </div>
        <div className={styles.register_medicine__content}>
          <div className={styles.register_medicine__medicine_preview}>
            {product.image ? (
              <div className={styles.register_medicine__image_picker_container}>
                <Image src={product.image} height={0} width={0} unoptimized alt={'Imagem do medicamento'} />
                <Button onClick={() => setProduct({ ...product, image: '' })} variant='contained' color='error' endIcon={<FontAwesomeIcon icon={faTrashCan} />}>
                  Remover
                </Button>
              </div>
            ) : (
              <div className={styles.register_medicine__image_picker_container}>
                <Button component='label' variant='contained' startIcon={<FontAwesomeIcon icon={faFileArrowUp} />}>
                  Foto
                  <input type='file' onChange={handleImageUpload} style={{ display: 'none' }} accept='image/*' />
                </Button>
              </div>
            )}
          </div>
          <form onSubmit={handleSave} className={styles.register_medicine__medicine_form}>
            <TextField value={product.name} onChange={handleInputChange} label='Nome do produto' variant='outlined' name='name' />
            <TextField value={product.purchase} onChange={handleInputChange} label='Preço de Custo' variant='outlined' name='purchase' type='number' />
            <TextField value={product.selling} onChange={handleInputChange} label='Preço de Venda' variant='outlined' name='selling' type='number' />
            <TextField select value={product.loteId || ''} onChange={handleLoteChange} label='Lote'>
              {lotes.map((lote) => (
                <MenuItem key={lote.id} value={lote.id}>
                  Lote {lote.id}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker disabled label="Data de Fabricação" value={product.manufactureDate} />
            <DatePicker disabled label="Data de Validade" value={product.expirationDate} />
            <TextField select value={product.fornecedorId} onChange={handleFornecedorChange} label='Fornecedor'>
              {manufactures.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.nomeFantasia}
                </MenuItem>
              ))}
            </TextField>
            <button type='submit' className={styles.register_medicine__medicine_form_submit_button}>
              Salvar
            </button>
          </form>
          <Snackbar open={showNotification} autoHideDuration={6000} onClose={() => setShowNotification(false)}>
            <Alert onClose={() => setShowNotification(false)} severity={hasError ? 'error' : 'success'} variant='filled' sx={{ width: '100%' }}>
              {hasError ? 'Algo deu errado! Não foi possível salvar as alterações' : 'Sucesso! Produto atualizado'}
            </Alert>
          </Snackbar>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default EditProduct;
