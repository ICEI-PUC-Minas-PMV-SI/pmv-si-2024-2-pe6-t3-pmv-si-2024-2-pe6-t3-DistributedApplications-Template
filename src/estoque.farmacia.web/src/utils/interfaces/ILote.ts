import { IMedicamento } from './IMedicamento';

export interface ILote {
  dataFabricacao: string;
  dataValidade: string;
  entradas: null;
  id: number;
  medicamento: IMedicamento | null;
  medicamentoId: number;
  quantidade: number;
  saidas: null;
}
