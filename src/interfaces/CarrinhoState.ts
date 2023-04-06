interface Carrinho {
  id: string;
  quantidade: number;
}

export interface CarrinhoState {
  data: Carrinho[];
  total: number;
}
