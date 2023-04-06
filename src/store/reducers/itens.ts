import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import nophoto from "../../assets/nophoto.png"
import { RootState } from "../store";
import { ItensState } from "../../interfaces/ItensState";
import itensService from "../../services/Itens";

const initialState: ItensState[] = [];

export const buscarItens = createAsyncThunk(
  'itens/buscar',
  itensService.buscar
)

const itensSlice = createSlice({
  name: "itens",
  initialState,
  reducers: {
    mudarFavorito: (state, { payload }) => {
      state = state.map((item) => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      });
    },
    cadastrarItem: (state, { payload }) => {
      state.push({ ...payload, foto: nophoto, id: uuid() })
    },
    mudarItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload.id)
      Object.assign(state[index], payload.item)
      // return state.map(item => {
      //   if (item.id === payload.id) item = {...item, ...payload.item}
      //   return item
      // })
    },
    deletarItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload)
      state.splice(index, 1)
    },
    adicionarItens: (state, { payload }) => {
      state.push(...payload);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      buscarItens.fulfilled,
      (state, { payload }) => {
        return payload
      }
    )
    .addCase(
      buscarItens.pending,
      (state, { payload }) => {

      }
    )
    .addCase(
      buscarItens.rejected,
      (state, { payload }) => {

      }
    )
  }
});

export const { mudarFavorito, cadastrarItem, mudarItem, deletarItem, adicionarItens } = itensSlice.actions;

export const selectItens = (state: RootState) => state.itens;

export default itensSlice.reducer;
