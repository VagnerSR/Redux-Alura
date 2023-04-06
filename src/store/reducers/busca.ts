import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: string = '';

const buscaSlice = createSlice({
  name: "busca",
  initialState,
  reducers: {
    mudarBusca: (state, { payload }) => payload,
    resetarBusca: () => initialState
  },
});

export const { mudarBusca, resetarBusca } = buscaSlice.actions;

export const selectCarrinho = (state: RootState) => state.carrinho;

export default buscaSlice.reducer;
