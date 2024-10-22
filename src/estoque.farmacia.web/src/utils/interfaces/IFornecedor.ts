import { IMedicamento } from './IMedicamento';

export interface IFornecedor {
  cnpj: string;
  email: string;
  id: number;
  medicamentos: IMedicamento | null;
  nomeFantasia: string;
  telefone: string;
}
