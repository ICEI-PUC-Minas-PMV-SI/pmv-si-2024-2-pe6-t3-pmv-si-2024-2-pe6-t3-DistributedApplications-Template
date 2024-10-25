import { IMedicamento } from './IMedicamento';

export interface ILote {
  dataFabricacao: string;
  dataValidade: string;
  entradas: object[];
  id: number;
  medicamento: IMedicamento | null;
  medicamentoId: number | null;
  quantidade: number;
  saidas: object[];
}
