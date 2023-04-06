import { createSlice } from "@reduxjs/toolkit";
import { UsuarioState } from "../../interfaces/UsuarioState";

const initialState: UsuarioState = {
  id: 0,
  nome: "",
  cartoes: [],
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    adicionarUsuario: (state, { payload }) => {
      return payload;
    },
  },
});

export const { adicionarUsuario } = usuarioSlice.actions;

export default usuarioSlice.reducer;
