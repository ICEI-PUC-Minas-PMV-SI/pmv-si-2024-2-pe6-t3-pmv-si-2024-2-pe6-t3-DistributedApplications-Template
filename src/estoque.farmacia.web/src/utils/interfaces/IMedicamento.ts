export interface IMedicamento {
  id?: number;
  nomeComercial: string;
  precoCusto: number;
  precoVenda: number;
  fornecedorId: number;
  imagem: string | null;
}
