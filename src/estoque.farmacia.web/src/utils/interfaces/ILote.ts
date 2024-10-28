import { IEntrada } from './IEntrada';
import { IMedicamento } from './IMedicamento';
import { ISaida } from './ISaida';

export interface ILote {
  dataFabricacao: string;
  dataValidade: string;
  entradas: IEntrada[];
  id: number;
  medicamento: IMedicamento | null;
  medicamentoId: number | null;
  quantidade: number;
  saidas: ISaida[];
}
