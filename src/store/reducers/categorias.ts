import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CategoriasState } from "../../interfaces/CategoriaState";
import categoriasService from "../../services/Categorias";
import { createStandaloneToast } from "@chakra-ui/toast";
import { resetarCarrinho } from "./carrinho";

const { toast } = createStandaloneToast();

const initialState: CategoriasState[] = [];

export const carregarCategorias = createAction("categorias/carregarCategorias");
export const carregarUmaCategoria = createAction<string>(
  "categorias/carregarUmaCategoria"
);

export const buscarCategorias = createAsyncThunk(
  "categorias/buscar",
  categoriasService.buscar
);
const categoriasSlice = createSlice({
  name: "categorias",
  initialState,
  reducers: {
    adicionarTodasAsCategorias: (state, { payload }) => {
      return payload;
    },
    adicionarUmaCategoria: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetarCarrinho.type, () => {
      toast({
        title: "Sucesso!",
        description: "Compra completada com sucesso!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  },
});

export const { adicionarTodasAsCategorias, adicionarUmaCategoria } =
  categoriasSlice.actions;

export const selectCategorias = (state: RootState) => state.categorias;

export default categoriasSlice.reducer;
