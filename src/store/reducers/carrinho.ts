import { createAction, createSlice } from "@reduxjs/toolkit";
import { CarrinhoState } from "../../interfaces/CarrinhoState";
import { RootState } from "../store";
import { CartoesUsuario } from "../../interfaces/CartoesUsuario";

const initialState: CarrinhoState = { data: [], total: 0 };

export const carregarPagamento = createAction("carrinho/carregarPagamento");
export const finalizarPagamento = createAction(
  "carrinho/finalizarPagamento",
  function prepare(valorTotal: number, formaDePagamento: CartoesUsuario) {
    return {
      payload: {
        valorTotal,
        formaDePagamento,
      },
    };
  }
);

const carrinhoSlice = createSlice({
  name: "carrinho",
  initialState,
  reducers: {
    mudarCarrinho: (state, { payload }) => {
      const temItem = state.data.some((item) => item.id === payload);
      if (!temItem) {
        return {
          total: state.total,
          data: [
            ...state.data,
            {
              id: payload,
              quantidade: 1,
            },
          ],
        };
      }
      return {
        total: state.total,
        data: state.data.filter((item) => item.id !== payload),
      };
    },
    mudarQuantidade: (state, { payload }) => {
      state.data = state.data.map((itemNoCarrinho) => {
        if (itemNoCarrinho.id === payload.id)
          itemNoCarrinho.quantidade += payload.quantidade;
        return itemNoCarrinho;
      });
    },
    resetarCarrinho: () => initialState,
    mudarTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
});

export const { mudarCarrinho, mudarQuantidade, resetarCarrinho, mudarTotal } =
  carrinhoSlice.actions;

export const selectCarrinho = (state: RootState) => state.carrinho;

export default carrinhoSlice.reducer;
